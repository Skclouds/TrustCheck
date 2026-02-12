const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  domain: {
    type: String,
    required: true
  },
  overallScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  riskLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  checks: {
    domainTrust: {
      score: Number,
      age: String,
      registrar: String,
      whoisPrivacy: Boolean,
      creationDate: Date,
      expirationDate: Date,
      status: String
    },
    security: {
      score: Number,
      https: Boolean,
      sslValid: Boolean,
      tlsVersion: String,
      certExpiry: String,
      certIssuer: String,
      hsts: Boolean,
      status: String
    },
    fraudIndicators: {
      score: Number,
      blacklisted: Boolean,
      blacklistSources: [String],
      phishingPatterns: Boolean,
      suspiciousRedirects: Boolean,
      malwareDetected: Boolean,
      status: String
    },
    contentSignals: {
      score: Number,
      fakeOffers: Boolean,
      urgencyLanguage: Boolean,
      grammarQuality: String,
      professionalDesign: Boolean,
      status: String
    },
    transparency: {
      score: Number,
      privacyPolicy: Boolean,
      contactInfo: Boolean,
      termsOfService: Boolean,
      aboutPage: Boolean,
      socialMediaLinks: Boolean,
      status: String
    },
    reputation: {
      score: Number,
      userReviews: Number,
      avgRating: Number,
      fraudReports: Number,
      trustScore: Number,
      status: String
    }
  },
  redFlags: [String],
  recommendations: [String],
  analyzedAt: {
    type: Date,
    default: Date.now
  },
  ttl: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  }
});

analysisSchema.index({ url: 1, analyzedAt: -1 });
analysisSchema.index({ userId: 1, analyzedAt: -1 });
analysisSchema.index({ ttl: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Analysis', analysisSchema);