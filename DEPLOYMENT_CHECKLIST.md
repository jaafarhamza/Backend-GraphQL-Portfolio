# 🚀 Deployment Checklist

Quick checklist to deploy your GraphQL Portfolio Backend.

---

## ✅ Pre-Deployment

- [ ] All tests passing (`npm test`)
- [ ] Build works locally (`npm run build`)
- [ ] Code committed to Git
- [ ] Code pushed to GitHub
- [ ] `.env` file NOT committed (in `.gitignore`)
- [ ] MongoDB Atlas account created

---

## ✅ MongoDB Atlas Setup

- [ ] Create free M0 cluster
- [ ] Create database user (username + password)
- [ ] Set user permissions (Read & Write)
- [ ] Add IP whitelist (0.0.0.0/0)
- [ ] Get connection string
- [ ] Replace `<password>` in connection string
- [ ] Add database name to connection string
- [ ] Test connection (optional)

**Connection String Format:**
```
mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority&dbName=portfolio
```

---

## ✅ Render Deployment

### Step 1: Create Service
- [ ] Sign up/login to Render with GitHub
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repository
- [ ] Select `Backend-GraphQL-Portfolio`

### Step 2: Configure
- [ ] Name: `portfolio-graphql-api`
- [ ] Region: Frankfurt (or closest)
- [ ] Branch: `main`
- [ ] Runtime: Node
- [ ] Build Command: `npm install && npm run build`
- [ ] Start Command: `npm start`
- [ ] Instance Type: Free

### Step 3: Environment Variables
- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `4000` (optional)
- [ ] `MONGODB_URI` = Your MongoDB connection string
- [ ] `JWT_SECRET` = Generate (click "Generate" button)
- [ ] `ADMIN_USERNAME` = `admin`
- [ ] `ADMIN_PASSWORD` = Strong password

### Step 4: Deploy
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (3-5 min)
- [ ] Check logs for errors
- [ ] Note your API URL

---

## ✅ Post-Deployment

### Test API
- [ ] Open `https://your-app.onrender.com/graphql`
- [ ] Apollo Playground loads
- [ ] Test login mutation
- [ ] Test getPortfolio query

### Seed Data
- [ ] Login as admin
- [ ] Create profile
- [ ] Add skills
- [ ] Add projects
- [ ] Add experiences

### Update Frontend
- [ ] Update API URL in frontend `.env`
- [ ] Test frontend connection
- [ ] Deploy frontend

---

## ✅ Optional Enhancements

- [ ] Setup custom domain
- [ ] Enable monitoring
- [ ] Setup CI/CD with GitHub Actions
- [ ] Add rate limiting
- [ ] Enable compression
- [ ] Setup backup strategy
- [ ] Add health check endpoint

---

## 🎯 Quick Commands

```bash
# Test locally before deployment
npm test
npm run build
npm start

# Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# Check deployment logs (Render CLI)
render logs --tail

# Test deployed API
curl https://your-app.onrender.com/graphql
```

---

## 📝 Environment Variables Template

Copy this for your deployment platform:

```env
NODE_ENV=production
PORT=4000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority&dbName=portfolio
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-admin-password-here
```

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Check logs in Render dashboard
# Verify package.json scripts
# Ensure all dependencies are listed
```

### MongoDB Connection Fails
```bash
# Verify connection string
# Check username/password
# Confirm IP whitelist (0.0.0.0/0)
# Test connection locally first
```

### API Not Responding
```bash
# Check Render logs
# Verify PORT environment variable
# Ensure start command is correct
# Check health check path
```

---

## ✅ Success Criteria

Your deployment is successful when:

- ✅ API URL is accessible
- ✅ GraphQL Playground loads
- ✅ Login mutation works
- ✅ Queries return data
- ✅ Mutations work (with auth)
- ✅ No errors in logs
- ✅ Frontend can connect

---

## 🎉 Deployment Complete!

**Your API is live at:**
```
https://your-app.onrender.com/graphql
```

**Next:** Update your frontend to use this URL!

---

## 📚 Resources

- [Full Deployment Guide](./DEPLOYMENT.md)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)
