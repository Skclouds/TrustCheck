const axios = require('axios');
const cheerio = require('cheerio');
const { getStatus } = require('../utils/scoring');

const analyzeTransparency = async (url, domain) => {
  try {
    let score = 0;
    let privacyPolicy = false;
    let contactInfo = false;
    let termsOfService = false;
    let aboutPage = false;
    let socialMediaLinks = false;

    try {
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      const bodyHtml = $.html().toLowerCase();
      const links = $('a');

      links.each((i, el) => {
        const href = $(el).attr('href')?.toLowerCase() || '';
        const text = $(el).text().toLowerCase();

        if (href.includes('privacy') || text.includes('privacy policy')) {
          privacyPolicy = true;
        }
        if (href.includes('terms') || text.includes('terms of service')) {
          termsOfService = true;
        }
        if (href.includes('about') || text.includes('about us')) {
          aboutPage = true;
        }
        if (href.includes('contact') || text.includes('contact us')) {
          contactInfo = true;
        }
      });

      const socialPatterns = ['facebook.com', 'twitter.com', 'linkedin.com', 'instagram.com', 'youtube.com'];
      socialMediaLinks = socialPatterns.some(pattern => bodyHtml.includes(pattern));

      if (!contactInfo) {
        contactInfo = /@\w+\.\w+/.test(bodyHtml) || /\d{3}[-.]?\d{3}[-.]?\d{4}/.test(bodyHtml);
      }

    } catch (error) {
      console.log('Transparency fetch failed:', error.message);
    }

    if (privacyPolicy) score += 25;
    if (termsOfService) score += 20;
    if (contactInfo) score += 25;
    if (aboutPage) score += 15;
    if (socialMediaLinks) score += 15;

    return {
      score,
      privacyPolicy,
      contactInfo,
      termsOfService,
      aboutPage,
      socialMediaLinks,
      status: getStatus(score)
    };
  } catch (error) {
    console.error('Transparency analysis error:', error);
    return {
      score: 50,
      privacyPolicy: false,
      contactInfo: false,
      termsOfService: false,
      aboutPage: false,
      socialMediaLinks: false,
      status: 'warning'
    };
  }
};

module.exports = { analyzeTransparency };