# 🚀 Deployment Guide

Complete step-by-step guide to deploy your GraphQL Portfolio Backend to production.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Option 1: Render (Recommended)](#option-1-render-recommended-)
3. [Option 2: Railway](#option-2-railway)
4. [Option 3: Vercel (Serverless)](#option-3-vercel-serverless)
5. [MongoDB Atlas Setup](#mongodb-atlas-setup)
6. [Post-Deployment](#post-deployment)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account
- ✅ Code pushed to GitHub repository
- ✅ MongoDB Atlas account (free tier)
- ✅ All tests passing (`npm test`)
- ✅ Build working locally (`npm run build`)

---

# Option 1: Render (Recommended) ⭐

**Best for:** Node.js backends with MongoDB  
**Cost:** Free tier available  
**Difficulty:** ⭐⭐⭐⭐⭐ Easy

---

## Step 1: Setup MongoDB Atlas

### 1.1 Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"**
3. Sign up with Google/GitHub or email
4. Choose **FREE** M0 Cluster

### 1.2 Create Database Cluster

1. **Choose Provider:** AWS
2. **Region:** Choose closest to your users (e.g., Frankfurt, Oregon)
3. **Cluster Name:** `portfolio-cluster`
4. Click **"Create Cluster"** (takes 3-5 minutes)

### 1.3 Configure Database Access

1. Go to **Database Access** (left sidebar)
2. Click **"Add New Database User"**
3. **Authentication Method:** Password
4. **Username:** `portfolio_admin`
5. **Password:** Generate secure password (save it!)
6. **Database User Privileges:** Read and write to any database
7. Click **"Add User"**

### 1.4 Configure Network Access

1. Go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ This is safe because authentication is required
4. Click **"Confirm"**

### 1.5 Get Connection String

1. Go to **Database** → Click **"Connect"**
2. Choose **"Connect your application"**
3. **Driver:** Node.js
4. **Version:** 5.5 or later
5. Copy the connection string:
   ```
   mongodb+srv://portfolio_admin:<password>@portfolio-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password
7. Add database name: `?retryWrites=true&w=majority&dbName=portfolio`

**Final connection string:**
```
mongodb+srv://portfolio_admin:YOUR_PASSWORD@portfolio-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority&dbName=portfolio
```

---

## Step 2: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/Backend-GraphQL-Portfolio.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Render

### 3.1 Create Render Account

1. Go to [Render](https://render.com)
2. Click **"Get Started"**
3. Sign up with **GitHub** (recommended)
4. Authorize Render to access your repositories

### 3.2 Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository:
   - Search for `Backend-GraphQL-Portfolio`
   - Click **"Connect"**

### 3.3 Configure Service

**Basic Settings:**
- **Name:** `portfolio-graphql-api` (or your choice)
- **Region:** Frankfurt (or closest to you)
- **Branch:** `main`
- **Root Directory:** Leave empty
- **Runtime:** Node
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`

**Instance Type:**
- Select **"Free"** ($0/month)

### 3.4 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

| Key | Value | Notes |
|-----|-------|-------|
| `NODE_ENV` | `production` | Required |
| `PORT` | `4000` | Optional (Render auto-assigns) |
| `MONGODB_URI` | `mongodb+srv://...` | From Step 1.5 |
| `JWT_SECRET` | Click "Generate" | Auto-generate secure secret |
| `ADMIN_USERNAME` | `admin` | Your admin username |
| `ADMIN_PASSWORD` | `your-secure-password` | Strong password! |

**Important:** Use the **full MongoDB connection string** from Step 1.5

### 3.5 Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (3-5 minutes)
3. Watch the logs for any errors

### 3.6 Verify Deployment

Once deployed, you'll get a URL like:
```
https://portfolio-graphql-api.onrender.com
```

Test your API:
```
https://portfolio-graphql-api.onrender.com/graphql
```

You should see the Apollo GraphQL Playground!

---

## Step 4: Test Your Deployed API

### 4.1 Test Health Check

Open your browser:
```
https://portfolio-graphql-api.onrender.com/graphql
```

### 4.2 Test Login Mutation

In Apollo Playground, run:

```graphql
mutation {
  login(username: "admin", password: "your-admin-password") {
    token
    user {
      id
      username
      role
    }
  }
}
```

### 4.3 Test Query

```graphql
query {
  getPortfolio {
    profile {
      fullName
      title
    }
    projects {
      title
    }
    skills {
      name
    }
  }
}
```

---

# Option 2: Railway

**Best for:** Full-stack apps  
**Cost:** $5 free credit (then pay-as-you-go)  
**Difficulty:** ⭐⭐⭐⭐ Easy

---

## Step 1: Setup MongoDB Atlas

Follow the same steps as [Render - Step 1](#step-1-setup-mongodb-atlas)

---

## Step 2: Deploy to Railway

### 2.1 Create Railway Account

1. Go to [Railway](https://railway.app)
2. Click **"Login"**
3. Sign in with **GitHub**

### 2.2 Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your `Backend-GraphQL-Portfolio` repository

### 2.3 Configure Environment Variables

1. Click on your service
2. Go to **"Variables"** tab
3. Add these variables:

```env
NODE_ENV=production
PORT=4000
MONGODB_URI=mongodb+srv://portfolio_admin:PASSWORD@cluster.mongodb.net/portfolio
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-admin-password
```

### 2.4 Configure Build Settings

Railway auto-detects Node.js. Verify:
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`

### 2.5 Deploy

1. Railway automatically deploys
2. Wait for build to complete
3. Click **"View Logs"** to monitor

### 2.6 Get Your URL

1. Go to **"Settings"** tab
2. Click **"Generate Domain"**
3. Your API will be available at:
   ```
   https://your-app.up.railway.app/graphql
   ```

---

# Option 3: Vercel (Serverless)

**Best for:** Serverless functions  
**Cost:** Free  
**Difficulty:** ⭐⭐⭐ Medium  
**Note:** ⚠️ Not ideal for GraphQL with persistent connections

---

## Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

## Step 2: Create `vercel.json`

Create this file in your project root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/graphql",
      "dest": "dist/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "dist/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

## Step 3: Deploy

```bash
# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Setup and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? backend-graphql-portfolio
# - Directory? ./
# - Override settings? No
```

## Step 4: Add Environment Variables

```bash
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add ADMIN_USERNAME
vercel env add ADMIN_PASSWORD
```

## Step 5: Deploy to Production

```bash
vercel --prod
```

---

# MongoDB Atlas Setup

Detailed MongoDB Atlas configuration (if not done yet).

## Create Free Cluster

1. **Sign up:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Create Organization:** "Portfolio"
3. **Create Project:** "Portfolio Backend"
4. **Build Database:** Choose FREE M0
5. **Provider:** AWS
6. **Region:** Closest to your users
7. **Cluster Name:** `portfolio-cluster`

## Security Setup

### Database User

```
Username: portfolio_admin
Password: [Generate secure password]
Role: Read and write to any database
```

### Network Access

```
IP Address: 0.0.0.0/0 (Allow from anywhere)
```

### Connection String

```
mongodb+srv://portfolio_admin:<password>@portfolio-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority&dbName=portfolio
```

---

# Post-Deployment

## 1. Seed Initial Data

After deployment, seed your database:

```bash
# SSH into your server (Render/Railway) or use MongoDB Compass
# Run your seed script
```

Or manually create initial profile via GraphQL:

```graphql
mutation {
  login(username: "admin", password: "your-password") {
    token
  }
}

# Use the token in headers
# Authorization: Bearer YOUR_TOKEN

mutation {
  createProfile(input: {
    fullName: "Your Name"
    title: "Your Title"
    bio: "Your bio"
    email: "your@email.com"
  }) {
    id
    fullName
  }
}
```

## 2. Update Frontend

Update your frontend to use the production API:

```javascript
// Frontend .env
VITE_API_URL=https://portfolio-graphql-api.onrender.com/graphql
```

## 3. Setup Custom Domain (Optional)

### Render

1. Go to **Settings** → **Custom Domain**
2. Add your domain: `api.yourdomain.com`
3. Add CNAME record in your DNS:
   ```
   CNAME api.yourdomain.com → your-app.onrender.com
   ```

### Railway

1. Go to **Settings** → **Domains**
2. Click **"Add Domain"**
3. Follow DNS instructions

---

# Troubleshooting

## Common Issues

### 1. Build Fails

**Error:** `Cannot find module 'typescript'`

**Solution:**
```bash
# Add typescript to dependencies (not devDependencies)
npm install --save typescript
```

### 2. MongoDB Connection Fails

**Error:** `MongoServerError: bad auth`

**Solution:**
- Check username/password in connection string
- Ensure user has correct permissions
- Verify IP whitelist (0.0.0.0/0)

### 3. Environment Variables Not Loading

**Error:** `JWT_SECRET is not defined`

**Solution:**
- Verify all env vars are set in platform dashboard
- Restart the service
- Check for typos in variable names

### 4. Port Already in Use

**Error:** `EADDRINUSE: address already in use`

**Solution:**
```typescript
// Use PORT from environment
const PORT = process.env.PORT || 4000;
```

### 5. CORS Errors

**Error:** `Access-Control-Allow-Origin`

**Solution:** Verify CORS configuration in `server.ts`:
```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
```

---

## Monitoring

### Render

- **Logs:** Dashboard → Logs tab
- **Metrics:** Dashboard → Metrics tab
- **Health:** Auto health checks on `/graphql`

### Railway

- **Logs:** Project → Deployments → View Logs
- **Metrics:** Project → Metrics tab

---

## Performance Tips

### 1. Enable Compression

```bash
npm install compression
```

```typescript
import compression from 'compression';
app.use(compression());
```

### 2. Add Rate Limiting

```bash
npm install express-rate-limit
```

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/graphql', limiter);
```

### 3. Enable MongoDB Indexes

Ensure indexes are created for frequently queried fields.

---

## Security Checklist

- ✅ Strong JWT_SECRET (min 32 characters)
- ✅ Strong ADMIN_PASSWORD
- ✅ HTTPS enabled (automatic on Render/Railway)
- ✅ CORS configured properly
- ✅ Rate limiting enabled
- ✅ MongoDB authentication enabled
- ✅ Environment variables secured
- ✅ No sensitive data in logs

---

## Backup Strategy

### MongoDB Atlas

1. Go to **Clusters** → **Backup**
2. Enable **Cloud Backup** (free on M10+)
3. Or use **mongodump** for manual backups:

```bash
mongodump --uri="mongodb+srv://..." --out=./backup
```

---

## CI/CD (Optional)

### GitHub Actions for Render

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Render

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run tests
        run: npm run test:run
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Render
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

---

## 🎉 Deployment Complete!

Your GraphQL API is now live! 🚀

**Next Steps:**
1. ✅ Test all endpoints
2. ✅ Seed initial data
3. ✅ Update frontend URL
4. ✅ Setup monitoring
5. ✅ Configure custom domain (optional)

**Your API is available at:**
- Render: `https://your-app.onrender.com/graphql`
- Railway: `https://your-app.up.railway.app/graphql`
- Vercel: `https://your-app.vercel.app/graphql`

---

## Support

- **Render Docs:** https://render.com/docs
- **Railway Docs:** https://docs.railway.app
- **MongoDB Atlas:** https://docs.atlas.mongodb.com
- **Issues:** Create an issue in your GitHub repo
