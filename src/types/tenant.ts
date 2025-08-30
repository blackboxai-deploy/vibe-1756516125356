// Multi-tenancy Types
export interface Tenant {
  id: string;
  name: string;
  slug: string;
  displayName: string;
  description?: string;
  logo?: string;
  favicon?: string;
  domain?: string;
  subdomain: string;
  settings: TenantSettings;
  billing: BillingInfo;
  limits: TenantLimits;
  features: TenantFeatures;
  customization: TenantCustomization;
  status: 'active' | 'inactive' | 'suspended' | 'trial' | 'expired';
  plan: 'starter' | 'business' | 'enterprise' | 'custom';
  trialEndsAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantSettings {
  language: 'th' | 'en';
  timezone: string;
  currency: 'THB' | 'USD';
  country: string;
  businessInfo: {
    name: string;
    registrationNumber?: string;
    taxId?: string;
    address: {
      address1: string;
      address2?: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    phone: string;
    email: string;
    website?: string;
  };
  notifications: {
    email: {
      orders: boolean;
      lowStock: boolean;
      payments: boolean;
      security: boolean;
    };
    webhook: {
      enabled: boolean;
      url?: string;
      events: string[];
    };
  };
  integrations: {
    analytics: {
      googleAnalytics?: string;
      facebookPixel?: string;
    };
    payments: {
      stripe?: Record<string, any>;
      omise?: Record<string, any>;
      promptpay?: Record<string, any>;
    };
    shipping: {
      thailand_post?: Record<string, any>;
      kerry?: Record<string, any>;
      flash?: Record<string, any>;
    };
  };
}

export interface BillingInfo {
  plan: 'starter' | 'business' | 'enterprise' | 'custom';
  cycle: 'monthly' | 'yearly';
  amount: number;
  currency: 'THB' | 'USD';
  nextBillingDate: Date;
  paymentMethod?: {
    type: 'credit_card' | 'bank_transfer';
    last4?: string;
    brand?: string;
  };
  invoices: Invoice[];
  usage: UsageMetrics;
}

export interface Invoice {
  id: string;
  number: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  dueDate: Date;
  paidAt?: Date;
  url: string;
  createdAt: Date;
}

export interface UsageMetrics {
  period: {
    start: Date;
    end: Date;
  };
  products: number;
  orders: number;
  storage: number; // MB
  bandwidth: number; // GB
  apiCalls: number;
  users: number;
}

export interface TenantLimits {
  products: number;
  orders: number;
  storage: number; // MB
  bandwidth: number; // GB
  apiCallsPerMonth: number;
  users: number;
  customDomain: boolean;
  whiteLabeling: boolean;
  advancedAnalytics: boolean;
}

export interface TenantFeatures {
  multiVendor: boolean;
  aiRecommendations: boolean;
  advancedReporting: boolean;
  customThemes: boolean;
  apiAccess: boolean;
  sso: boolean;
  prioritySupport: boolean;
  customIntegrations: boolean;
  whiteLabeling: boolean;
}

export interface TenantCustomization {
  branding: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    logo?: string;
    favicon?: string;
    font: string;
  };
  theme: {
    name: string;
    variables: Record<string, string>;
    customCSS?: string;
  };
  layout: {
    header: {
      enabled: boolean;
      layout: 'default' | 'minimal' | 'modern';
      showSearch: boolean;
      showCart: boolean;
      showAccount: boolean;
    };
    footer: {
      enabled: boolean;
      content: string;
      links: Array<{
        title: string;
        url: string;
      }>;
    };
    sidebar: {
      enabled: boolean;
      position: 'left' | 'right';
      categories: boolean;
      filters: boolean;
    };
  };
  pages: {
    homepage: {
      layout: 'default' | 'modern' | 'minimal';
      sections: string[];
    };
    productPage: {
      layout: 'default' | 'modern' | 'minimal';
      showReviews: boolean;
      showRecommendations: boolean;
      showSpecs: boolean;
    };
  };
}

export interface TenantUser {
  id: string;
  tenantId: string;
  userId: string;
  role: string;
  permissions: string[];
  invitedBy?: string;
  joinedAt: Date;
  lastActiveAt?: Date;
  status: 'active' | 'inactive' | 'pending';
}

export interface TenantInvitation {
  id: string;
  tenantId: string;
  email: string;
  role: string;
  invitedBy: string;
  token: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  expiresAt: Date;
  acceptedAt?: Date;
  createdAt: Date;
}

export interface TenantSubscription {
  id: string;
  tenantId: string;
  plan: 'starter' | 'business' | 'enterprise' | 'custom';
  status: 'active' | 'cancelled' | 'past_due' | 'unpaid';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  cancelledAt?: Date;
  trialStart?: Date;
  trialEnd?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Tenant Context
export interface TenantContext {
  tenant: Tenant;
  user: TenantUser;
  permissions: string[];
  features: TenantFeatures;
  limits: TenantLimits;
}

// Plan Definitions
export const TENANT_PLANS = {
  STARTER: {
    name: 'starter',
    displayName: 'Starter',
    price: { monthly: 999, yearly: 9990 }, // THB
    limits: {
      products: 100,
      orders: 1000,
      storage: 1024, // 1GB
      bandwidth: 10, // 10GB
      apiCallsPerMonth: 10000,
      users: 3,
      customDomain: false,
      whiteLabeling: false,
      advancedAnalytics: false,
    },
    features: {
      multiVendor: false,
      aiRecommendations: true,
      advancedReporting: false,
      customThemes: false,
      apiAccess: true,
      sso: false,
      prioritySupport: false,
      customIntegrations: false,
      whiteLabeling: false,
    },
  },
  BUSINESS: {
    name: 'business',
    displayName: 'Business',
    price: { monthly: 2999, yearly: 29990 }, // THB
    limits: {
      products: 1000,
      orders: 10000,
      storage: 5120, // 5GB
      bandwidth: 50, // 50GB
      apiCallsPerMonth: 50000,
      users: 10,
      customDomain: true,
      whiteLabeling: false,
      advancedAnalytics: true,
    },
    features: {
      multiVendor: true,
      aiRecommendations: true,
      advancedReporting: true,
      customThemes: true,
      apiAccess: true,
      sso: false,
      prioritySupport: true,
      customIntegrations: true,
      whiteLabeling: false,
    },
  },
  ENTERPRISE: {
    name: 'enterprise',
    displayName: 'Enterprise',
    price: { monthly: 9999, yearly: 99990 }, // THB
    limits: {
      products: -1, // unlimited
      orders: -1, // unlimited
      storage: 20480, // 20GB
      bandwidth: 200, // 200GB
      apiCallsPerMonth: 200000,
      users: -1, // unlimited
      customDomain: true,
      whiteLabeling: true,
      advancedAnalytics: true,
    },
    features: {
      multiVendor: true,
      aiRecommendations: true,
      advancedReporting: true,
      customThemes: true,
      apiAccess: true,
      sso: true,
      prioritySupport: true,
      customIntegrations: true,
      whiteLabeling: true,
    },
  },
} as const;