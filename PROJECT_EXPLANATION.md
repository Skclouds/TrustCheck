# TrustCheck Project - Complete Learning Guide

## 📚 Table of Contents
1. [What is TrustCheck?](#what-is-trustcheck)
2. [Project Architecture](#project-architecture)
3. [Directory Structure Explained](#directory-structure-explained)
4. [Technology Stack](#technology-stack)
5. [How Data Flows](#how-data-flows)
6. [Key Files Explained](#key-files-explained)
7. [Component Interactions](#component-interactions)

---

## 🎯 What is TrustCheck?

TrustCheck is a **full-stack web application** that analyzes websites for security, reliability, and fraud risk. It's built using the **MERN stack** (MongoDB, Express, React, Node.js) with a separation between frontend (what users see) and backend (server logic).

### Core Functionality:
1. User enters a website URL
2. System analyzes 6 different aspects (Domain, Security, Fraud, Content, Transparency, Reputation)
3. Calculates a trust score (0-100)
4. Displays results with red flags and recommendations

---

## 🏗️ Project Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (Frontend)                        │
│                    React Application                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  TrustCheckApp.jsx (UI Component)                     │  │
│  │  - User Interface                                     │  │
│  │  - User Input Handling                                │  │
│  │  - Display Results                                    │  │
│  └───────────────────────────────────────────────────────┘  │
│                        ↕ HTTP Request                        │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                     SERVER (Backend)                         │
│                   Express.js API                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Routes → Controllers → Services → Models            │  │
│  │                                                       │  │
│  │  /api/analyze → analysisController →                 │  │
│  │                   ├─ domainService                   │  │
│  │                   ├─ securityService                 │  │
│  │                   ├─ fraudService                    │  │
│  │                   ├─ contentService                  │  │
│  │                   ├─ transparencyService             │  │
│  │                   └─ reputationService               │  │
│  │                                                       │  │
│  │  Result → Scoring Algorithm → Database (MongoDB)    │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Architecture Type: **RESTful API Architecture**
- **Frontend**: React SPA (Single Page Application)
- **Backend**: REST API (Representational State Transfer)
- **Database**: MongoDB (NoSQL database)
- **Communication**: HTTP/JSON

---

## 📁 Directory Structure Explained

```
trustcheck/
│
├── client/                          # Frontend Application
│   └── trustcheck/                  # React App Folder
│       ├── public/                  # Static files (HTML, images)
│       │   └── index.html          # Main HTML file
│       │
│       ├── src/                     # Source Code
│       │   ├── components/         # React Components (UI pieces)
│       │   │   └── TrustCheckApp.jsx  # Main component
│       │   │
│       │   ├── services/           # API Communication Layer
│       │   │   └── api.js          # Axios configuration & API calls
│       │   │
│       │   ├── App.js              # Root component
│       │   ├── index.js            # Entry point (mounts React app)
│       │   └── index.css           # Global styles (Tailwind CSS)
│       │
│       ├── package.json            # Frontend dependencies
│       └── tailwind.config.js      # Tailwind CSS configuration
│
├── server/                          # Backend Application
│   └── src/                         # Source Code
│       ├── config/                  # Configuration Files
│       │   └── database.js         # MongoDB connection setup
│       │
│       ├── controllers/             # Request Handlers (Business Logic)
│       │   ├── analysisController.js  # Handles /api/analyze requests
│       │   └── authController.js      # Handles user authentication
│       │
│       ├── middleware/              # Express Middleware
│       │   ├── auth.js             # JWT authentication middleware
│       │   └── rateLimiter.js      # Rate limiting (prevent abuse)
│       │
│       ├── models/                  # Database Schemas (Mongoose)
│       │   ├── Analysis.js         # Analysis result schema
│       │   └── User.js             # User schema
│       │
│       ├── routes/                  # API Route Definitions
│       │   ├── analysis.js         # Routes for /api/analyze/*
│       │   └── auth.js             # Routes for /api/auth/*
│       │
│       ├── services/                # Business Logic Services
│       │   ├── domainService.js    # Domain analysis logic
│       │   ├── securityService.js  # Security checks logic
│       │   ├── fraudService.js     # Fraud detection logic
│       │   ├── contentService.js   # Content analysis logic
│       │   ├── transparencyService.js  # Transparency checks
│       │   └── reputationService.js    # Reputation analysis
│       │
│       ├── utils/                   # Utility Functions
│       │   ├── validators.js       # URL validation & domain extraction
│       │   └── scoring.js          # Score calculation algorithms
│       │
│       ├── server.js               # Main server file (entry point)
│       └── package.json            # Backend dependencies
│
├── README.md                       # Project documentation
└── SETUP.md                        # Setup instructions
```

### Directory Purpose Explanation:

#### **Frontend (client/trustcheck/)**
- `components/`: Reusable UI components (React components)
- `services/`: Communication layer with backend API
- `src/App.js`: Root component that renders everything
- `src/index.js`: JavaScript entry point that renders React app to DOM

#### **Backend (server/src/)**
- `config/`: Configuration files (database, environment variables)
- `controllers/`: Handle HTTP requests, orchestrate services
- `middleware/`: Functions that run before/after requests (auth, logging)
- `models/`: Database schemas (define data structure)
- `routes/`: Define API endpoints and map them to controllers
- `services/`: Core business logic (analysis algorithms)
- `utils/`: Helper functions (validation, calculations)

---

## 🛠️ Technology Stack

### **Frontend Technologies:**

| Technology | Purpose | Why We Use It |
|------------|---------|---------------|
| **React 19** | UI Framework | Component-based, efficient UI updates |
| **JavaScript (ES6+)** | Programming Language | Modern JavaScript features |
| **Tailwind CSS** | Styling Framework | Utility-first CSS, rapid UI development |
| **Axios** | HTTP Client | Easy API requests, promise-based |
| **Lucide React** | Icon Library | Beautiful, consistent icons |

### **Backend Technologies:**

| Technology | Purpose | Why We Use It |
|------------|---------|---------------|
| **Node.js** | Runtime Environment | JavaScript on server-side |
| **Express.js** | Web Framework | Simple, flexible HTTP server |
| **MongoDB** | Database | NoSQL, flexible schema, good for analysis data |
| **Mongoose** | ODM (Object Document Mapper) | Easy MongoDB interaction from Node.js |
| **JWT** | Authentication | Secure token-based auth |
| **Helmet** | Security Middleware | Adds security headers |
| **CORS** | Cross-Origin Resource Sharing | Allows frontend to call backend |
| **Express Rate Limit** | Rate Limiting | Prevents API abuse |

### **External APIs & Libraries:**

| Library/API | Purpose |
|-------------|---------|
| `whois-json` | Domain WHOIS information |
| `ssl-checker` | SSL certificate validation |
| `cheerio` | HTML parsing (like jQuery for server) |
| `validator` | URL validation |
| `axios` | HTTP requests to external APIs |
| Google Safe Browsing API | Check if URL is blacklisted |
| VirusTotal API | Malware detection |

---

## 🔄 How Data Flows

### **Step-by-Step Flow When User Analyzes a Website:**

```
┌──────────────┐
│   1. USER    │  Types "google.com" in input field
│  (Frontend)  │
└──────┬───────┘
       │
       ▼
┌─────────────────────────────────┐
│ 2. TrustCheckApp.jsx            │
│    - User clicks "Analyze"      │
│    - Calls analyzeWebsite()     │
│    - Shows loading spinner      │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ 3. api.js (services/api.js)     │
│    - axios.post('/api/analyze') │
│    - Sends: { url: "google.com" }│
└──────┬──────────────────────────┘
       │
       │ HTTP POST Request
       │ http://localhost:5000/api/analyze
       │ Body: { "url": "google.com" }
       │
       ▼
┌─────────────────────────────────┐
│ 4. server.js                    │
│    - Receives request           │
│    - Routes to /api/analyze     │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ 5. routes/analysis.js           │
│    - router.post('/', ...)      │
│    - Calls analysisController   │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ 6. controllers/analysisController│
│    - validateUrl()              │
│    - extractDomain()            │
│    - Calls 6 services in parallel│
└──────┬──────────────────────────┘
       │
       ├──────────────────────────────────┐
       │                                  │
       ▼                                  ▼
┌──────────────────┐          ┌──────────────────┐
│ 7. Services      │          │ 7. Services      │
│ - domainService  │          │ - securityService│
│ - fraudService   │          │ - contentService │
│ - transparency   │          │ - reputation     │
└──────────────────┘          └──────────────────┘
       │                                  │
       └──────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────┐
│ 8. Services Return Data         │
│    {                            │
│      domainTrust: { score: 90 },│
│      security: { score: 95 },   │
│      ...                        │
│    }                            │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│ 9. Controller                   │
│    - calculateOverallScore()    │
│    - getRiskLevel()             │
│    - generateRedFlags()         │
│    - Save to MongoDB            │
└──────┬──────────────────────────┘
       │
       │ HTTP Response
       │ Status: 200 OK
       │ Body: { success: true, data: {...} }
       │
       ▼
┌─────────────────────────────────┐
│ 10. Frontend (TrustCheckApp)    │
│     - Receives response         │
│     - Updates state             │
│     - Renders results           │
│     - Shows trust score         │
└─────────────────────────────────┘
```

---

## 📄 Key Files Explained

### **Frontend Files:**

#### `client/trustcheck/src/components/TrustCheckApp.jsx`
**Purpose**: Main UI component
**Key Parts**:
```javascript
// State management
const [url, setUrl] = useState('');           // User input URL
const [loading, setLoading] = useState(false); // Loading state
const [result, setResult] = useState(null);   // Analysis results

// API call
const analyzeWebsite = async () => {
  const response = await analysisAPI.analyze(url);
  setResult(response.data.data); // Update state with results
};

// Render UI with results
return (
  <div>
    <input onChange={(e) => setUrl(e.target.value)} />
    <button onClick={analyzeWebsite}>Analyze</button>
    {result && <ResultsDisplay data={result} />}
  </div>
);
```

#### `client/trustcheck/src/services/api.js`
**Purpose**: API communication layer
**Key Parts**:
```javascript
// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add JWT token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Export API functions
export const analysisAPI = {
  analyze: (url) => api.post('/analyze', { url })
};
```

---

### **Backend Files:**

#### `server/src/server.js`
**Purpose**: Server entry point
**Key Parts**:
```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());              // Parse JSON bodies
app.use(cors());                      // Allow cross-origin requests
app.use(helmet());                    // Security headers

// Routes
app.use('/api/analyze', analysisRoutes);
app.use('/api/auth', authRoutes);

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
```

#### `server/src/routes/analysis.js`
**Purpose**: Define API endpoints
**Key Parts**:
```javascript
const router = express.Router();

// POST /api/analyze
router.post('/', 
  analysisLimiter,  // Rate limiting middleware
  optional,          // Optional auth middleware
  analyzeWebsite     // Controller function
);

module.exports = router;
```

#### `server/src/controllers/analysisController.js`
**Purpose**: Handle request logic
**Key Parts**:
```javascript
exports.analyzeWebsite = async (req, res) => {
  try {
    // 1. Validate URL
    const { url } = req.body;
    const validation = validateUrl(url);
    
    // 2. Extract domain
    const domain = extractDomain(validation.url);
    
    // 3. Run all analyses in parallel
    const [domainData, securityData, fraudData, ...] = 
      await Promise.all([
        analyzeDomain(domain),
        analyzeSecurity(url, domain),
        analyzeFraud(url, domain),
        // ... more services
      ]);
    
    // 4. Calculate scores
    const overallScore = calculateOverallScore(checks);
    const riskLevel = getRiskLevel(overallScore);
    
    // 5. Send response
    res.json({ success: true, data: analysisData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
```

#### `server/src/services/domainService.js`
**Purpose**: Domain analysis logic
**Key Parts**:
```javascript
const analyzeDomain = async (domain) => {
  // Get WHOIS data
  const whoisData = await whois(domain);
  
  // Calculate domain age
  const age = calculateDomainAge(whoisData.creationDate);
  
  // Score based on age
  let score = 100;
  if (age < 30) score -= 40;  // Very new = risky
  else if (age < 180) score -= 25;
  
  return {
    score,
    age: formatDomainAge(age),
    registrar: whoisData.registrar
  };
};
```

#### `server/src/utils/scoring.js`
**Purpose**: Score calculation
**Key Parts**:
```javascript
const calculateOverallScore = (checks) => {
  const weights = {
    domainTrust: 0.20,      // 20%
    security: 0.25,         // 25%
    fraudIndicators: 0.25,  // 25%
    contentSignals: 0.10,   // 10%
    transparency: 0.10,     // 10%
    reputation: 0.10        // 10%
  };
  
  // Weighted average
  const score = (
    checks.domainTrust.score * weights.domainTrust +
    checks.security.score * weights.security +
    // ... more
  );
  
  return Math.round(score);
};
```

---

## 🔗 Component Interactions

### **Frontend → Backend Communication:**

1. **User Action** → Component calls function
2. **Component** → Service layer (`api.js`)
3. **Service** → HTTP request to backend
4. **Backend Route** → Controller function
5. **Controller** → Services (business logic)
6. **Services** → External APIs / Database
7. **Response flows back** → Component updates UI

### **Example: Domain Analysis**

```javascript
// 1. Frontend: User clicks "Analyze"
analyzeWebsite() {
  analysisAPI.analyze('google.com');
}

// 2. Service: Makes HTTP request
api.post('/analyze', { url: 'google.com' });

// 3. Backend Route: Receives request
router.post('/', analyzeWebsite);

// 4. Controller: Orchestrates services
const domainData = await analyzeDomain('google.com');

// 5. Service: Analyzes domain
const whoisData = await whois('google.com');
// Returns: { score: 90, age: '25 years', registrar: 'MarkMonitor' }

// 6. Controller: Collects all results
const overallScore = calculateOverallScore(checks);

// 7. Response sent back
res.json({ success: true, data: { overallScore: 85, ... } });

// 8. Frontend: Updates UI
setResult(response.data.data); // Displays results
```

---

## 🎓 Learning Concepts Used

### **1. Separation of Concerns**
- **Frontend**: UI and user interaction
- **Backend**: Business logic and data processing
- **Database**: Data storage

### **2. MVC Pattern (Model-View-Controller)**
- **Model**: Database schemas (`models/`)
- **View**: React components (`components/`)
- **Controller**: Request handlers (`controllers/`)

### **3. Service-Oriented Architecture**
- Each service handles one aspect (domain, security, etc.)
- Services are independent and reusable
- Easy to test and maintain

### **4. RESTful API Design**
- `POST /api/analyze` - Create analysis
- `GET /api/analyze/:id` - Get analysis
- `GET /api/analyze/history` - List analyses

### **5. Async/Await Pattern**
```javascript
// Instead of callbacks (.then())
const data = await someAsyncFunction();

// Parallel execution
const [result1, result2] = await Promise.all([
  function1(),
  function2()
]);
```

### **6. State Management (React)**
```javascript
const [state, setState] = useState(initialValue);
// Updates trigger re-render
```

### **7. Middleware Pattern (Express)**
```javascript
// Functions that run before request handlers
app.use(middleware1); // Runs for all routes
router.post('/', middleware2, handler); // Specific route
```

---

## 🚀 Key Takeaways

1. **Frontend** = What users see and interact with
2. **Backend** = Server that processes requests and data
3. **API** = Communication bridge between frontend and backend
4. **Database** = Stores data persistently
5. **Services** = Reusable business logic components
6. **Controllers** = Orchestrate services and handle requests
7. **Middleware** = Functions that run before/after requests

This architecture makes the code:
- ✅ **Maintainable**: Easy to update one part without affecting others
- ✅ **Scalable**: Can add new features easily
- ✅ **Testable**: Each component can be tested independently
- ✅ **Reusable**: Services can be used by multiple controllers

---

## 📚 Next Steps for Learning

1. **Understand HTTP**: GET, POST, PUT, DELETE requests
2. **Learn React**: Components, state, props, hooks
3. **Learn Node.js**: Async programming, modules, npm
4. **Learn MongoDB**: Collections, documents, queries
5. **Practice**: Try adding a new analysis service
6. **Debug**: Use browser DevTools and console.log()

---

**Happy Learning! 🎉**
