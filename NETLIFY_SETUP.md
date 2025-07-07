# Netlify Integration Setup Guide

This guide will help you set up automatic project fetching from your Netlify account.

## Prerequisites

- A Netlify account with deployed projects
- Access to your Netlify dashboard

## Step 1: Get Your Netlify Access Token

1. Visit [https://app.netlify.com/user/applications/personal](https://app.netlify.com/user/applications/personal)
2. Click "New access token"
3. Give it a name (e.g., "Portfolio Projects")
4. Copy the generated token

## Step 2: Configure Environment Variables

Create a `.env` file in your project root and add:

```env
VITE_NETLIFY_ACCESS_TOKEN=your_netlify_access_token_here
```

**Important**: Never commit your `.env` file to version control. Add it to `.gitignore`.

## Step 3: Update .gitignore

Add the following lines to your `.gitignore` file:

```
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

## Step 4: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the Projects page
3. You should see your Netlify projects automatically loaded

## Features

- **Automatic Sync**: Projects are automatically fetched from Netlify
- **Real-time Updates**: Projects refresh every 5 minutes
- **Smart Categorization**: Projects are automatically categorized based on their framework
- **Live Status**: Shows deployment status (published, building, error)
- **Manual Refresh**: Click the "Refresh Projects" button to manually update

## Troubleshooting

### "Netlify access token is not configured"

Make sure your `.env` file contains the correct variable name and token.

### "Failed to Load Projects"

1. Check that your access token is valid
2. Ensure you have projects deployed on Netlify
3. Verify your internet connection
4. Check the browser console for detailed error messages

### Projects not showing up

1. Make sure your projects have successful deployments
2. Check that the projects are not in draft mode
3. Verify the access token has permission to read your sites

## Manual Configuration

If you prefer not to use environment variables, you can directly modify the `src/services/netlify.ts` file:

```typescript
// Replace this line:
this.accessToken = import.meta.env.VITE_NETLIFY_ACCESS_TOKEN;

// With your token directly (not recommended for production):
this.accessToken = 'your_token_here';
```

## Security Notes

- Never expose your Netlify access token in client-side code for production
- Consider using Netlify Functions or a backend API for production deployments
- Regularly rotate your access tokens

## Support

If you encounter any issues, check:
- [Netlify API Documentation](https://docs.netlify.com/api/get-started/)
- [Netlify Personal Access Tokens](https://docs.netlify.com/api/get-started/#personal-access-tokens) 