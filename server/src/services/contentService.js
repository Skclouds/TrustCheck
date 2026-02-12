const axios = require('axios');
const cheerio = require('cheerio');
const { getStatus } = require('../utils/scoring');

const analyzeContent = async (url) => {
  try {
    let score = 100;
    let fakeOffers = false;
    let urgencyLanguage = false;
    let grammarQuality = 'Good';
    let professionalDesign = true;

    try {
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      const bodyText = $('body').text().toLowerCase();

      const urgencyKeywords = [
        'act now', 'limited time', 'hurry', 'expires soon', 'last chance',
        'don\'t miss', 'urgent', 'immediately', 'quick', 'instant',
        'today only', 'while supplies last', 'ending soon'
      ];
      
      urgencyLanguage = urgencyKeywords.some(keyword => bodyText.includes(keyword));
      if (urgencyLanguage) score -= 20;

      const fakeOfferPatterns = [
        'congratulations you\'ve won',
        'you are the lucky visitor',
        'claim your prize',
        'you\'ve been selected',
        'free iphone',
        'free gift card',
        'click here to claim',
        '100% free',
        'risk free'
      ];
      
      fakeOffers = fakeOfferPatterns.some(pattern => bodyText.includes(pattern));
      if (fakeOffers) score -= 30;

      const capsRatio = (bodyText.match(/[A-Z]/g) || []).length / bodyText.length;
      const excessivePunctuation = /[!?]{3,}/.test(bodyText);
      
      if (capsRatio > 0.3 || excessivePunctuation) {
        grammarQuality = 'Poor';
        score -= 25;
      } else if (capsRatio > 0.15) {
        grammarQuality = 'Fair';
        score -= 10;
      }

      const hasLogo = $('img[alt*="logo"], .logo, #logo').length > 0;
      const hasNavigation = $('nav, .nav, .navigation, .menu').length > 0;
      const hasFooter = $('footer, .footer').length > 0;
      
      professionalDesign = hasLogo && hasNavigation && hasFooter;
      if (!professionalDesign) score -= 15;

    } catch (error) {
      console.log('Content fetch failed:', error.message);
      score = 70;
    }

    score = Math.max(0, Math.min(100, score));

    return {
      score,
      fakeOffers,
      urgencyLanguage,
      grammarQuality,
      professionalDesign,
      status: getStatus(score)
    };
  } catch (error) {
    console.error('Content analysis error:', error);
    return {
      score: 70,
      fakeOffers: false,
      urgencyLanguage: false,
      grammarQuality: 'Unknown',
      professionalDesign: true,
      status: 'warning'
    };
  }
};

module.exports = { analyzeContent };