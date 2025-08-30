// User Management Types
export interface User {
  id: string;
  email: string;
  emailVerified?: Date;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  role: UserRole;
  permissions: Permission[];
  tenantId?: string;
  preferences: UserPreferences;
  metadata: Record<string, any>;
  lastLoginAt?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRole {
  id: string;
  name: string;
  displayName: string;
  description: string;
  permissions: Permission[];
  isSystemRole: boolean;
  tenantId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Permission {
  id: string;
  name: string;
  action: string;
  resource: string;
  conditions?: Record<string, any>;
  description: string;
}

export interface UserPreferences {
  language: 'th' | 'en';
  timezone: string;
  currency: 'THB' | 'USD';
  theme: 'light' | 'dark' | 'system';
  notifications: NotificationSettings;
  dashboard: DashboardSettings;
}

export interface NotificationSettings {
  email: {
    orders: boolean;
    promotions: boolean;
    security: boolean;
    system: boolean;
  };
  sms: {
    orders: boolean;
    security: boolean;
  };
  push: {
    orders: boolean;
    promotions: boolean;
    security: boolean;
    system: boolean;
  };
}

export interface DashboardSettings {
  layout: 'compact' | 'comfortable';
  widgets: string[];
  defaultPage: string;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  refreshToken: string;
  expiresAt: Date;
  ipAddress: string;
  userAgent: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  tenantId?: string;
  timestamp: Date;
}

export interface UserInvitation {
  id: string;
  email: string;
  role: string;
  tenantId: string;
  invitedBy: string;
  token: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  expiresAt: Date;
  acceptedAt?: Date;
  createdAt: Date;
}

// Authentication Types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  tenantId?: string;
  role?: string;
}

export interface PasswordReset {
  email: string;
  token: string;
  newPassword: string;
}

export interface AuthResponse {
  user: User;
  session: Session;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Role-based Access Control
export const SYSTEM_ROLES = {
  SUPER_ADMIN: 'super_admin',
  TENANT_ADMIN: 'tenant_admin',
  VENDOR_MANAGER: 'vendor_manager',
  VENDOR_STAFF: 'vendor_staff',
  CUSTOMER_SERVICE: 'customer_service',
  ANALYTICS_VIEWER: 'analytics_viewer',
  CUSTOMER: 'customer',
} as const;

export const PERMISSIONS = {
  // System Management
  SYSTEM_MANAGE: 'system:manage',
  SYSTEM_VIEW: 'system:view',
  
  // Tenant Management
  TENANT_CREATE: 'tenant:create',
  TENANT_MANAGE: 'tenant:manage',
  TENANT_VIEW: 'tenant:view',
  
  // User Management
  USER_CREATE: 'user:create',
  USER_MANAGE: 'user:manage',
  USER_VIEW: 'user:view',
  USER_DELETE: 'user:delete',
  
  // Product Management
  PRODUCT_CREATE: 'product:create',
  PRODUCT_MANAGE: 'product:manage',
  PRODUCT_VIEW: 'product:view',
  PRODUCT_DELETE: 'product:delete',
  
  // Order Management
  ORDER_CREATE: 'order:create',
  ORDER_MANAGE: 'order:manage',
  ORDER_VIEW: 'order:view',
  ORDER_CANCEL: 'order:cancel',
  ORDER_REFUND: 'order:refund',
  
  // Payment Management
  PAYMENT_VIEW: 'payment:view',
  PAYMENT_MANAGE: 'payment:manage',
  PAYMENT_REFUND: 'payment:refund',
  
  // Analytics
  ANALYTICS_VIEW: 'analytics:view',
  ANALYTICS_EXPORT: 'analytics:export',
  
  // AI Factory
  AI_FACTORY_MANAGE: 'ai_factory:manage',
  AI_FACTORY_VIEW: 'ai_factory:view',
  AI_PROJECT_CREATE: 'ai_project:create',
  AI_PROJECT_MANAGE: 'ai_project:manage',
  
} as const;

export type SystemRole = typeof SYSTEM_ROLES[keyof typeof SYSTEM_ROLES];
export type PermissionName = typeof PERMISSIONS[keyof typeof PERMISSIONS];