# 🚀 Quick Setup Guide - Netlify Integration

## Step 1: Get Your Netlify Access Token (2 minutes)

1. **Visit**: https://app.netlify.com/user/applications/personal
2. **Click**: "New access token"
3. **Name it**: "Portfolio Projects"
4. **Copy**: The generated token

## Step 2: Set Up Environment Variable (1 minute)

Create a `.env` file in your project root:

```bash
# In your project folder, create .env file
touch .env
```

Add this content:
```env
VITE_NETLIFY_ACCESS_TOKEN=your_actual_token_here
```

## Step 3: Test the Integration (30 seconds)

```bash
npm run dev
```

Visit: http://localhost:5173/about

You'll see a "Netlify Integration Test" section - click "Test Connection"

## Step 4: View Your Projects

Visit: http://localhost:5173/projects

Your Netlify projects will automatically appear!

## ✅ Expected Results

You should see your 4 projects:
- **Thirdumpire** (Sports Platform)
- **Razinshk** (Portfolio)  
- **Toniandguyforbunglows** (Real Estate)
- **Pearlwhite** (Business Website)

## 🐛 Troubleshooting

### "Connection failed" error?
- Check your access token is correct
- Ensure no extra spaces in the .env file
- Restart your dev server

### Cursor not visible?
- The cursor is working! It's the subtle blue glowing effect
- Move your mouse around - you'll see it following
- Hover over buttons/cards to see the purple glow effect

### Projects not loading?
- Check browser console for errors
- Verify internet connection
- Your projects will show mock data as fallback

## 🎯 Next Steps

1. Remove the test component from About page (optional)
2. Customize project descriptions in `src/services/netlify.ts`
3. Deploy your portfolio to see it live!

---

**Need help?** Check the console logs or refer to NETLIFY_SETUP.md for detailed troubleshooting. 