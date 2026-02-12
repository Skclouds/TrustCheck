const rateLimit = require('express-rate-limit');

const analysisLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: (req) => {
    if (req.user) {
      if (req.user.plan === 'enterprise') return 500;
      if (req.user.plan === 'pro') return 100;
      return 30; // Free plan
    }
    return 50; // Anonymous
  },

  skip: (req) => req.method === 'OPTIONS',

  message: {
    success: false,
    message:
      'Too many analysis requests, please try again later or upgrade your plan',
  },

  standardHeaders: true,
  legacyHeaders: false,
});


const authLimiter = rateLimit({
windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many authentication attempts, please try again later',
});

module.exports = { analysisLimiter, authLimiter };