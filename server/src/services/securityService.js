const https = require('https');
const sslChecker = require('ssl-checker');
const { getStatus } = require('../utils/scoring');

const analyzeSecurity = async (url, domain) => {
  try {
    let score = 0;
    let httpsEnabled = false;
    let sslValid = false;
    let tlsVersion = 'Unknown';
    let certExpiry = 'Unknown';
    let certIssuer = 'Unknown';
    let hsts = false;

    httpsEnabled = url.startsWith('https://');

    if (!httpsEnabled) {
      return {
        score: 0,
        https: false,
        sslValid: false,
        tlsVersion: 'None',
        certExpiry: 'N/A',
        certIssuer: 'N/A',
        hsts: false,
        status: 'fail'
      };
    }

    score += 30;

    try {
      const sslInfo = await sslChecker(domain, {
        method: 'GET',
        port: 443,
        protocol: 'https:'
      });

      sslValid = sslInfo.valid;
      
      if (sslValid) {
        score += 25;
      } else {
        score -= 20;
      }

      if (sslInfo.validTo) {
        const daysUntilExpiry = sslInfo.daysRemaining || 0;
        certExpiry = `${daysUntilExpiry} days`;
        
        if (daysUntilExpiry > 60) score += 10;
        else if (daysUntilExpiry > 30) score += 5;
      }

      certIssuer = sslInfo.validFor?.[0] || 'Unknown';

    } catch (sslError) {
      console.log(`SSL check failed for ${domain}:`, sslError.message);
    }

    try {
      await new Promise((resolve, reject) => {
        const options = {
          host: domain,
          port: 443,
          method: 'HEAD',
          rejectUnauthorized: false
        };

        const req = https.request(options, (res) => {
          hsts = res.headers['strict-transport-security'] ? true : false;
          if (hsts) score += 10;

          const socket = res.socket;
          if (socket.getProtocol) {
            tlsVersion = socket.getProtocol();
            
            if (tlsVersion === 'TLSv1.3') score += 15;
            else if (tlsVersion === 'TLSv1.2') score += 10;
            else score += 0;
          }

          resolve();
        });

        req.on('error', (err) => {
          resolve();
        });

        req.setTimeout(5000, () => {
          req.destroy();
          resolve();
        });

        req.end();
      });
    } catch (error) {
      console.log(`TLS/HSTS check failed for ${domain}`);
    }

    score = Math.max(0, Math.min(100, score));

    return {
      score,
      https: httpsEnabled,
      sslValid,
      tlsVersion,
      certExpiry,
      certIssuer,
      hsts,
      status: getStatus(score)
    };
  } catch (error) {
    console.error('Security analysis error:', error);
    return {
      score: 0,
      https: false,
      sslValid: false,
      tlsVersion: 'Unknown',
      certExpiry: 'Unknown',
      certIssuer: 'Unknown',
      hsts: false,
      status: 'fail'
    };
  }
};

module.exports = { analyzeSecurity };