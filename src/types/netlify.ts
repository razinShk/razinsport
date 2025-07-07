export interface NetlifyProject {
  id: string;
  name: string;
  url: string;
  admin_url: string;
  deploy_url: string;
  deploy_hook: string;
  custom_domain?: string;
  domain_aliases?: string[];
  created_at: string;
  updated_at: string;
  user_id: string;
  session_id: string;
  ssl: boolean;
  force_ssl: boolean;
  screenshot_url: string;
  published_deploy: {
    id: string;
    url: string;
    deploy_ssl_url: string;
    admin_url: string;
    deploy_url: string;
    screenshot_url: string;
    created_at: string;
    updated_at: string;
    state: string;
    commit_sha: string;
    branch: string;
    title: string;
    context: string;
    framework: string;
    review_id?: string;
  };
  repo?: {
    id: string;
    provider: string;
    repo_path: string;
    repo_branch: string;
    allowed_branches: string[];
    deploy_key_id: string;
    private_logs: boolean;
    functions_region: string;
    installation_id: string;
    env: Record<string, string>;
  };
  framework?: string;
  build_settings?: {
    id: string;
    provider: string;
    deploy_key_id: string;
    repo_path: string;
    repo_branch: string;
    dir: string;
    functions_dir: string;
    cmd: string;
    allowed_branches: string[];
    public_repo: boolean;
    private_logs: boolean;
    repo_url: string;
    env: Record<string, string>;
    installation_id: string;
    stop_builds: boolean;
  };
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  category: string;
  liveUrl: string;
  githubUrl?: string;
  challenges?: string;
  featured: boolean;
  isVideo?: boolean;
  deployedAt: string;
  framework?: string;
  status: 'published' | 'draft' | 'building' | 'error';
} 