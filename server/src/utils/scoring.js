const calculateOverallScore = (checks) => {
  const weights = {
    domainTrust: 0.20,
    security: 0.25,
    fraudIndicators: 0.25,
    contentSignals: 0.10,
    transparency: 0.10,
    reputation: 0.10
  };

  const score = (
    (checks.domainTrust?.score || 0) * weights.domainTrust +
    (checks.security?.score || 0) * weights.security +
    (checks.fraudIndicators?.score || 0) * weights.fraudIndicators +
    (checks.contentSignals?.score || 0) * weights.contentSignals +
    (checks.transparency?.score || 0) * weights.transparency +
    (checks.reputation?.score || 0) * weights.reputation
  );

  return Math.round(score);
};

const getRiskLevel = (score) => {
  if (score >= 80) return 'Low';
  if (score >= 60) return 'Medium';
  return 'High';
};

const getStatus = (score) => {
  if (score >= 80) return 'pass';
  if (score >= 60) return 'warning';
  return 'fail';
};

const calculateDomainAge = (creationDate) => {
  if (!creationDate) return 0;
  const created = new Date(creationDate);
  const now = new Date();
  const diffTime = Math.abs(now - created);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const formatDomainAge = (days) => {
  if (days < 30) return `${days} days`;
  if (days < 365) {
    const months = Math.floor(days / 30);
    return `${months} ${months === 1 ? 'month' : 'months'}`;
  }
  const years = Math.floor(days / 365);
  const remainingMonths = Math.floor((days % 365) / 30);
  return `${years} ${years === 1 ? 'year' : 'years'}${remainingMonths > 0 ? ` ${remainingMonths} months` : ''}`;
};

module.exports = {
  calculateOverallScore,
  getRiskLevel,
  getStatus,
  calculateDomainAge,
  formatDomainAge
};