const axios = require('axios');
const { getStatus } = require('../utils/scoring');

const analyzeFraud = async (url, domain) => {
  try {
    let score = 100;
    let blacklisted = false;
    let blacklistSources = [];
    let phishingPatterns = false;
    let suspiciousRedirects = false;
    let malwareDetected = false;

    if (process.env.GOOGLE_SAFE_BROWSING_KEY) {
      try {
        const safeBrowsingResponse = await axios.post(
          `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_SAFE_BROWSING_KEY}`,
          {
            client: {
              clientId: 'trustcheck',
              clientVersion: '1.0.0'
            },
            threatInfo: {
              threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE', 'POTENTIALLY_HARMFUL_APPLICATION'],
              platformTypes: ['ANY_PLATFORM'],
              threatEntryTypes: ['URL'],
              threatEntries: [{ url }]
            }
          },
          { timeout: 5000 }
        );

        if (safeBrowsingResponse.data.matches && safeBrowsingResponse.data.matches.length > 0) {
          blacklisted = true;
          blacklistSources.push('Google Safe Browsing');
          score -= 60;

          safeBrowsingResponse.data.matches.forEach(match => {
            if (match.threatType === 'SOCIAL_ENGINEERING') phishingPatterns = true;
            if (match.threatType === 'MALWARE') malwareDetected = true;
          });
        }
      } catch (error) {
        console.log('Google Safe Browsing check failed:', error.message);
      }
    }

    if (process.env.VIRUSTOTAL_API_KEY) {
      try {
        const vtResponse = await axios.get(
          `https://www.virustotal.com/api/v3/domains/${domain}`,
          {
            headers: { 'x-apikey': process.env.VIRUSTOTAL_API_KEY },
            timeout: 5000
          }
        );

        const stats = vtResponse.data?.data?.attributes?.last_analysis_stats;
        if (stats) {
          const maliciousCount = stats.malicious || 0;
          const suspiciousCount = stats.suspicious || 0;

          if (maliciousCount > 0) {
            blacklisted = true;
            blacklistSources.push('VirusTotal');
            malwareDetected = true;
            score -= Math.min(50, maliciousCount * 10);
          }

          if (suspiciousCount > 2) {
            score -= suspiciousCount * 5;
          }
        }
      } catch (error) {
        console.log('VirusTotal check failed:', error.message);
      }
    }

    const suspiciousKeywords = ['verify', 'suspend', 'urgent', 'confirm', 'update', 'secure', 'account'];
    const domainLower = domain.toLowerCase();
    
    const hasSuspiciousKeyword = suspiciousKeywords.some(keyword => domainLower.includes(keyword));
    const hasMisspelling = checkCommonMisspellings(domain);
    const hasExcessiveDashes = (domain.match(/-/g) || []).length > 2;
    
    if (hasSuspiciousKeyword || hasMisspelling || hasExcessiveDashes) {
      phishingPatterns = true;
      score -= 20;
    }

    score = Math.max(0, Math.min(100, score));

    return {
      score,
      blacklisted,
      blacklistSources,
      phishingPatterns,
      suspiciousRedirects,
      malwareDetected,
      status: getStatus(score)
    };
  } catch (error) {
    console.error('Fraud analysis error:', error);
    return {
      score: 70,
      blacklisted: false,
      blacklistSources: [],
      phishingPatterns: false,
      suspiciousRedirects: false,
      malwareDetected: false,
      status: 'warning'
    };
  }
};

const checkCommonMisspellings = (domain) => {
  const commonBrands = ['google', 'facebook', 'amazon', 'paypal', 'microsoft', 'apple', 'netflix', 'instagram'];
  const domainLower = domain.toLowerCase();
  
  for (const brand of commonBrands) {
    if (domainLower.includes(brand) && !domainLower.includes(`${brand}.com`)) {
      const variations = [
        brand.replace('o', '0'),
        brand.replace('l', '1'),
        brand.replace('a', '@'),
        brand + '-',
        brand + 'secure',
        brand + 'verify'
      ];
      
      if (variations.some(v => domainLower.includes(v))) {
        return true;
      }
    }
  }
  
  return false;
};

module.exports = { analyzeFraud };