# How to Upload TrustCheck to Netlify – Step by Step

This guide walks you through uploading and deploying the TrustCheck frontend to Netlify. You can use **Git** (recommended) or **Drag & Drop**.

---

## Before You Start

1. **Backend URL**  
   The frontend calls an API. You need either:
   - Your deployed backend URL (e.g. `https://trustcheck-api.onrender.com`), or  
   - A placeholder for now (e.g. `http://localhost:5000`). You can change it later in Netlify.

2. **Project location**  
   All steps assume your project root is the folder that contains `client` and `server` (e.g. `D:\Study\Project\trustcheck`).

---

# Method 1: Deploy with Git (Recommended)

Use this if your project is on **GitHub**, **GitLab**, or **Bitbucket**. Netlify will build and deploy on every push.

---

## Step 1: Push Your Code to GitHub

1. Create a **GitHub** account if you don’t have one: https://github.com  
2. Install **Git**: https://git-scm.com  
3. Open **Command Prompt** or **PowerShell** in your project folder:
   ```bash
   cd D:\Study\Project\trustcheck
   ```
4. If the folder is not a Git repo yet:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - TrustCheck"
   ```
5. On GitHub, click **New repository**. Name it e.g. `trustcheck`. Do **not** add README or .gitignore.  
6. Copy the repository URL (e.g. `https://github.com/YourUsername/trustcheck.git`).  
7. In your project folder, run (replace with your URL):
   ```bash
   git remote add origin https://github.com/YourUsername/trustcheck.git
   git branch -M main
   git push -u origin main
   ```
8. Enter your GitHub username and password (or token) when asked.  
Your code is now on GitHub.

---

## Step 2: Create a Netlify Account

1. Go to **https://www.netlify.com**  
2. Click **Sign up**  
3. Choose **Sign up with GitHub** (or Email)  
4. Complete sign-up and log in  
5. You should see the Netlify dashboard: **https://app.netlify.com**

---

## Step 3: Add a New Site from Git

1. On the Netlify dashboard, click **Add new site** (or **Add site**).  
2. Choose **Import an existing project**.  
3. Click **Deploy with GitHub** (or GitLab / Bitbucket).  
4. If asked, click **Authorize Netlify** and choose your GitHub account.  
5. Under **Install Netlify**, choose your account (e.g. your username or team).  
6. Pick the repository that has TrustCheck (e.g. `trustcheck`).  
7. Click **Next** or **Configure build settings**.

---

## Step 4: Configure Build Settings

Netlify will show a form. Set these **exactly**:

| Setting            | Value              |
|--------------------|--------------------|
| **Branch to deploy** | `main` (or your default branch) |
| **Base directory**   | `client/trustcheck` |
| **Build command**    | `npm run build`     |
| **Publish directory** | `build`           |

- **Base directory**: Click **Edit settings** → **Option: Edit build settings** (or similar), then type `client/trustcheck`.  
- **Publish directory**: Must be `build` (relative to base). Do **not** use `client/trustcheck/build`.

If your repo has a **netlify.toml** at the root with these values, Netlify may pre-fill them. Confirm they match the table above.

---

## Step 5: Add Environment Variable (API URL)

1. On the same build settings screen, find **Environment variables** (or **Advanced build settings**).  
2. Click **Add a variable** or **New variable**.  
3. Add:
   - **Key:** `REACT_APP_API_URL`  
   - **Value:** Your backend API base URL + `/api`  
   - Examples:
     - Backend on Render: `https://trustcheck-api.onrender.com/api`
     - Local backend (for testing): `http://localhost:5000/api`  
4. Click **Save** or **Add variable**.

---

## Step 6: Deploy the Site

1. Click **Deploy site** (or **Deploy trustcheck**).  
2. Netlify will:
   - Clone your repo  
   - Run `npm install` and `npm run build` inside `client/trustcheck`  
   - Publish the `build` folder  
3. Wait 2–5 minutes. You’ll see a **Building** log.  
4. When the status is **Published**, the deploy is done.

---

## Step 7: Open Your Live Site

1. At the top, Netlify shows your site URL, e.g. `https://random-name-12345.netlify.app`.  
2. Click the link to open TrustCheck in the browser.  
3. Try entering a URL and clicking **Analyze**.  
   - If the backend is deployed and `REACT_APP_API_URL` is correct, analysis will work.  
   - If you used `http://localhost:5000/api`, it will only work when your local backend is running.

