# TrustCheck – Deployment Guide

Deploy the **frontend** to Netlify and the **backend** to Render. Use this guide in order.

---

## Prerequisites

Before you start:

- [ ] **Git** – Project in a Git repo (GitHub, GitLab, or Bitbucket)
- [ ] **Accounts** – Netlify, Render, MongoDB Atlas (all have free tiers)
- [ ] **Node.js** – Installed locally so you can run `npm run build`

---

## Deployment order

1. **MongoDB Atlas** – Create cluster and get connection string  
2. **Backend (Render)** – Deploy API and get backend URL  
3. **Frontend (Netlify)** – Deploy React app and point it to backend  
4. **Connect & test** – Set env vars and verify the app

---

# Part 1: MongoDB Atlas (Database)

Backend needs a MongoDB connection string. Set this up first.

### Step 1.1: Create account and cluster

1. Go to **https://www.mongodb.com/cloud/atlas**
2. Click **Try Free** and create an account (or sign in).
3. Create a new organization if asked (name it e.g. `TrustCheck`).
4. Create a project (e.g. `TrustCheck`).
5. Click **Build a Database**.
6. Choose **M0 FREE** and click **Create**.
7. Select a region close to you and click **Create Cluster**.

### Step 1.2: Database user

1. When prompted **Security Quickstart**, choose **Username and Password**.
2. Create a user:
   - Username: e.g. `trustcheck-user`
   - Password: generate a strong one and **save it**.
3. Click **Create User**.

### Step 1.3: Network access

1. Under **Where would you like to connect from?**, choose **My Local Environment** (or add **0.0.0.0/0** later for “allow from anywhere”).
2. For simplicity, add **0.0.0.0/0** (Allow access from anywhere) so Render can connect.
3. Click **Add IP Address** / **Finish and Close**.

### Step 1.4: Get connection string

1. Click **Connect** on your cluster.
2. Choose **Drivers** (or “Connect your application”).
3. Copy the connection string. It looks like:
   ```text
   mongodb+srv://trustcheck-user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with the user password (special characters must be URL-encoded).
5. Add database name before `?`:
   ```text
   mongodb+srv://trustcheck-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/trustcheck?retryWrites=true&w=majority
   ```
6. Save this as **MONGODB_URI** – you will use it in Render.

---

# Part 2: Backend on Render

Deploy the Node.js API first so you have a backend URL for the frontend.

### Step 2.1: Push code to Git

1. Ensure the project is in GitHub (or GitLab/Bitbucket).
2. Commit and push the latest code (including `server/` and `client/trustcheck/`).

### Step 2.2: Create Web Service on Render

1. Go to **https://render.com** and sign up / log in.
2. Click **New +** → **Web Service**.
3. Connect your Git provider (e.g. GitHub) and **authorize Render**.
4. Select the repository that contains TrustCheck.
5. Click **Connect**.

### Step 2.3: Configure the service

Use these settings exactly:

| Field | Value |
|-------|--------|
| **Name** | `trustcheck-api` (or any name you like) |
| **Region** | Choose closest to you |
| **Root Directory** | `server` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node src/server.js` |
| **Instance Type** | **Free** |

Leave **Advanced** options as default unless you need them.

### Step 2.4: Environment variables (Render)

Click **Advanced** → **Add Environment Variable** and add:

| Key | Value |
|-----|--------|
| `NODE_ENV` | `production` |
| `CLIENT_URL` | `https://YOUR-NETLIFY-SITE-NAME.netlify.app` (you will update this after Netlify; use a placeholder for now, e.g. `https://trustcheck.netlify.app`) |
| `MONGODB_URI` | The full connection string from Part 1 (e.g. `mongodb+srv://...`) |
| `JWT_SECRET` | A long random string (e.g. generate with `openssl rand -hex 32`) |

**Note:** Render sets `PORT` automatically; do not override it unless required.

### Step 2.5: Deploy backend

1. Click **Create Web Service**.
2. Wait for the first deploy to finish (build + start).
3. Open the service URL (e.g. `https://trustcheck-api.onrender.com`).
4. You should see JSON like: `{"message":"TrustCheck API is running",...}`.
5. **Copy the full backend URL** (e.g. `https://trustcheck-api.onrender.com`) – no `/api` at the end. You will use it as `REACT_APP_API_URL` base.

---

# Part 3: Frontend on Netlify

Deploy the React app and point it to your Render backend.

### Step 3.1: Ensure build works locally

From the project root:

```bash
cd client/trustcheck
npm install
npm run build
```

If the build fails, fix errors before deploying.

### Step 3.2: Add Netlify redirects (if not already present)

The repo should have `client/trustcheck/public/_redirects` with:

```text
/*    /index.html   200
```

This keeps client-side routing working on Netlify.

### Step 3.3: Deploy via Netlify (Git)

1. Go to **https://app.netlify.com** and sign up / log in.
2. Click **Add new site** → **Import an existing project**.
3. Choose **GitHub** (or your Git provider) and authorize Netlify.
4. Select the **repository** that contains TrustCheck.
5. Configure the build:

   | Field | Value |
   |-------|--------|
   | **Branch to deploy** | `main` (or your default branch) |
   | **Base directory** | `client/trustcheck` |
   | **Build command** | `npm run build` |
   | **Publish directory** | `build` |

   With **Base directory** = `client/trustcheck`, **Publish directory** is relative to that, so use `build` (not `client/trustcheck/build`).

