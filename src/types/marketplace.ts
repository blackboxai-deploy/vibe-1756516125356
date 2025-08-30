// Marketplace Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'THB' | 'USD';
  images: string[];
  category: string;
  subcategory?: string;
  tags: string[];
  specifications: Record<string, any>;
  inventory: {
    quantity: number;
    reserved: number;
    available: number;
    lowStockThreshold: number;
  };
  vendor: {
    id: string;
    name: string;
    rating: number;
    verified: boolean;
  };
  ratings: {
    average: number;
    count: number;
    distribution: Record<number, number>;
  };
  status: 'active' | 'inactive' | 'out_of_stock' | 'discontinued';
  seo: {
    slug: string;
    metaTitle?: string;
    metaDescription?: string;
    keywords: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: 'THB' | 'USD';
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  paymentDetails?: Record<string, any>;
  shippingAddress: Address;
  billingAddress: Address;
  shippingMethod: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
  specifications?: Record<string, any>;
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  addresses: Address[];
  defaultAddressId?: string;
  preferences: {
    language: 'th' | 'en';
    currency: 'THB' | 'USD';
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  loyaltyPoints: number;
  totalSpent: number;
  orderCount: number;
  lastOrderAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vendor {
  id: string;
  name: string;
  description: string;
  logo?: string;
  banner?: string;
  email: string;
  phone: string;
  website?: string;
  address: Address;
  businessRegistration: {
    type: 'individual' | 'company' | 'partnership';
    registrationNumber?: string;
    taxId: string;
  };
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    branchCode?: string;
  };
  settings: {
    currency: 'THB' | 'USD';
    language: 'th' | 'en';
    timezone: string;
    autoAcceptOrders: boolean;
    processingTime: number; // days
  };
  verification: {
    status: 'pending' | 'verified' | 'rejected';
    documents: string[];
    verifiedAt?: Date;
  };
  metrics: {
    rating: number;
    reviewCount: number;
    productCount: number;
    orderCount: number;
    totalRevenue: number;
    fulfillmentRate: number;
  };
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

export interface Cart {
  id: string;
  customerId?: string;
  sessionId?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: 'THB' | 'USD';
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  total: number;
  addedAt: Date;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'credit_card' | 'debit_card' | 'bank_transfer' | 'e_wallet' | 'cash_on_delivery';
  provider: string;
  enabled: boolean;
  countries: string[];
  currencies: string[];
  fees: {
    percentage: number;
    fixed: number;
    currency: string;
  };
  settings: Record<string, any>;
}

export interface Recommendation {
  customerId: string;
  productIds: string[];
  type: 'popular' | 'related' | 'personalized' | 'trending';
  score: number;
  reason: string;
  generatedAt: Date;
}