---

## Step 8: Change API URL Later (Optional)

1. In Netlify, open your site.  
2. Go to **Site configuration** → **Environment variables** (or **Build & deploy** → **Environment**).  
3. Edit **REACT_APP_API_URL** and set it to your production backend, e.g. `https://trustcheck-api.onrender.com/api`.  
4. Go to **Deploys** → **Trigger deploy** → **Deploy site**.  
5. After the new deploy finishes, the app will use the new API.

---

# Method 2: Deploy with Drag & Drop (No Git)

Use this if you don’t want to use Git. You upload a built folder manually. You’ll need to **rebuild and re-upload** whenever you change the code.

---

## Step 1: Build the Project on Your Computer

1. Open **Command Prompt** or **PowerShell**.  
2. Go to the frontend folder and build:
   ```bash
   cd D:\Study\Project\trustcheck\client\trustcheck
   npm install
   npm run build
   ```
3. When it finishes, a **build** folder is created inside `client\trustcheck`.

---

## Step 2: Create Netlify Account (If Needed)

1. Go to **https://www.netlify.com**  
2. Sign up or log in

---

## Step 3: Deploy the Build Folder

1. Go to **https://app.netlify.com**  
2. Find the **Sites** page.  
3. Look for **“Want to deploy a new site without connecting to Git? Drag and drop your site output folder here”** (or **Add new site** → **Deploy manually**).  
4. Open File Explorer and go to:
   ```
   D:\Study\Project\trustcheck\client\trustcheck\build
   ```
5. **Drag the entire `build` folder** (not its contents) and drop it onto the Netlify drop zone.  
6. Netlify will upload and publish. In 1–2 minutes your site will be live.  
7. Click the generated URL (e.g. `https://random-name.netlify.app`) to open TrustCheck.

---

## Step 4: Set API URL (Drag & Drop Sites)

For drag-and-drop deploys, env vars are set in the UI but **React bakes in `REACT_APP_*` at build time**. So:

- If you built with a **.env** or **.env.production** that had `REACT_APP_API_URL=https://your-api.com/api`, that value is already in the build.  
- If you didn’t, you need to **rebuild** with the correct API URL, then **drag and drop the new `build` folder** again.

To use a different API URL later:

1. In `client\trustcheck`, create or edit **.env.production**:
   ```env
   REACT_APP_API_URL=https://trustcheck-api.onrender.com/api
   ```
2. Run again:
   ```bash
   npm run build
   ```
3. In Netlify, go to **Deploys** and drag and drop the new **build** folder to trigger a new deploy.

---

# Checklist – Netlify Upload

- [ ] Code is in Git (for Method 1) or you have a built `build` folder (for Method 2).  
- [ ] Netlify account created.  
- [ ] **Method 1:** Site added from Git; Base directory = `client/trustcheck`, Build = `npm run build`, Publish = `build`.  
- [ ] **Method 1:** Environment variable `REACT_APP_API_URL` set (e.g. `https://your-backend.onrender.com/api`).  
- [ ] **Method 2:** `npm run build` run; `build` folder dragged to Netlify.  
- [ ] Deploy finished and site URL opens.  
- [ ] If backend is live, **Analyze** works on the Netlify site.

---

# Quick Reference

| What              | Value                    |
|-------------------|--------------------------|
| Base directory    | `client/trustcheck`      |
| Build command     | `npm run build`          |
| Publish directory | `build`                  |
| Env variable      | `REACT_APP_API_URL` = `https://YOUR-BACKEND-URL/api` |

---

# Troubleshooting

- **Build failed**  
  Check the **Deploy log** in Netlify. Fix any missing dependencies or errors; ensure **Base directory** is `client/trustcheck` and **Build command** is `npm run build`.

- **Blank page**  
  Confirm **Publish directory** is `build` (not `client/trustcheck/build` when base is set). Redeploy.

- **“Analysis failed” or network error**  
  Set **REACT_APP_API_URL** to your real backend URL (e.g. `https://trustcheck-api.onrender.com/api`), then trigger a new deploy.

- **CORS error**  
  Fix this on the **backend**: set allowed origin to your Netlify URL (e.g. `https://your-site.netlify.app`). Netlify only serves the frontend.

---

After these steps, TrustCheck is uploaded and running on Netlify.
