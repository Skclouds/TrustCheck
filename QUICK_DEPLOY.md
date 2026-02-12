# 🚀 Quick Deploy to Netlify - Step by Step

## ⚠️ Important Note

**Netlify only hosts the frontend!** You also need to deploy the backend separately (Render, Railway, etc.)

---

## 📦 Step 1: Prepare for Deployment

### **1.1 Build the Frontend**

```bash
cd client/trustcheck
npm run build
```

This creates a `build/` folder with production-ready files.

---

## 🌐 Step 2: Deploy Frontend to Netlify

### **Method A: Netlify Web Interface (Easiest)**

1. **Go to**: https://app.netlify.com
2. **Sign up/Login** (free)
3. **Click**: "Add new site" → "Import an existing project"
4. **Connect** your Git repository:
   - GitHub
   - GitLab
   - Bitbucket
5. **Select** your repository
6. **Configure build settings:**
   ```
   Base directory: client/trustcheck
   Build command: npm run build
   Publish directory: client/trustcheck/build
   ```
7. **Add environment variable:**
   - Click "Show advanced"
   - Add variable:
     ```
     Key: REACT_APP_API_URL
     Value: https://your-backend-url.com/api
     ```
   - (You'll update this after deploying backend)
8. **Click**: "Deploy site"
9. **Wait** for deployment (2-5 minutes)
10. **Your site URL**: `https://your-site-name.netlify.app`

---

### **Method B: Netlify CLI**

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login:**
   ```bash
   netlify login
   ```

3. **Navigate to frontend:**
   ```bash
   cd client/trustcheck
   ```

4. **Initialize:**
   ```bash
   netlify init
   ```
   - Choose: "Create & configure a new site"
   - Choose your team
   - Site name: `trustcheck` (or your choice)
   - Build command: `npm run build`
   - Publish directory: `build`

5. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

---

### **Method C: Drag & Drop**

1. **Build the app:**
   ```bash
   cd client/trustcheck
   npm run build
   ```

2. **Go to**: https://app.netlify.com/drop
3. **Drag** the `build` folder onto the page
4. **Your site is live!**

---

## 🖥️ Step 3: Deploy Backend (Required!)

### **Option 1: Render (Recommended - Free)**

1. **Go to**: https://render.com
2. **Sign up** (free)
3. **Click**: "New +" → "Web Service"
4. **Connect** your Git repository
5. **Configure:**
   - **Name**: `trustcheck-api`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && node src/server.js`
   - **Root Directory**: Leave empty (or set to `server`)
6. **Environment Variables:**
   ```
   PORT=10000
   NODE_ENV=production
   CLIENT_URL=https://your-netlify-site.netlify.app
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   ```
7. **Click**: "Create Web Service"
8. **Copy** your backend URL: `https://trustcheck-api.onrender.com`

---

### **Option 2: Railway (Also Free)**

1. **Go to**: https://railway.app
2. **Sign up** with GitHub
3. **New Project** → "Deploy from GitHub repo"
4. **Select** your repository
5. **Add environment variables** (same as Render)
6. **Deploy!**

---

## 🔗 Step 4: Connect Frontend to Backend

1. **Go to Netlify** → Your site → "Site settings"
2. **Environment variables** → "Add variable"
3. **Update** `REACT_APP_API_URL`:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```
4. **Save**
5. **Trigger redeploy**: "Deploys" → "Trigger deploy" → "Deploy site"

---

## 🗄️ Step 5: Setup MongoDB (Cloud Database)

### **MongoDB Atlas (Free)**

1. **Go to**: https://www.mongodb.com/cloud/atlas
2. **Sign up** (free)
3. **Create** a free cluster (M0 - Free tier)
4. **Database Access** → Create database user
5. **Network Access** → Add IP: `0.0.0.0/0` (allow all)
6. **Connect** → "Connect your application"
7. **Copy** connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/trustcheck
   ```
8. **Add to backend** environment variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/trustcheck
   ```

---

## ✅ Final Checklist

- [ ] Frontend deployed to Netlify
- [ ] Backend deployed to Render/Railway
- [ ] MongoDB Atlas cluster created
- [ ] Environment variables set in both services
- [ ] `REACT_APP_API_URL` points to backend
- [ ] CORS configured in backend
- [ ] Test the deployed application

---

## 🧪 Test Your Deployment

1. **Visit** your Netlify URL
2. **Try analyzing** a website (e.g., `google.com`)
3. **Check browser console** (F12) for errors
4. **Check backend logs** in Render/Railway dashboard

---

## 🐛 Troubleshooting

### **CORS Error**
- Update backend `CLIENT_URL` environment variable with Netlify URL
- Redeploy backend

### **API Not Working**
- Check `REACT_APP_API_URL` in Netlify environment variables
- Verify backend is running
- Check backend logs

### **Build Fails**
- Check Netlify build logs
- Ensure all dependencies are in `package.json`
- Try building locally first: `npm run build`

---

## 📊 Your URLs After Deployment

- **Frontend**: `https://your-site.netlify.app`
- **Backend**: `https://your-api.onrender.com`
- **API Endpoint**: `https://your-api.onrender.com/api`

---

**That's it!** Your TrustCheck app is now live on the internet! 🎉
