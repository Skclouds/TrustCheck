import React, { useState } from 'react';
import { Shield, Globe, Lock, AlertTriangle, FileText, Star, Search, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { analysisAPI } from '../services/api';

export default function TrustCheckApp() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const analyzeWebsite = async () => {
    if (!url) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await analysisAPI.analyze(url);
      if (response.data.success) {
        setResult(response.data.data);
      } else {
        setError(response.data.message || 'Analysis failed. Please try again.');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      
      if (err.response) {
        // Server responded with error
        const errorMsg = err.response.data?.message || err.response.data?.error || 'Analysis failed. Please try again.';
        setError(errorMsg);
      } else if (err.request) {
        // Request made but no response (server not reachable)
        setError('Unable to connect to server. Please ensure the backend server is running on port 5000.');
      } else {
        // Something else happened
        setError(err.message || 'Analysis failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskColor = (risk) => {
    if (risk === 'Low') return 'bg-green-100 text-green-800 border-green-300';
    if (risk === 'Medium') return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const getStatusIcon = (status) => {
    if (status === 'pass') return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (status === 'warning') return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    return <XCircle className="w-5 h-5 text-red-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">TrustCheck</h1>
          </div>
          <p className="text-lg text-gray-600">Website Reliability & Fraud Risk Analyzer</p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter website URL (e.g., google.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && analyzeWebsite()}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg"
              />
            </div>
            <button
              onClick={analyzeWebsite}
              disabled={loading || !url}
              className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Analyze
                </>
              )}
            </button>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Trust Score Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className={`text-7xl font-bold ${getScoreColor(result.overallScore)} mb-2`}>
                    {result.overallScore}
                  </div>
                  <div className="text-2xl text-gray-600">Trust Score</div>
                  <div className="text-sm text-gray-500 mt-1">out of 100</div>
                </div>
                
                <div className="text-center">
                  <div className={`inline-block px-6 py-3 rounded-full text-xl font-semibold border-2 ${getRiskColor(result.riskLevel)}`}>
                    {result.riskLevel} Risk
                  </div>
                  <div className="text-sm text-gray-500 mt-4">Risk Assessment</div>
                </div>

                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Analyzed URL</div>
                  <div className="text-lg font-semibold text-indigo-600 break-all">{result.url}</div>
                </div>
              </div>
            </div>

            {/* Red Flags */}
            {result.redFlags && result.redFlags.length > 0 && (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  Red Flags Detected
                </h3>
                <ul className="space-y-2">
                  {result.redFlags.map((flag, index) => (
                    <li key={index} className="text-red-800 flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Detailed Checks */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Domain Trust */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Globe className="w-6 h-6 text-indigo-600" />
                    <h3 className="text-xl font-semibold">Domain Trust</h3>
                  </div>
                  {getStatusIcon(result.checks.domainTrust.status)}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Score:</span>
                    <span className={`font-semibold ${getScoreColor(result.checks.domainTrust.score)}`}>
                      {result.checks.domainTrust.score}/100
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Domain Age:</span>
                    <span className="font-medium">{result.checks.domainTrust.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Registrar:</span>
                    <span className="font-medium">{result.checks.domainTrust.registrar}</span>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Lock className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-semibold">Security</h3>
                  </div>
                  {getStatusIcon(result.checks.security.status)}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Score:</span>
                    <span className={`font-semibold ${getScoreColor(result.checks.security.score)}`}>
                      {result.checks.security.score}/100
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">HTTPS:</span>
                    <span className="font-medium">{result.checks.security.https ? '✓ Enabled' : '✗ Disabled'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">SSL Certificate:</span>
                    <span className="font-medium">{result.checks.security.sslValid ? '✓ Valid' : '✗ Invalid'}</span>
                  </div>
                </div>
              </div>

              {/* Fraud Indicators */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                    <h3 className="text-xl font-semibold">Fraud Indicators</h3>
                  </div>
                  {getStatusIcon(result.checks.fraudIndicators.status)}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Score:</span>
                    <span className={`font-semibold ${getScoreColor(result.checks.fraudIndicators.score)}`}>
                      {result.checks.fraudIndicators.score}/100
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Blacklisted:</span>
                    <span className="font-medium">{result.checks.fraudIndicators.blacklisted ? '✗ Yes' : '✓ No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phishing Patterns:</span>
                    <span className="font-medium">{result.checks.fraudIndicators.phishingPatterns ? '⚠ Detected' : '✓ None'}</span>
                  </div>
                </div>
              </div>

              {/* Content Signals */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-purple-600" />
                    <h3 className="text-xl font-semibold">Content Quality</h3>
                  </div>
                  {getStatusIcon(result.checks.contentSignals.status)}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Score:</span>
                    <span className={`font-semibold ${getScoreColor(result.checks.contentSignals.score)}`}>
                      {result.checks.contentSignals.score}/100
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fake Offers:</span>
                    <span className="font-medium">{result.checks.contentSignals.fakeOffers ? '⚠ Detected' : '✓ None'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Grammar Quality:</span>
                    <span className="font-medium">{result.checks.contentSignals.grammarQuality}</span>
                  </div>
                </div>
              </div>

              {/* Transparency */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-semibold">Transparency</h3>
                  </div>
                  {getStatusIcon(result.checks.transparency.status)}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Score:</span>
                    <span className={`font-semibold ${getScoreColor(result.checks.transparency.score)}`}>
                      {result.checks.transparency.score}/100
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Privacy Policy:</span>
                    <span className="font-medium">{result.checks.transparency.privacyPolicy ? '✓ Found' : '✗ Missing'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contact Info:</span>
                    <span className="font-medium">{result.checks.transparency.contactInfo ? '✓ Found' : '✗ Missing'}</span>
                  </div>
                </div>
              </div>

              {/* Reputation */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Star className="w-6 h-6 text-yellow-600" />
                    <h3 className="text-xl font-semibold">Reputation</h3>
                  </div>
                  {getStatusIcon(result.checks.reputation.status)}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Score:</span>
                    <span className={`font-semibold ${getScoreColor(result.checks.reputation.score)}`}>
                      {result.checks.reputation.score}/100
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">User Reviews:</span>
                    <span className="font-medium">{result.checks.reputation.userReviews}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Rating:</span>
                    <span className="font-medium">{result.checks.reputation.avgRating} / 5.0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            {result.recommendations && result.recommendations.length > 0 && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  Recommendations
                </h3>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="text-blue-800 flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* New Analysis Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setResult(null);
                  setUrl('');
                  setError('');
                }}
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
              >
                Analyze Another Website
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
