# 🚀 Start Both Servers Together - Quick Guide

## ✅ Easiest Method (Recommended)

From the **project root directory**, simply run:

```bash
npm run dev
```

This will start both backend and frontend servers in **one terminal** with color-coded output!

---

## 📋 What Happens

When you run `npm run dev`:

1. ✅ **Backend** starts on `http://localhost:5000`
2. ✅ **Frontend** starts on `http://localhost:3000`
3. ✅ **Browser** opens automatically
4. ✅ Both servers run in the **same terminal** with colored output

---

## 🎨 Terminal Output

You'll see output like this:

```
[0] 🚀 Server running on port 5000
[1] Compiled successfully!
[1] Local: http://localhost:3000
```

- `[0]` = Backend server
- `[1]` = Frontend server

---

## 🛑 How to Stop

Press `Ctrl + C` in the terminal - this stops **both servers** at once!

---

## 🔄 Alternative Methods

### **Method 2: Batch File (Windows)**

Double-click `start.bat` in the project root.

This opens:
- Backend in one window
- Frontend in another window

Close the windows to stop the servers.

---

### **Method 3: PowerShell Script**

Run:
```powershell
.\start.ps1
```

Opens both servers in separate PowerShell windows.

---

## ⚙️ Setup (One-Time)

If you haven't installed dependencies yet:

```bash
# Install root dependencies (concurrently)
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client/trustcheck
npm install
```

---

## 🎯 Quick Commands

| Command | What It Does |
|---------|-------------|
| `npm run dev` | Start both servers together |
| `npm run server` | Start only backend |
| `npm run client` | Start only frontend |

---

## 📝 Notes

- ✅ Both servers auto-reload when you change code
- ✅ Backend must start before frontend can connect
- ✅ If port 5000 or 3000 is busy, you'll see an error
- ✅ Check terminal output for any errors

---

**That's it!** Just run `npm run dev` from the project root! 🎉
