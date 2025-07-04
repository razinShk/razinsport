import { useQuery } from '@tanstack/react-query';
import { netlifyService } from '@/services/netlify';
import { ProjectData } from '@/types/netlify';

export interface UseNetlifyProjectsOptions {
  refetchInterval?: number;
  staleTime?: number;
  enabled?: boolean;
}

export const useNetlifyProjects = (options: UseNetlifyProjectsOptions = {}) => {
  const {
    refetchInterval = 5 * 60 * 1000, // 5 minutes default
    staleTime = 3 * 60 * 1000, // 3 minutes default
    enabled = true,
  } = options;

  const query = useQuery({
    queryKey: ['netlify-projects'],
    queryFn: async (): Promise<ProjectData[]> => {
      try {
        const projects = await netlifyService.getTransformedProjects();
        return projects;
      } catch (error) {
        console.error('Failed to fetch Netlify projects:', error);
        // Return empty array as fallback to prevent app crash
        return [];
      }
    },
    staleTime,
    refetchInterval,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    enabled,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    projects: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isRefetching: query.isRefetching,
    isFetching: query.isFetching,
    isSuccess: query.isSuccess,
    // Helper methods
    hasProjects: (query.data || []).length > 0,
    categories: Array.from(new Set((query.data || []).map(p => p.category))),
    featuredProjects: (query.data || []).filter(p => p.featured),
    publishedProjects: (query.data || []).filter(p => p.status === 'published'),
  };
};

// Hook for filtering projects
export const useFilteredProjects = (
  selectedCategory: string = 'All',
  options: UseNetlifyProjectsOptions = {}
) => {
  const netlifyQuery = useNetlifyProjects(options);
  
  const filteredProjects = selectedCategory === 'All' 
    ? netlifyQuery.projects 
    : netlifyQuery.projects.filter(project => project.category === selectedCategory);

  return {
    ...netlifyQuery,
    filteredProjects,
    totalProjects: netlifyQuery.projects.length,
    filteredCount: filteredProjects.length,
  };
}; 