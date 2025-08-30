// AI Factory Types
export interface AIAgent {
  id: string;
  name: string;
  type: 'frontend' | 'backend' | 'database' | 'api' | 'testing' | 'security' | 'performance' | 'documentation' | 'deployment' | 'monitoring';
  status: 'idle' | 'working' | 'completed' | 'error';
  capabilities: string[];
  currentTask?: string;
  lastActive: Date;
  performance: {
    tasksCompleted: number;
    successRate: number;
    avgExecutionTime: number;
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  status: 'planning' | 'development' | 'testing' | 'deployment' | 'completed' | 'failed';
  assignedAgents: string[];
  progress: number;
  estimatedCompletion: Date;
  createdAt: Date;
  updatedAt: Date;
  techStack: TechStack;
  codebase: CodeFile[];
}

export interface TechStack {
  frontend: string[];
  backend: string[];
  database: string[];
  deployment: string[];
  testing: string[];
}

export interface CodeFile {
  id: string;
  path: string;
  content: string;
  language: string;
  generatedBy: string;
  lastModified: Date;
  quality: QualityMetrics;
}

export interface QualityMetrics {
  codeComplexity: number;
  testCoverage: number;
  securityScore: number;
  performanceScore: number;
  maintainabilityIndex: number;
}

export interface AITaskRequest {
  type: 'code-generation' | 'analysis' | 'testing' | 'deployment' | 'optimization';
  projectId: string;
  requirements: string;
  context?: any;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface AITaskResponse {
  success: boolean;
  data?: any;
  error?: string;
  executionTime: number;
  agentId: string;
  recommendations?: string[];
}

export interface SystemMetrics {
  totalProjects: number;
  activeAgents: number;
  successRate: number;
  avgProjectCompletion: number;
  resourceUtilization: {
    cpu: number;
    memory: number;
    storage: number;
  };
}