// Order Management Library
import { Order, OrderItem, Address } from '@/types/marketplace';

export interface OrderFilters {
  status?: Order['status'];
  paymentStatus?: Order['paymentStatus'];
  customerId?: string;
  vendorId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  minTotal?: number;
  maxTotal?: number;
}

export interface OrderSort {
  field: 'orderNumber' | 'total' | 'createdAt' | 'updatedAt' | 'status';
  direction: 'asc' | 'desc';
}

export interface OrderSearchResult {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateOrderRequest {
  customerId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: Address;
  billingAddress: Address;
  shippingMethod: string;
  paymentMethod: string;
  notes?: string;
}

export class OrderManager {
  private apiEndpoint = '/api/marketplace/orders';

  // Get orders with filters and pagination
  async getOrders(
    filters: OrderFilters = {},
    sort: OrderSort = { field: 'createdAt', direction: 'desc' },
    page: number = 1,
    limit: number = 20
  ): Promise<OrderSearchResult> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortField: sort.field,
        sortDirection: sort.direction,
        ...Object.entries(filters)
          .filter(([, value]) => value !== undefined)
          .reduce((acc, [key, value]) => ({ 
            ...acc, 
            [key]: value instanceof Date ? value.toISOString() : String(value) 
          }), {}),
      });

      const response = await fetch(`${this.apiEndpoint}?${params}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  // Get single order by ID
  async getOrder(id: string): Promise<Order> {
    try {
      const response = await fetch(`${this.apiEndpoint}/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch order: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }

  // Create new order
  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    try {
      // Validate order data
      const validation = this.validateOrderData(orderData);
      if (!validation.isValid) {
        throw new Error(`Invalid order data: ${validation.errors.join(', ')}`);
      }

      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create order: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  // Update order status
  async updateOrderStatus(orderId: string, status: Order['status'], notes?: string): Promise<Order> {
    try {
      const response = await fetch(`${this.apiEndpoint}/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, notes }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update order status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  // Update payment status
  async updatePaymentStatus(orderId: string, paymentStatus: Order['paymentStatus'], paymentDetails?: Record<string, any>): Promise<Order> {
    try {
      const response = await fetch(`${this.apiEndpoint}/${orderId}/payment`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentStatus, paymentDetails }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update payment status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  }

  // Add tracking number
  async addTrackingNumber(orderId: string, trackingNumber: string, shippingMethod?: string): Promise<Order> {
    try {
      const response = await fetch(`${this.apiEndpoint}/${orderId}/tracking`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trackingNumber, shippingMethod }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add tracking number: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding tracking number:', error);
      throw error;
    }
  }

  // Cancel order
  async cancelOrder(orderId: string, reason: string): Promise<Order> {
    try {
      const response = await fetch(`${this.apiEndpoint}/${orderId}/cancel`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });

      if (!response.ok) {
        throw new Error(`Failed to cancel order: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error canceling order:', error);
      throw error;
    }
  }

  // Process refund
  async processRefund(orderId: string, amount?: number, reason?: string): Promise<Order> {
    try {
      const response = await fetch(`${this.apiEndpoint}/${orderId}/refund`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, reason }),
      });

      if (!response.ok) {
        throw new Error(`Failed to process refund: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error processing refund:', error);
      throw error;
    }
  }

  // Get order statistics
  async getOrderStats(vendorId?: string, dateFrom?: Date, dateTo?: Date): Promise<{
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    statusBreakdown: Record<Order['status'], number>;
    recentOrders: Order[];
  }> {
    try {
      const params = new URLSearchParams();
      if (vendorId) params.append('vendorId', vendorId);
      if (dateFrom) params.append('dateFrom', dateFrom.toISOString());
      if (dateTo) params.append('dateTo', dateTo.toISOString());

      const response = await fetch(`${this.apiEndpoint}/stats?${params}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch order statistics: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching order statistics:', error);
      throw error;
    }
  }

  // Calculate order totals
  calculateOrderTotals(items: OrderItem[], shippingCost: number = 0, taxRate: number = 0.07): {
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  } {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * taxRate;
    const total = subtotal + tax + shippingCost;

    return {
      subtotal,
      tax,
      shipping: shippingCost,
      total,
    };
  }

  // Generate order number
  generateOrderNumber(): string {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    
    return `ORD${year}${month}${day}${random}`;
  }

  // Validate order data
  private validateOrderData(orderData: CreateOrderRequest): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!orderData.customerId?.trim()) {
      errors.push('Customer ID is required');
    }

    if (!orderData.items || orderData.items.length === 0) {
      errors.push('Order items are required');
    }

    orderData.items.forEach((item, index) => {
      if (!item.productId?.trim()) {
        errors.push(`Item ${index + 1}: Product ID is required`);
      }
      if (typeof item.quantity !== 'number' || item.quantity <= 0) {
        errors.push(`Item ${index + 1}: Quantity must be a positive number`);
      }
      if (typeof item.price !== 'number' || item.price <= 0) {
        errors.push(`Item ${index + 1}: Price must be a positive number`);
      }
    });

    if (!orderData.shippingAddress?.address1?.trim()) {
      errors.push('Shipping address is required');
    }

    if (!orderData.billingAddress?.address1?.trim()) {
      errors.push('Billing address is required');
    }

    if (!orderData.shippingMethod?.trim()) {
      errors.push('Shipping method is required');
    }

    if (!orderData.paymentMethod?.trim()) {
      errors.push('Payment method is required');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Format order status for display
  formatOrderStatus(status: Order['status'], locale: string = 'en'): string {
    const statusLabels: Record<Order['status'], Record<string, string>> = {
      pending: { en: 'Pending', th: 'รอดำเนินการ' },
      confirmed: { en: 'Confirmed', th: 'ยืนยันแล้ว' },
      processing: { en: 'Processing', th: 'กำลังดำเนินการ' },
      shipped: { en: 'Shipped', th: 'จัดส่งแล้ว' },
      delivered: { en: 'Delivered', th: 'ส่งมอบแล้ว' },
      cancelled: { en: 'Cancelled', th: 'ยกเลิกแล้ว' },
      refunded: { en: 'Refunded', th: 'คืนเงินแล้ว' },
    };

    return statusLabels[status][locale] || statusLabels[status]['en'];
  }

  // Format payment status for display
  formatPaymentStatus(status: Order['paymentStatus'], locale: string = 'en'): string {
    const statusLabels: Record<Order['paymentStatus'], Record<string, string>> = {
      pending: { en: 'Payment Pending', th: 'รอการชำระเงิน' },
      paid: { en: 'Paid', th: 'ชำระเงินแล้ว' },
      failed: { en: 'Payment Failed', th: 'ชำระเงินไม่สำเร็จ' },
      refunded: { en: 'Refunded', th: 'คืนเงินแล้ว' },
    };

    return statusLabels[status][locale] || statusLabels[status]['en'];
  }
}

// Utility functions
export const formatOrderNumber = (orderNumber: string): string => {
  return orderNumber.replace(/(.{3})(.{6})(.{4})/, '$1-$2-$3');
};

export const isOrderCancellable = (order: Order): boolean => {
  return ['pending', 'confirmed'].includes(order.status) && order.paymentStatus !== 'paid';
};

export const isOrderRefundable = (order: Order): boolean => {
  return order.paymentStatus === 'paid' && ['delivered', 'cancelled'].includes(order.status);
};

export const calculateOrderAge = (order: Order): number => {
  return Math.floor((Date.now() - new Date(order.createdAt).getTime()) / (1000 * 60 * 60 * 24));
};

// Singleton instance
export const orderManager = new OrderManager();