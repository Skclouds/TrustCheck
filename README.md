
# TrustCheck
=======
# TrustCheck – Website Reliability & Fraud Risk Analyzer

TrustCheck is a comprehensive web-based tool that analyzes websites for reliability, security, and fraud risk indicators. Users can enter a website URL and receive a detailed trust score based on multiple security and reputation factors.

## 🌟 Features

### Core Analysis Categories

1. **Domain Trust**
   - Domain age analysis
   - Registrar information
   - WHOIS privacy status
   - Domain expiration tracking

2. **Security**
   - HTTPS encryption check
   - SSL certificate validation
   - TLS version detection
   - HSTS (HTTP Strict Transport Security) verification

3. **Fraud Indicators**
   - Blacklist checking (Google Safe Browsing, VirusTotal)
   - Phishing pattern detection
   - Malware detection
   - Suspicious domain patterns

4. **Content Quality**
   - Fake offer detection
   - Urgency language analysis
   - Grammar quality assessment
   - Professional design evaluation

5. **Transparency**
   - Privacy policy presence
   - Contact information availability
   - Terms of service check
   - About page verification
   - Social media links

6. **Reputation**
   - User review aggregation
   - Average rating calculation
   - Fraud report tracking
   - Trust score computation

## 🏗️ Project Structure

```
trustcheck/
├── client/
│   └── trustcheck/          # React frontend
│       ├── src/
│       │   ├── components/  # React components
│       │   ├── services/    # API service layer
│       │   └── ...
│       └── package.json
├── server/                  # Node.js backend
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic services
│   │   └── utils/          # Utility functions
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd trustcheck
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client/trustcheck
   npm install
   ```

4. **Environment Configuration**

   Create a `.env` file in the `server/` directory:
   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   MONGODB_URI=mongodb://localhost:27017/trustcheck
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # Optional API Keys for enhanced features
   GOOGLE_SAFE_BROWSING_KEY=your-google-safe-browsing-api-key
   VIRUSTOTAL_API_KEY=your-virustotal-api-key
   ```

   Create a `.env` file in the `client/trustcheck/` directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running locally or update MONGODB_URI
   mongod
   ```

6. **Start the development servers**

   Terminal 1 - Backend:
   ```bash
   cd server
   npm run dev
   ```

   Terminal 2 - Frontend:
   ```bash
   cd client/trustcheck
   npm start
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📚 API Endpoints

### Analysis
- `POST /api/analyze` - Analyze a website URL
- `GET /api/analyze/:id` - Get analysis by ID
- `GET /api/analyze/history` - Get analysis history (requires authentication)

### Authentication (Optional)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires authentication)

## 🛠️ Technologies Used

### Frontend
- React 19
- Tailwind CSS
- Lucide React (icons)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Various APIs:
  - WHOIS (whois-json)
  - SSL Checker (ssl-checker)
  - Google Safe Browsing API
  - VirusTotal API (optional)

## 📊 Scoring System

The overall trust score (0-100) is calculated using weighted averages:

- **Domain Trust**: 20%
- **Security**: 25%
- **Fraud Indicators**: 25%
- **Content Quality**: 10%
- **Transparency**: 10%
- **Reputation**: 10%

### Risk Levels
- **Low Risk**: Score ≥ 80
- **Medium Risk**: Score 60-79
- **High Risk**: Score < 60

## 🔒 Security Features

- Rate limiting on API endpoints
- JWT-based authentication
- Helmet.js for security headers
- Input validation and sanitization
- CORS configuration

## 📝 Optional API Keys

### Google Safe Browsing API
Get your API key from: https://developers.google.com/safe-browsing

### VirusTotal API
Get your API key from: https://www.virustotal.com/gui/join-us

**Note**: These APIs are optional. The application will work without them, but fraud detection capabilities will be limited.

## 🧪 Testing

Run frontend tests:
```bash
cd client/trustcheck
npm test
```

## 📦 Building for Production

Build frontend:
```bash
cd client/trustcheck
npm run build
```

Start production server:
```bash
cd server
NODE_ENV=production npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Known Issues

- Reputation service currently uses mock data (for demonstration purposes)
- Some WHOIS lookups may fail for certain domains
- SSL certificate checks may timeout for slow-responding servers

## 🚧 Future Enhancements

- Real-time reputation data integration
- Advanced content analysis with NLP
- Historical score tracking
- Email notifications for monitoring
- Bulk URL analysis
- API rate limiting dashboard
- Export analysis reports (PDF/CSV)

## 📞 Support

For issues and questions, please open an issue on the repository.

---

**Built with ❤️ for better web security**

