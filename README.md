# Raze Tech Portfolio Hub

A modern, responsive portfolio website with automatic Netlify project integration. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **🚀 Automatic Netlify Integration**: Projects are automatically fetched and displayed from your Netlify account
- **📱 Responsive Design**: Fully responsive across all devices
- **🎨 Modern UI/UX**: Beautiful animations and smooth transitions
- **⚡ Fast Performance**: Optimized loading and caching
- **🔄 Real-time Updates**: Projects refresh every 5 minutes automatically
- **🏷️ Smart Categorization**: Projects are automatically categorized by framework
- **📊 Live Status**: Shows deployment status (published, building, error)
- **🔍 Advanced Filtering**: Filter projects by category
- **🎯 Featured Projects**: Highlight your best work
- **📈 Analytics Ready**: Built-in tracking capabilities

## 🔧 Netlify Integration Setup

### Step 1: Get Your Netlify Access Token

1. Visit [Netlify Personal Access Tokens](https://app.netlify.com/user/applications/personal)
2. Click "New access token"
3. Give it a name (e.g., "Portfolio Projects")
4. Copy the generated token

### Step 2: Configure Environment Variables

Create a `.env` file in your project root:

```env
VITE_NETLIFY_ACCESS_TOKEN=your_netlify_access_token_here
```

### Step 3: Test the Integration

```bash
npm run dev
```

Navigate to `/projects` to see your Netlify projects automatically loaded!

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/raze-tech-portfolio-hub.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Netlify access token

# Start development server
npm run dev
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API services
├── types/              # TypeScript types
├── config/             # Configuration files
└── lib/                # Utility functions
```

## 🎨 Key Components

### Netlify Integration
- **Service**: `src/services/netlify.ts` - Handles API communication
- **Hook**: `src/hooks/useNetlifyProjects.ts` - Custom hook for data management
- **Config**: `src/config/netlify.ts` - Configuration and fallback settings
- **Types**: `src/types/netlify.ts` - TypeScript interfaces

### Features
- **Auto-refresh**: Projects update every 5 minutes
- **Fallback Data**: Mock projects when API is unavailable
- **Error Handling**: Graceful error states with retry functionality
- **Caching**: Smart caching with React Query
- **Categorization**: Automatic project categorization by framework

## 🔄 How It Works

1. **Automatic Fetching**: The app connects to Netlify's API using your access token
2. **Smart Transformation**: Raw Netlify data is transformed into a user-friendly format
3. **Framework Detection**: Projects are automatically categorized based on their framework
4. **Real-time Updates**: Projects refresh automatically and on window focus
5. **Fallback System**: If API is unavailable, mock projects are shown

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first styling
- **React Query** - Data fetching and caching
- **React Router** - Client-side routing
- **Netlify API** - Project data source
- **Vite** - Fast build tool

## 📊 Supported Frameworks

The integration automatically detects and categorizes projects based on:

- React / Next.js
- Vue.js / Nuxt.js
- Angular
- Svelte
- Gatsby
- Static sites
- And more...

## 🔧 Configuration

### Custom Configuration

Edit `src/config/netlify.ts` to customize:

- Refresh intervals
- Number of featured projects
- Framework detection rules
- Mock data for development
- Error handling settings

### Environment Variables

```env
# Required
VITE_NETLIFY_ACCESS_TOKEN=your_token_here

# Optional
VITE_DEV_MODE=false
```

## 🚀 Deployment

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy!

### Build for Production

```bash
npm run build
```

## 📝 API Reference

### Netlify Service Methods

```typescript
// Get all projects
netlifyService.getProjects()

// Get transformed projects
netlifyService.getTransformedProjects()

// Transform raw data
netlifyService.transformNetlifyProjects(projects)
```

### Custom Hooks

```typescript
// Basic hook
const { projects, isLoading, error } = useNetlifyProjects()

// With filtering
const { filteredProjects, totalProjects } = useFilteredProjects(category)
```

## 🛡️ Security

- Never expose your Netlify access token in client-side code for production
- Use environment variables for sensitive data
- Consider server-side rendering for production deployments
- Regularly rotate your access tokens

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Netlify](https://netlify.com) for their excellent API
- [React Query](https://tanstack.com/query) for data fetching
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Shadcn/ui](https://ui.shadcn.com) for UI components

## 📞 Support

For detailed setup instructions, see [NETLIFY_SETUP.md](NETLIFY_SETUP.md)

If you encounter any issues:
1. Check the console for error messages
2. Verify your Netlify access token
3. Ensure your projects are deployed on Netlify
4. Check the troubleshooting section in the setup guide

---

Built with ❤️ by [Your Name]
#   r a z i n - p o r t f o l i o 
 
 