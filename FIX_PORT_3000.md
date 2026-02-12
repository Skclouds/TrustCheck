# Fix Port 3000 Already in Use

## Problem
Port 3000 is already being used by another process (PID: 13072)

## Solution Options

### Option 1: Kill the Process (Recommended)

**Find what's using port 3000:**
```powershell
netstat -ano | findstr :3000
```

**Kill the process:**
```powershell
taskkill /PID 13072 /F
```

Then restart: `npm run dev`

---

### Option 2: Use Different Port

**Update frontend `.env` file:**
```
REACT_APP_API_URL=http://localhost:5000/api
PORT=3001
```

**Or set environment variable:**
```powershell
$env:PORT=3001; npm run dev
```

Frontend will start on port 3001 instead.

---

### Option 3: Find and Close the App

1. Open Task Manager (Ctrl + Shift + Esc)
2. Go to "Details" tab
3. Find process ID 13072
4. Right-click → End Task

Then restart: `npm run dev`
