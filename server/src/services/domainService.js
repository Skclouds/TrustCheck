const dns = require('dns').promises;
const whois = require('whois-json');
const { calculateDomainAge, formatDomainAge, getStatus } = require('../utils/scoring');

const analyzeDomain = async (domain) => {
  try {
    let score = 100;
    let whoisData = null;
    let age = 0;
    let ageFormatted = 'Unknown';
    let registrar = 'Unknown';
    let creationDate = null;
    let expirationDate = null;
    let whoisPrivacy = false;

    try {
      whoisData = await whois(domain, { follow: 3, timeout: 10000 });
      
      if (whoisData) {
        creationDate = whoisData.creationDate || whoisData.createdDate;
        expirationDate = whoisData.expirationDate || whoisData.registryExpiryDate;
        registrar = whoisData.registrar || 'Unknown';
        
        const registrantOrg = (whoisData.registrant?.organization || '').toLowerCase();
        const registrantName = (whoisData.registrant?.name || '').toLowerCase();
        whoisPrivacy = registrantOrg.includes('privacy') || 
                       registrantOrg.includes('protected') ||
                       registrantName.includes('privacy') ||
                       registrantName.includes('redacted');

        if (creationDate) {
          age = calculateDomainAge(creationDate);
          ageFormatted = formatDomainAge(age);

          if (age < 30) score -= 40;
          else if (age < 180) score -= 25;
          else if (age < 365) score -= 15;
          else if (age < 730) score -= 5;
        }

        if (whoisPrivacy && age < 365) score -= 10;

        if (expirationDate) {
          const daysUntilExpiry = Math.ceil((new Date(expirationDate) - new Date()) / (1000 * 60 * 60 * 24));
          if (daysUntilExpiry < 90 && daysUntilExpiry > 0) score -= 10;
        }
      }
    } catch (whoisError) {
      console.log(`WHOIS lookup failed for ${domain}:`, whoisError.message);
      score -= 20;
    }

    try {
      const addresses = await dns.resolve4(domain);
      if (!addresses || addresses.length === 0) {
        score -= 30;
      }
    } catch (dnsError) {
      console.log(`DNS lookup failed for ${domain}`);
      score -= 30;
    }

    score = Math.max(0, Math.min(100, score));

    return {
      score,
      age: ageFormatted,
      ageInDays: age,
      registrar,
      whoisPrivacy,
      creationDate,
      expirationDate,
      status: getStatus(score)
    };
  } catch (error) {
    console.error('Domain analysis error:', error);
    return {
      score: 50,
      age: 'Unknown',
      ageInDays: 0,
      registrar: 'Unknown',
      whoisPrivacy: false,
      creationDate: null,
      expirationDate: null,
      status: 'warning'
    };
  }
};

module.exports = { analyzeDomain };