6. Click **Add environment variables** → **Add a variable** (or **Add single variable**):

   | Key | Value |
   |-----|--------|
   | `REACT_APP_API_URL` | `https://YOUR-RENDER-URL/api` |

   Example: if Render URL is `https://trustcheck-api.onrender.com`, use:

   ```text
   https://trustcheck-api.onrender.com/api
   ```

7. Click **Deploy site** (or **Save & deploy**).
8. Wait for the deploy to finish.
9. Open the Netlify site URL (e.g. `https://random-name-123.netlify.app`).
10. **Copy the Netlify site URL** – you will use it for CORS and for `CLIENT_URL` on Render.

### Step 3.4: (Optional) Deploy via Netlify CLI

If you prefer CLI:

```bash
npm install -g netlify-cli
cd client/trustcheck
netlify login
netlify init
```

- Create a new site, set build command to `npm run build`, publish directory to `build`.
- Add `REACT_APP_API_URL` in Netlify dashboard (Site settings → Environment variables).

Then:

```bash
netlify deploy --prod
```

---

# Part 4: Connect backend and frontend

### Step 4.1: Set frontend URL on backend (Render)

1. In **Render** → your **Web Service** → **Environment**.
2. Update **CLIENT_URL** to your **exact** Netlify URL (no trailing slash), e.g.:
   ```text
   https://your-site-name.netlify.app
   ```
3. Save. Render will redeploy automatically.

Your backend already uses `CLIENT_URL` for CORS; no code change is needed if it’s set correctly.

### Step 4.2: Confirm frontend API URL (Netlify)

1. In **Netlify** → your site → **Site configuration** → **Environment variables**.
2. Ensure **REACT_APP_API_URL** is exactly:
   ```text
   https://YOUR-RENDER-SERVICE-URL/api
   ```
3. If you change it, trigger a **new deploy** (Deploys → Trigger deploy → Deploy site).

---

# Part 5: Verify deployment

### Step 5.1: Backend

- Open `https://YOUR-RENDER-URL` in the browser. You should see TrustCheck API JSON.
- Open `https://YOUR-RENDER-URL/api/analyze` with a tool like Postman: POST, body `{"url":"https://example.com"}`. You should get a JSON response (or validation error), not a CORS or 404 error.

### Step 5.2: Frontend

- Open your Netlify URL.
- Enter a URL (e.g. `example.com`) and click **Analyze**.
- You should see loading state, then trust score and details.

### Step 5.3: If something fails

- **CORS / “blocked by CORS”**: Double-check **CLIENT_URL** on Render (exact Netlify URL, HTTPS, no trailing slash). Redeploy backend.
- **“Analysis failed” / network error**: Check **REACT_APP_API_URL** on Netlify (must be `https://.../api`). Redeploy frontend.
- **Backend 500 / DB error**: Check **MONGODB_URI** and **JWT_SECRET** on Render. Check Render logs.
- **Build failed on Netlify**: Check build logs; ensure **Base directory** is `client/trustcheck` and **Publish directory** is `build`. Run `npm run build` locally and fix any errors.

---

# Summary checklist

- [ ] **MongoDB Atlas**: Cluster created, user created, IP allowlist set, connection string saved.
- [ ] **Render**: Web Service created, **Root directory** = `server`, **Start command** = `node src/server.js`, env vars set (`NODE_ENV`, `CLIENT_URL`, `MONGODB_URI`, `JWT_SECRET`), deploy successful, backend URL copied.
- [ ] **Netlify**: Site created from Git, **Base directory** = `client/trustcheck`, **Build** = `npm run build`, **Publish** = `build`, **REACT_APP_API_URL** = `https://YOUR-RENDER-URL/api`, deploy successful.
- [ ] **Connect**: **CLIENT_URL** on Render = your Netlify URL; **REACT_APP_API_URL** on Netlify = `https://YOUR-RENDER-URL/api`.
- [ ] **Test**: Backend URL returns API JSON; Netlify site loads and analysis works.

---

# Production environment variables reference

**Render (backend)**

| Variable | Example / description |
|----------|------------------------|
| `NODE_ENV` | `production` |
| `CLIENT_URL` | `https://your-site.netlify.app` |
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/trustcheck?retryWrites=true&w=majority` |
| `JWT_SECRET` | Long random string |

**Netlify (frontend)**

| Variable | Example |
|----------|---------|
| `REACT_APP_API_URL` | `https://trustcheck-api.onrender.com/api` |

---

# Architecture overview

```text
Browser
   │
   ├── Frontend (Netlify)     https://your-site.netlify.app
   │   └── React app (static)
   │
   └── API calls to
         │
         ▼
   Backend (Render)          https://trustcheck-api.onrender.com
   └── Node.js / Express
         │
         ▼
   MongoDB Atlas
   └── Database
```

---

**Need help?** Use the build and deploy logs in Netlify and Render to see exact error messages.
