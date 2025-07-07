import { ProjectData } from '@/types/netlify';

// Netlify Integration Configuration
export const netlifyConfig = {
  // API Configuration
  apiUrl: 'https://api.netlify.com/api/v1',
  
  // Access Token - Get from environment variable or set directly
  accessToken: import.meta.env.VITE_NETLIFY_ACCESS_TOKEN || null,
  
  // Refresh Settings
  refreshInterval: 5 * 60 * 1000, // 5 minutes
  staleTime: 3 * 60 * 1000, // 3 minutes
  
  // Project Display Settings
  maxFeaturedProjects: 4,
  
  // Fallback Settings
  fallbackToMockData: true,
  
  // Default Project Categories
  defaultCategories: ['Website', 'Mobile App', 'Full Stack'],
  
  // Framework Detection Mapping
  frameworkMapping: {
    'react': ['React', 'JavaScript', 'CSS'],
    'vue': ['Vue.js', 'JavaScript', 'CSS'],
    'angular': ['Angular', 'TypeScript', 'CSS'],
    'svelte': ['Svelte', 'JavaScript', 'CSS'],
    'next': ['Next.js', 'React', 'TypeScript'],
    'nuxt': ['Nuxt.js', 'Vue.js', 'TypeScript'],
    'gatsby': ['Gatsby', 'React', 'GraphQL'],
    'hugo': ['Hugo', 'Go', 'HTML'],
    'jekyll': ['Jekyll', 'Ruby', 'HTML'],
    'vite': ['Vite', 'JavaScript', 'CSS'],
    'create-react-app': ['React', 'JavaScript', 'CSS'],
    'static': ['HTML', 'CSS', 'JavaScript'],
  },
  
  // Error Handling
  retryAttempts: 3,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  
  // Mock Data for Development/Fallback
  mockProjects: [
    {
      id: 'mock-1',
      title: 'Portfolio Website',
      description: 'A modern portfolio website showcasing creative work and technical skills.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
      tech: ['React', 'TypeScript', 'Tailwind CSS'],
      category: 'Website',
      liveUrl: 'https://portfolio-example.netlify.app',
      githubUrl: 'https://github.com/username/portfolio',
      challenges: 'Built with modern web technologies and optimized for performance.',
      featured: true,
      isVideo: false,
      deployedAt: new Date().toISOString(),
      framework: 'React',
      status: 'published' as const,
    },
    {
      id: 'mock-2',
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce solution with payment processing and inventory management.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      tech: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
      category: 'Full Stack',
      liveUrl: 'https://ecommerce-example.netlify.app',
      githubUrl: 'https://github.com/username/ecommerce',
      challenges: 'Implemented secure payment processing and real-time inventory tracking.',
      featured: true,
      isVideo: false,
      deployedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      framework: 'Next.js',
      status: 'published' as const,
    },
    {
      id: 'mock-3',
      title: 'Mobile Task Manager',
      description: 'A cross-platform mobile app for task management and productivity tracking.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      tech: ['React Native', 'Firebase', 'Redux'],
      category: 'Mobile App',
      liveUrl: 'https://task-manager-example.netlify.app',
      githubUrl: 'https://github.com/username/task-manager',
      challenges: 'Developed cross-platform compatibility and offline functionality.',
      featured: false,
      isVideo: false,
      deployedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      framework: 'React Native',
      status: 'published' as const,
    },
  ] as ProjectData[],
};

// Validation function to check if Netlify is properly configured
export const validateNetlifyConfig = (): { isValid: boolean; message: string } => {
  if (!netlifyConfig.accessToken) {
    return {
      isValid: false,
      message: 'Netlify access token is not configured. Please check your environment variables.',
    };
  }
  
  return {
    isValid: true,
    message: 'Netlify configuration is valid.',
  };
};

// Helper function to get configuration with fallbacks
export const getNetlifyConfig = () => {
  const validation = validateNetlifyConfig();
  
  return {
    ...netlifyConfig,
    isConfigured: validation.isValid,
    configMessage: validation.message,
  };
}; 