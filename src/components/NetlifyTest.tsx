import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { netlifyService } from '@/services/netlify';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

export const NetlifyTest = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [projectCount, setProjectCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>([]);

  const testConnection = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const fetchedProjects = await netlifyService.getTransformedProjects();
      setProjects(fetchedProjects);
      setProjectCount(fetchedProjects.length);
      setIsConnected(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = () => {
    if (isLoading) return <RefreshCw className="h-5 w-5 animate-spin" />;
    if (isConnected === true) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (isConnected === false) return <XCircle className="h-5 w-5 text-red-500" />;
    return <AlertCircle className="h-5 w-5 text-yellow-500" />;
  };

  const getStatusMessage = () => {
    if (isLoading) return 'Testing connection...';
    if (isConnected === true) return `Connected! Found ${projectCount} projects`;
    if (isConnected === false) return `Connection failed: ${error}`;
    return 'Click to test Netlify connection';
  };

  const getStatusColor = () => {
    if (isConnected === true) return 'border-green-500/50 bg-green-500/10';
    if (isConnected === false) return 'border-red-500/50 bg-red-500/10';
    return 'border-yellow-500/50 bg-yellow-500/10';
  };

  return (
    <Card className={`w-full max-w-2xl mx-auto ${getStatusColor()}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon()}
          Netlify Integration Test
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>{getStatusMessage()}</span>
            <Button 
              onClick={testConnection} 
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? 'Testing...' : 'Test Connection'}
            </Button>
          </div>
          
          {projects.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Found Projects:</h3>
              <div className="grid gap-2">
                {projects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-2 bg-background/50 rounded">
                    <div>
                      <span className="font-medium">{project.title}</span>
                      <div className="flex gap-1 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {project.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded">
              <p className="text-red-400 text-sm">{error}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Make sure you've set your VITE_NETLIFY_ACCESS_TOKEN in your .env file
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}; 