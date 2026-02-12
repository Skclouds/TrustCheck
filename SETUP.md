# Quick Setup Guide

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client/trustcheck
npm install
```

### Step 2: Configure Environment

**Backend** - Create `server/.env`:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/trustcheck
JWT_SECRET=change-this-to-a-random-string
```

**Frontend** - Create `client/trustcheck/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 3: Start MongoDB

Make sure MongoDB is running:
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### Step 4: Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client/trustcheck
npm start
```

### Step 5: Open Browser

Navigate to: **http://localhost:3000**

## ✅ Verify Installation

1. Backend should show: `🚀 Server running on port 5000`
2. Frontend should open in browser
3. Try analyzing a website (e.g., `google.com`)

## 🔑 Optional: API Keys

For enhanced fraud detection, add these to `server/.env`:

- **Google Safe Browsing**: https://developers.google.com/safe-browsing
- **VirusTotal**: https://www.virustotal.com/gui/join-us

```env
GOOGLE_SAFE_BROWSING_KEY=your-key-here
VIRUSTOTAL_API_KEY=your-key-here
```

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`

**Port Already in Use:**
- Change `PORT` in `server/.env`
- Update `REACT_APP_API_URL` in frontend `.env`

**Dependencies Error:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## 📖 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore the API endpoints
- Customize the scoring weights in `server/src/utils/scoring.js`
