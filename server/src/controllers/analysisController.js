const Analysis = require('../models/Analysis');
const { validateUrl, extractDomain } = require('../utils/validators');
const { calculateOverallScore, getRiskLevel } = require('../utils/scoring');
const { analyzeDomain } = require('../services/domainService');
const { analyzeSecurity } = require('../services/securityService');
const { analyzeFraud } = require('../services/fraudService');
const { analyzeContent } = require('../services/contentService');
const { analyzeTransparency } = require('../services/transparencyService');
const { analyzeReputation } = require('../services/reputationService');

exports.analyzeWebsite = async (req, res) => {
  try {
    const { url } = req.body;

    const validation = validateUrl(url);
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

    const formattedUrl = validation.url;
    const domain = extractDomain(formattedUrl);

    if (!domain) {
      return res.status(400).json({ success: false, message: 'Could not extract domain from URL' });
    }

    // Check cache (24 hours) - only if MongoDB is available
    try {
      const cached = await Analysis.findOne({
        url: formattedUrl,
        analyzedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      }).sort({ analyzedAt: -1 });

      if (cached) {
        return res.json({ success: true, data: cached, cached: true });
      }
    } catch (cacheError) {
      console.warn('⚠️ Cache check failed (continuing with fresh analysis):', cacheError.message);
    }

    console.log(`🔍 Analyzing: ${formattedUrl}`);

    // Run all analyses in parallel
    const [domainData, securityData, fraudData, contentData, transparencyData, reputationData] = 
      await Promise.all([
        analyzeDomain(domain),
        analyzeSecurity(formattedUrl, domain),
        analyzeFraud(formattedUrl, domain),
        analyzeContent(formattedUrl),
        analyzeTransparency(formattedUrl, domain),
        analyzeReputation(domain)
      ]);

    const checks = {
      domainTrust: domainData,
      security: securityData,
      fraudIndicators: fraudData,
      contentSignals: contentData,
      transparency: transparencyData,
      reputation: reputationData
    };

    const overallScore = calculateOverallScore(checks);
    const riskLevel = getRiskLevel(overallScore);
    const redFlags = generateRedFlags(checks, domainData);
    const recommendations = generateRecommendations(checks, riskLevel);

    const analysisData = {
      userId: req.user?._id,
      url: formattedUrl,
      domain,
      overallScore,
      riskLevel,
      checks,
      redFlags,
      recommendations,
      analyzedAt: new Date()
    };

    // Try to save to database, but don't fail if MongoDB is unavailable
    try {
      const analysis = new Analysis(analysisData);
      await analysis.save();
      analysisData._id = analysis._id;
    } catch (dbError) {
      console.warn('⚠️ Database save failed (continuing without cache):', dbError.message);
      // Continue without saving to DB
    }

    if (req.user) {
      try {
        const User = require('../models/User');
        await User.findByIdAndUpdate(req.user._id, { $inc: { analysisCount: 1 } });
      } catch (userError) {
        console.warn('⚠️ User update failed:', userError.message);
      }
    }

    console.log(`✅ Analysis complete: ${overallScore}/100 (${riskLevel} Risk)`);

    res.json({ success: true, data: analysisData, cached: false });
  } catch (error) {
    console.error('❌ Analysis error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      success: false, 
      message: 'Analysis failed', 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

exports.getAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id);
    if (!analysis) {
      return res.status(404).json({ success: false, message: 'Analysis not found' });
    }
    res.json({ success: true, data: analysis });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = req.user ? { userId: req.user._id } : {};
    
    const analyses = await Analysis.find(query)
      .sort({ analyzedAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Analysis.countDocuments(query);

    res.json({
      success: true,
      data: {
        analyses,
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

function generateRedFlags(checks, domainData) {
  const flags = [];

  if (domainData.ageInDays < 30) {
    flags.push('Domain registered very recently (less than 30 days)');
  } else if (domainData.ageInDays < 180) {
    flags.push('Domain is relatively new (less than 6 months)');
  }

  if (!checks.security.https) {
    flags.push('Website does not use HTTPS encryption');
  }

  if (!checks.security.sslValid) {
    flags.push('SSL certificate is invalid or expired');
  }

  if (checks.fraudIndicators.blacklisted) {
    flags.push(`Website appears on security blacklists: ${checks.fraudIndicators.blacklistSources.join(', ')}`);
  }

  if (checks.fraudIndicators.phishingPatterns) {
    flags.push('Potential phishing patterns detected');
  }

  if (checks.fraudIndicators.malwareDetected) {
    flags.push('Malware or malicious content detected');
  }

  if (!checks.transparency.privacyPolicy) {
    flags.push('No privacy policy found');
  }

  if (!checks.transparency.contactInfo) {
    flags.push('No contact information available');
  }

  if (checks.contentSignals.fakeOffers) {
    flags.push('Suspicious promotional content detected');
  }

  if (checks.reputation.fraudReports > 5) {
    flags.push(`Multiple fraud reports found (${checks.reputation.fraudReports})`);
  }

  return flags;
}

function generateRecommendations(checks, riskLevel) {
  const recommendations = [];

  if (riskLevel === 'High') {
    recommendations.push('Exercise extreme caution when interacting with this website');
    recommendations.push('Do not enter personal or financial information');
    recommendations.push('Consider reporting this website if it appears fraudulent');
  } else if (riskLevel === 'Medium') {
    recommendations.push('Proceed with caution when using this website');
    recommendations.push('Verify the legitimacy before making any purchases');
    recommendations.push('Check for customer reviews from trusted sources');
  }

  if (!checks.security.https) {
    recommendations.push('Avoid entering sensitive information without HTTPS');
  }

  if (!checks.transparency.privacyPolicy) {
    recommendations.push('Be aware that there is no privacy policy');
  }

  if (checks.fraudIndicators.blacklisted) {
    recommendations.push('This website is flagged by security services - avoid use');
  }

  return recommendations;
}