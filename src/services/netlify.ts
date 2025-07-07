import { NetlifyProject, ProjectData } from '@/types/netlify';
import { netlifyConfig, validateNetlifyConfig } from '@/config/netlify';

class NetlifyService {
  private apiUrl = netlifyConfig.apiUrl;
  private accessToken: string | null = null;

  constructor() {
    this.accessToken = netlifyConfig.accessToken;
  }

  private async fetchFromNetlify(endpoint: string): Promise<any> {
    if (!this.accessToken) {
      throw new Error('Netlify access token is not configured');
    }

    const response = await fetch(`${this.apiUrl}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Netlify API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getProjects(): Promise<NetlifyProject[]> {
    try {
      const sites = await this.fetchFromNetlify('/sites');
      console.log('Fetched sites from Netlify:', sites.length);
      
      // Filter for sites with published deploys and exclude admin sites
      const validSites = sites.filter((site: NetlifyProject) => {
        const hasPublishedDeploy = site.published_deploy && site.published_deploy.state === 'ready';
        const isNotAdminSite = !site.name.includes('admin') && !site.name.includes('cms');
        return hasPublishedDeploy && isNotAdminSite;
      });
      
      console.log('Valid sites found:', validSites.length);
      console.log('Site names:', validSites.map(s => s.name));
      return validSites;
    } catch (error) {
      console.error('Error fetching Netlify projects:', error);
      throw error;
    }
  }

  private getTechStackFromFramework(framework?: string): string[] {
    const techMap: Record<string, string[]> = {
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
    };

    if (!framework) return ['HTML', 'CSS', 'JavaScript'];
    
    const lowerFramework = framework.toLowerCase();
    for (const [key, tech] of Object.entries(techMap)) {
      if (lowerFramework.includes(key)) {
        return tech;
      }
    }
    
    return ['HTML', 'CSS', 'JavaScript'];
  }

  private getCategoryFromFramework(framework?: string, siteName?: string): string {
    if (!framework && !siteName) return 'Website';
    
    const lowerFramework = framework?.toLowerCase() || '';
    const lowerSiteName = siteName?.toLowerCase() || '';
    
    // Check for mobile app indicators
    if (lowerFramework.includes('react-native') || lowerFramework.includes('flutter') || 
        lowerSiteName.includes('mobile') || lowerSiteName.includes('app')) {
      return 'Mobile App';
    }
    
    // Check for full-stack indicators
    if (lowerFramework.includes('next') || lowerFramework.includes('full-stack') || 
        lowerFramework.includes('api') || lowerFramework.includes('backend') ||
        lowerSiteName.includes('cms') || lowerSiteName.includes('admin') ||
        lowerSiteName.includes('dashboard')) {
      return 'Full Stack';
    }
    
    return 'Website';
  }

  private generateProjectDescription(project: NetlifyProject): string {
    const siteName = project.name;
    const baseDescription = `${siteName.charAt(0).toUpperCase() + siteName.slice(1).replace(/-/g, ' ')} is a modern web application`;
    
    // Custom descriptions based on site names
    const customDescriptions: Record<string, string> = {
      'thirdumpire': 'A comprehensive sports platform for cricket enthusiasts with live scoring, match tracking, and team management features.',
      'razinshk': 'A personal portfolio website showcasing professional work, skills, and projects with modern design and smooth animations.',
      'toniandguyforbunglows': 'A sophisticated real estate platform for luxury bungalows with property listings, virtual tours, and booking capabilities.',
      'pearlwhite': 'An elegant business website featuring clean design, service offerings, and professional presentation.',
    };

    if (customDescriptions[siteName]) {
      return customDescriptions[siteName];
    }
    
    if (project.framework) {
      return `${baseDescription} built with ${project.framework}. This project showcases responsive design and modern development practices.`;
    }
    
    return `${baseDescription} featuring clean design and optimal performance. Deployed and maintained through Netlify's robust platform.`;
  }

  transformNetlifyProjects(netlifyProjects: NetlifyProject[]): ProjectData[] {
    return netlifyProjects.map((project, index) => {
      const tech = this.getTechStackFromFramework(project.framework);
      const category = this.getCategoryFromFramework(project.framework, project.name);
      
      return {
        id: project.id,
        title: project.name.charAt(0).toUpperCase() + project.name.slice(1).replace(/-/g, ' '),
        description: this.generateProjectDescription(project),
        image: project.screenshot_url || `https://images.unsplash.com/photo-${1560066984000 + index}?w=600&h=400&fit=crop`,
        tech,
        category,
        liveUrl: project.ssl ? project.url : project.deploy_url,
        githubUrl: project.repo ? `https://github.com/${project.repo.repo_path}` : undefined,
        challenges: `Built with ${project.framework || 'modern web technologies'}, optimized for performance and deployed via Netlify.`,
        featured: index < 4, // Mark first 4 projects as featured
        isVideo: false,
        deployedAt: project.published_deploy.created_at,
        framework: project.framework,
        status: project.published_deploy.state === 'ready' ? 'published' : 'building',
      };
    });
  }

  async getTransformedProjects(): Promise<ProjectData[]> {
    try {
      // Check if Netlify is configured
      const validation = validateNetlifyConfig();
      if (!validation.isValid) {
        console.warn('Netlify not configured:', validation.message);
        if (netlifyConfig.fallbackToMockData) {
          console.info('Using mock data as fallback');
          return netlifyConfig.mockProjects;
        }
        return [];
      }

      const netlifyProjects = await this.getProjects();
      const transformedProjects = this.transformNetlifyProjects(netlifyProjects);
      
      // If no projects found and fallback is enabled, return mock data
      if (transformedProjects.length === 0 && netlifyConfig.fallbackToMockData) {
        console.info('No Netlify projects found, using mock data as fallback');
        return netlifyConfig.mockProjects;
      }
      
      return transformedProjects;
    } catch (error) {
      console.error('Error getting transformed projects:', error);
      
      // Return mock data if fallback is enabled, otherwise empty array
      if (netlifyConfig.fallbackToMockData) {
        console.info('Error occurred, using mock data as fallback');
        return netlifyConfig.mockProjects;
      }
      
      return [];
    }
  }
}

export const netlifyService = new NetlifyService();
export default netlifyService; 