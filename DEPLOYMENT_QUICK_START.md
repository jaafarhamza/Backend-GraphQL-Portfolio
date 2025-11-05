# 🚀 Quick Deployment Guide - 5 Minutes

Deploy your GraphQL API to production in 5 simple steps.

---

## 🎯 Choose Your Platform

| Platform | Time | Cost | Difficulty | Best For |
|----------|------|------|------------|----------|
| **Render** | 5 min | Free | ⭐⭐⭐⭐⭐ | **RECOMMENDED** |
| Railway | 5 min | $5 credit | ⭐⭐⭐⭐ | Alternative |
| Vercel | 10 min | Free | ⭐⭐⭐ | Serverless |

**We'll use Render** (easiest and free!)

---

## 📋 What You Need

- ✅ GitHub account
- ✅ 5 minutes of your time
- ✅ That's it!

---

# 🚀 5-Step Deployment

## Step 1: MongoDB Atlas (2 minutes)

### 1.1 Create Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"**
3. Sign up with Google/GitHub

### 1.2 Create Database
1. Choose **FREE** M0 Cluster
2. Provider: **AWS**
3. Region: **Frankfurt** (or closest to you)
4. Click **"Create"** (wait 3 minutes)

### 1.3 Setup Access
1. **Database Access** → **Add New User**
   - Username: `portfolio_admin`
   - Password: Generate & **SAVE IT!**
   - Role: Read & Write

2. **Network Access** → **Add IP Address**
   - Click **"Allow Access from Anywhere"**

### 1.4 Get Connection String
1. Click **"Connect"** → **"Connect your application"**
2. Copy the string:
   ```
   mongodb+srv://portfolio_admin:<password>@cluster.xxxxx.mongodb.net/
   ```
3. Replace `<password>` with your actual password
4. Add `?retryWrites=true&w=majority&dbName=portfolio` at the end

**Final string:**
```
mongodb+srv://portfolio_admin:YOUR_PASSWORD@cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority&dbName=portfolio
```

✅ **MongoDB Done!** Save this connection string.

---

## Step 2: Push to GitHub (1 minute)

```bash
# If not already done
git init
git add .
git commit -m "Ready for deployment"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/Backend-GraphQL-Portfolio.git
git branch -M main
git push -u origin main
```

✅ **Code on GitHub!**

---

## Step 3: Deploy to Render (2 minutes)

### 3.1 Sign Up
1. Go to [render.com](https://render.com)
2. Click **"Get Started"**
3. Sign up with **GitHub**

### 3.2 Create Service
1. Click **"New +"** → **"Web Service"**
2. Find your `Backend-GraphQL-Portfolio` repo
3. Click **"Connect"**

### 3.3 Configure (Copy these exactly!)

**Basic:**
- Name: `portfolio-graphql-api`
- Region: `Frankfurt`
- Branch: `main`
- Runtime: `Node`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Instance: **Free**

**Environment Variables** (Click "Advanced"):

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://portfolio_admin:YOUR_PASSWORD@cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority&dbName=portfolio
JWT_SECRET=click-generate-button-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password-123
```

**Important:**
- For `JWT_SECRET`: Click the **"Generate"** button
- For `MONGODB_URI`: Paste your connection string from Step 1
- For `ADMIN_PASSWORD`: Use a strong password!

### 3.4 Deploy!
1. Click **"Create Web Service"**
2. Wait 3-5 minutes ☕
3. Watch the logs

✅ **Deployed!** You'll get a URL like:
```
https://portfolio-graphql-api.onrender.com
```

---

## Step 4: Test Your API (30 seconds)

### 4.1 Open GraphQL Playground
```
https://portfolio-graphql-api.onrender.com/graphql
```

You should see Apollo Playground! 🎉

### 4.2 Test Login
```graphql
mutation {
  login(username: "admin", password: "your-secure-password-123") {
    token
    user {
      username
      role
    }
  }
}
```

✅ **API Works!**

---

## Step 5: Seed Initial Data (Optional)

### 5.1 Login and Get Token
Run the login mutation above, copy the `token`

### 5.2 Create Profile
Add to HTTP Headers:
```json
{
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```

Then run:
```graphql
mutation {
  createProfile(input: {
    fullName: "Hamza Jaafar"
    title: "Full Stack Developer"
    bio: "Passionate developer building modern applications"
    email: "hamza@example.com"
    location: "Morocco"
  }) {
    id
    fullName
    title
  }
}
```

✅ **Data Seeded!**

---

# 🎉 You're Live!

## Your API is now available at:
```
https://portfolio-graphql-api.onrender.com/graphql
```

---

## 📱 Next Steps

### 1. Update Your Frontend
```javascript
// .env or .env.production
VITE_API_URL=https://portfolio-graphql-api.onrender.com/graphql
```

### 2. Add More Data
- Create skills
- Add projects
- Add experiences

### 3. Monitor Your API
- Check Render dashboard for logs
- Monitor performance
- Watch for errors

---

## 🔧 Common Issues

### "Build Failed"
- Check Render logs
- Verify `package.json` scripts
- Ensure all dependencies are listed

### "MongoDB Connection Failed"
- Verify connection string
- Check username/password
- Confirm IP whitelist (0.0.0.0/0)

### "API Not Responding"
- Wait 1-2 minutes (cold start)
- Check Render logs
- Verify environment variables

---

## 📊 What You Just Did

✅ Created MongoDB database (free)  
✅ Deployed Node.js API (free)  
✅ Got GraphQL endpoint (free)  
✅ Secured with JWT (free)  
✅ Ready for production (free!)

**Total Cost: $0/month** 🎉

---

## 🆘 Need Help?

1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guide
2. Check [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for step-by-step
3. Check Render logs for errors
4. Test locally first: `npm run build && npm start`

---

## 🎯 Quick Reference

### Your URLs
```
API: https://your-app.onrender.com/graphql
Health: https://your-app.onrender.com/health
Logs: https://dashboard.render.com
MongoDB: https://cloud.mongodb.com
```

### Important Commands
```bash
# Test locally
npm test
npm run build
npm start

# Push updates
git add .
git commit -m "Update"
git push

# Render auto-deploys on push! 🚀
```

---

## 🎉 Congratulations!

Your GraphQL Portfolio Backend is **LIVE IN PRODUCTION**! 🚀

**What's deployed:**
- ✅ GraphQL API with Apollo Server
- ✅ MongoDB database
- ✅ JWT authentication
- ✅ Admin protected mutations
- ✅ Public queries
- ✅ Health check endpoint

**Time taken:** ~5 minutes  
**Cost:** $0/month  
**Status:** Production-ready ✨

---

## 📚 Resources

- [Full Deployment Guide](./DEPLOYMENT.md)
- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)
- [Render Docs](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)

---

**Happy Deploying! 🚀**
