# TrustCheck - Quick Reference Guide

## 🗂️ Project Structure (Simplified)

```
trustcheck/
│
├── 📱 CLIENT (Frontend - What users see)
│   └── trustcheck/src/
│       ├── components/    → UI pieces (TrustCheckApp.jsx)
│       ├── services/      → API calls (api.js)
│       └── App.js         → Entry point
│
└── 🖥️ SERVER (Backend - Processing logic)
    └── src/
        ├── routes/        → API endpoints
        ├── controllers/   → Request handlers
        ├── services/      → Business logic (6 analysis services)
        ├── models/        → Database schemas
        ├── utils/         → Helper functions
        └── server.js      → Entry point
```

## 🔄 Request Flow (Simple Version)

```
USER → Frontend → API Call → Backend Route → Controller → Services → Response → Frontend → Display
```

## 📋 File Responsibilities

### Frontend
| File | What It Does |
|------|--------------|
| `TrustCheckApp.jsx` | Shows UI, handles user input, displays results |
| `api.js` | Makes HTTP requests to backend |
| `App.js` | Renders the main component |

### Backend
| File | What It Does |
|------|--------------|
| `server.js` | Starts server, sets up middleware |
| `routes/analysis.js` | Defines `/api/analyze` endpoint |
| `controllers/analysisController.js` | Handles analysis request, coordinates services |
| `services/*.js` | Each analyzes one aspect (domain, security, etc.) |
| `utils/scoring.js` | Calculates final trust score |
| `models/Analysis.js` | Database structure for storing results |

## 🛠️ Technologies Cheat Sheet

| Where | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React | Build UI components |
| Frontend | Tailwind CSS | Style the interface |
| Frontend | Axios | Make API calls |
| Backend | Node.js | Run JavaScript on server |
| Backend | Express | Web framework (HTTP server) |
| Backend | MongoDB | Store analysis results |
| Backend | Mongoose | Interact with MongoDB |

## 📊 Data Flow Example

**User enters: "google.com"**

1. **Frontend**: User types URL → `url` state = "google.com"
2. **Frontend**: Clicks Analyze → `analyzeWebsite()` called
3. **Frontend**: `api.js` → POST to `http://localhost:5000/api/analyze`
4. **Backend**: `routes/analysis.js` receives request
5. **Backend**: `analysisController.js` → validates URL, extracts domain
6. **Backend**: Controller calls 6 services in parallel:
   - `domainService` → checks domain age, WHOIS
   - `securityService` → checks HTTPS, SSL
   - `fraudService` → checks blacklists
   - `contentService` → analyzes page content
   - `transparencyService` → checks privacy policy, contact
   - `reputationService` → checks reviews, ratings
7. **Backend**: `scoring.js` → calculates overall score (weighted average)
8. **Backend**: Controller → sends JSON response
9. **Frontend**: Receives response → updates `result` state
10. **Frontend**: React re-renders → shows results on screen

## 🎯 Key Concepts

### 1. **State Management (React)**
```javascript
const [url, setUrl] = useState('');  // Store user input
const [result, setResult] = useState(null);  // Store analysis results
```

### 2. **API Communication**
```javascript
// Frontend sends
axios.post('/api/analyze', { url: 'google.com' })

// Backend responds
res.json({ success: true, data: {...} })
```

### 3. **Async/Await**
```javascript
// Wait for result before continuing
const data = await someAsyncFunction();
```

### 4. **Promise.all (Parallel Execution)**
```javascript
// Run multiple things at once
const [result1, result2] = await Promise.all([
  function1(),
  function2()
]);
```

## 🚦 Common Tasks

### Add a New Analysis Service
1. Create `server/src/services/newService.js`
2. Export `analyzeNew()` function
3. Import in `analysisController.js`
4. Add to `Promise.all()` array

### Change Scoring Weights
Edit `server/src/utils/scoring.js`:
```javascript
const weights = {
  domainTrust: 0.20,  // Change these percentages
  security: 0.25,
  // ...
};
```

### Add a New API Endpoint
1. Create route in `server/src/routes/`
2. Create controller function in `server/src/controllers/`
3. Add route to `server.js`

## 📝 Important URLs

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- API Endpoint: `http://localhost:5000/api/analyze`

## 🔍 Debugging Tips

1. **Check Console**: Browser DevTools (F12) → Console tab
2. **Check Network**: DevTools → Network tab → See API calls
3. **Backend Logs**: Terminal where server is running
4. **Common Issues**:
   - CORS error → Backend not allowing frontend origin
   - 404 error → Route doesn't exist
   - 500 error → Server error (check backend logs)
   - Connection refused → Server not running

## 🎓 Learning Path

1. ✅ **Basic**: Understand file structure
2. ✅ **Intermediate**: Trace data flow
3. ✅ **Advanced**: Modify services, add features

---
**Quick Tip**: Start by understanding ONE file completely, then move to related files!
