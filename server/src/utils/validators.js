const validator = require('validator');

const validateUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return { valid: false, message: 'URL is required' };
  }

  let formattedUrl = url.trim();
  
  // Remove leading/trailing whitespace and quotes
  formattedUrl = formattedUrl.replace(/^["']|["']$/g, '');
  
  // If it already has a protocol, use it as-is
  if (formattedUrl.startsWith('http://') || formattedUrl.startsWith('https://')) {
    // URL is already complete
  } else if (formattedUrl.includes('://')) {
    // Has other protocol (ftp:, etc) - reject it
    return { valid: false, message: 'Please use HTTP or HTTPS URLs only' };
  } else {
    // No protocol - add https://
    formattedUrl = 'https://' + formattedUrl;
  }

  // Validate URL format
  const isValid = validator.isURL(formattedUrl, { 
    require_protocol: true,
    require_valid_protocol: true,
    protocols: ['http', 'https']
  });

  if (!isValid) {
    // Try to extract just the domain if it's a complex URL
    try {
      const urlObj = new URL(formattedUrl);
      const domain = urlObj.hostname;
      if (domain) {
        formattedUrl = `https://${domain}`;
        if (validator.isURL(formattedUrl, { require_protocol: true })) {
          return { valid: true, url: formattedUrl };
        }
      }
    } catch (e) {
      // Fall through to error message
    }
    return { valid: false, message: 'Invalid URL format. Please enter a valid website URL (e.g., google.com)' };
  }

  return { valid: true, url: formattedUrl };
};

const extractDomain = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, '');
  } catch (error) {
    return null;
  }
};

module.exports = {
  validateUrl,
  extractDomain
};