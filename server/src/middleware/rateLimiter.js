const rateLimit = require('express-rate-limit');

const analysisLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: async (req) => {
    if (req.user) {
      if (req.user.plan === 'enterprise') return 1000;
      if (req.user.plan === 'pro') return 100;
      return 10; // Free plan
    }
    return 5; // Anonymous
  },
  message: 'Too many analysis requests, please try again later or upgrade your plan',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Too many authentication attempts, please try again later',
});

module.exports = { analysisLimiter, authLimiter };