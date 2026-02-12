const { getStatus } = require('../utils/scoring');

const analyzeReputation = async (domain) => {
  try {
    let score = 50;
    let userReviews = 0;
    let avgRating = 0;
    let fraudReports = 0;
    let trustScore = 0;

    userReviews = Math.floor(Math.random() * 500) + 50;
    avgRating = (Math.random() * 2 + 3).toFixed(1);
    fraudReports = Math.floor(Math.random() * 5);

    if (userReviews > 1000) score += 20;
    else if (userReviews > 100) score += 15;
    else if (userReviews > 10) score += 10;

    if (avgRating >= 4.5) score += 15;
    else if (avgRating >= 4.0) score += 10;
    else if (avgRating >= 3.5) score += 5;
    else if (avgRating < 3.0) score -= 20;

    if (fraudReports > 10) score -= 30;
    else if (fraudReports > 5) score -= 20;
    else if (fraudReports > 0) score -= 10;

    score = Math.max(0, Math.min(100, score));
    trustScore = score;

    return {
      score,
      userReviews,
      avgRating: parseFloat(avgRating),
      fraudReports,
      trustScore,
      status: getStatus(score)
    };
  } catch (error) {
    console.error('Reputation analysis error:', error);
    return {
      score: 50,
      userReviews: 0,
      avgRating: 0,
      fraudReports: 0,
      trustScore: 0,
      status: 'warning'
    };
  }
};

module.exports = { analyzeReputation };