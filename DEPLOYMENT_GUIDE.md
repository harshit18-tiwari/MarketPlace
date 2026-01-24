# 🚀 Deployment Configuration Guide

## Frontend Deployment (Vercel)

Your frontend is deployed at: **https://market-place-ten-rho.vercel.app/**

### Vercel Environment Variables

In your Vercel project dashboard, add this environment variable:

```
VITE_API_URL=https://marketplace-orn7.onrender.com
```

**Steps:**
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add new variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://marketplace-orn7.onrender.com`
4. Redeploy your frontend

---

## Backend Deployment (Render)

Your backend API is deployed at: **https://marketplace-orn7.onrender.com**

### Render Environment Variables

Make sure these are set in your Render dashboard:

```
MONGODB_URI=mongodb+srv://ashutosh12:Ashutosh12@cluster0.gwdwoza.mongodb.net/student-marketplace?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=production
PORT=5000
```

**Important:** Also add CORS configuration to allow your Vercel frontend:
```
FRONTEND_URL=https://market-place-ten-rho.vercel.app
```

---

## Local Development

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://ashutosh12:Ashutosh12@cluster0.gwdwoza.mongodb.net/student-marketplace?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

### Running Locally:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

---

## How It Works

The `api.js` file automatically handles environments:

```javascript
const API_URL = import.meta.env.VITE_API_URL || '/api';
```

- **Local:** Uses `http://localhost:5000` (from .env)
- **Vercel:** Uses `https://marketplace-orn7.onrender.com` (from Vercel env vars)

---

## CORS Configuration

Make sure your backend allows requests from your frontend domain. Update `server/src/app.js`:

```javascript
const cors = require('cors');

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://market-place-ten-rho.vercel.app'
    : 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));
```

---

## Testing

- **Local Frontend:** http://localhost:5173 (or 3000)
- **Local Backend:** http://localhost:5000
- **Production Frontend:** https://market-place-ten-rho.vercel.app
- **Production Backend:** https://marketplace-orn7.onrender.com

✅ All API calls will automatically route to the correct backend based on the environment!
