# 🚀 How to Run TrustCheck - Step by Step Guide

## Prerequisites Checklist

Before running, make sure you have:
- ✅ Node.js installed (v16 or higher)
- ✅ npm installed (comes with Node.js)
- ✅ MongoDB installed and running (optional - app works without it)

---

## 📋 Step-by-Step Instructions

### **Step 1: Open Terminal/Command Prompt**

Open **TWO separate terminal windows** (you'll need both running simultaneously):
- **Terminal 1**: For Backend Server
- **Terminal 2**: For Frontend Server

---

### **Step 2: Navigate to Project Directory**

In both terminals, navigate to your project:
```bash
cd D:\Study\Project\trustcheck
```

---

### **Step 3: Check Environment Files**

Verify these files exist:

**Backend** (`server/.env`):
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/trustcheck
JWT_SECRET=your-secret-key-12345
```

**Frontend** (`client/trustcheck/.env`):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

> **Note**: If `.env` files don't exist, copy from `env.example.txt` files

---

### **Step 4: Start Backend Server** (Terminal 1)

```bash
cd server
npm run dev
```

**Expected Output:**
```
✅ MongoDB Connected: localhost  (or warning if MongoDB not running)
🚀 Server running on port 5000
📊 Environment: development
🌐 API URL: http://localhost:5000
```

> **Note**: If you see a MongoDB warning, that's OK - the app will still work (just without caching).

---

### **Step 5: Start Frontend Server** (Terminal 2)

**IMPORTANT**: Keep Terminal 1 running, open a **NEW terminal window**

```bash
cd client\trustcheck
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view trustcheck in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

The browser should **automatically open** to `http://localhost:3000`

---

### **Step 6: Test the Application**

1. **Browser opens** → You should see the TrustCheck interface
2. **Enter a URL** → Try `google.com` or `example.com`
3. **Click "Analyze"** → Wait for analysis to complete
4. **View Results** → See trust score, risk level, and detailed breakdown

---

## 🎯 Quick Commands Reference

### **Windows PowerShell/CMD:**

**Terminal 1 (Backend):**
```powershell
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```powershell
cd client\trustcheck
npm start
```

### **Alternative: Start Both in One Command**

You can also use PowerShell to run both:
```powershell
# Terminal 1
cd server; npm run dev

# Terminal 2 (in new window)
cd client\trustcheck; npm start
```

---

## ✅ Success Indicators

You'll know it's working when:

1. **Backend Terminal shows:**
   ```
   🚀 Server running on port 5000
   ```

2. **Frontend Terminal shows:**
   ```
   Compiled successfully!
   Local: http://localhost:3000
   ```

3. **Browser opens automatically** to TrustCheck interface

4. **You can analyze a website** without errors

---

## 🐛 Common Issues & Solutions

### **Issue 1: Port 5000 already in use**

**Solution:**
1. Change port in `server/.env`:
   ```env
   PORT=5001
   ```
2. Update frontend `.env`:
   ```env
   REACT_APP_API_URL=http://localhost:5001/api
   ```
3. Restart both servers

---

### **Issue 2: Port 3000 already in use**

**Solution:**
- When prompted, choose **"Y"** to use a different port
- Or manually stop the process using port 3000

---

### **Issue 3: "Cannot find module" error**

**Solution:**
```bash
# Reinstall dependencies
cd server
npm install

cd ..\client\trustcheck
npm install
```

---

### **Issue 4: MongoDB Connection Error**

**Solution:**
- **Option A**: Start MongoDB service:
  ```bash
  # Windows (if MongoDB is installed as service)
  net start MongoDB
  
  # Or run MongoDB manually
  mongod
  ```

- **Option B**: App will work without MongoDB (just shows warning)

---

### **Issue 5: "Analysis failed" error**

**Check:**
1. Backend server is running on port 5000
2. Frontend `.env` has correct API URL
3. Check backend terminal for error messages
4. Open browser DevTools (F12) → Console tab → Check for errors

---

## 🛑 How to Stop the Servers

### **Stop Backend:**
- In Terminal 1, press `Ctrl + C`

### **Stop Frontend:**
- In Terminal 2, press `Ctrl + C`

---

## 📊 What's Running Where

| Service | Port | URL | Terminal |
|---------|------|-----|----------|
| **Backend API** | 5000 | http://localhost:5000 | Terminal 1 |
| **Frontend App** | 3000 | http://localhost:3000 | Terminal 2 |
| **MongoDB** (optional) | 27017 | mongodb://localhost:27017 | Separate |

---

## 🎓 Understanding the Process

1. **Backend** (`npm run dev`) → Starts API server that processes analysis
2. **Frontend** (`npm start`) → Starts React app that users interact with
3. **Browser** → Opens automatically and connects to frontend
4. **User Action** → Frontend sends request to Backend → Backend analyzes → Sends results back

---

## 🚀 Quick Start - Multiple Options

### **Option 1: Start Both Together (RECOMMENDED) ⭐**

**From project root directory:**
```powershell
npm run dev
```

This starts both backend and frontend in one terminal with color-coded output!

---

### **Option 2: Use Start Scripts**

**Windows Batch File:**
```bash
start.bat
```
Double-click `start.bat` or run in terminal - opens both servers in separate windows.

**PowerShell Script:**
```powershell
.\start.ps1
```
Opens both servers in separate PowerShell windows.

---

### **Option 3: Manual Start (Two Terminals)**

**Terminal 1:**
```powershell
cd server
npm run dev
```

**Terminal 2:**
```powershell
cd client\trustcheck
npm start
```

---

## 📝 Notes

- ⚠️ **Keep both terminals open** while using the app
- ✅ Backend must be running before analyzing websites
- 🔄 If you make code changes, servers auto-reload (hot reload)
- 🌐 Backend runs on port 5000, Frontend on port 3000

---

**Ready to go!** 🎉

Start Terminal 1 → Start Terminal 2 → Browser opens → Start analyzing! 🚀
