// Product Management Library
import { Product } from '@/types/marketplace';

export interface ProductFilters {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  vendor?: string;
  tags?: string[];
  inStock?: boolean;
  minRating?: number;
}

export interface ProductSort {
  field: 'name' | 'price' | 'rating' | 'createdAt' | 'updatedAt';
  direction: 'asc' | 'desc';
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface ProductSearchResult {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filters: ProductFilters;
}

export class ProductManager {
  private apiEndpoint = '/api/marketplace/products';

  // Get products with filters, sorting, and pagination
  async getProducts(
    filters: ProductFilters = {},
    sort: ProductSort = { field: 'createdAt', direction: 'desc' },
    pagination: PaginationOptions = { page: 1, limit: 20 }
  ): Promise<ProductSearchResult> {
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        sortField: sort.field,
        sortDirection: sort.direction,
        ...Object.entries(filters)
          .filter(([, value]) => value !== undefined)
          .reduce((acc, [key, value]) => ({ ...acc, [key]: String(value) }), {}),
      });

      const response = await fetch(`${this.apiEndpoint}?${params}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  // Get single product by ID
  async getProduct(id: string): Promise<Product> {
    try {
      const response = await fetch(`${this.apiEndpoint}/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  // Create new product
  async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create product: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  // Update product
  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    try {
      const response = await fetch(`${this.apiEndpoint}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  // Delete product
  async deleteProduct(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.apiEndpoint}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  // Search products with text search
  async searchProducts(query: string, filters: ProductFilters = {}): Promise<ProductSearchResult> {
    try {
      const params = new URLSearchParams({
        q: query,
        ...Object.entries(filters)
          .filter(([, value]) => value !== undefined)
          .reduce((acc, [key, value]) => ({ ...acc, [key]: String(value) }), {}),
      });

      const response = await fetch(`${this.apiEndpoint}/search?${params}`);
      
      if (!response.ok) {
        throw new Error(`Failed to search products: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  // Update product inventory
  async updateInventory(productId: string, quantity: number, operation: 'add' | 'subtract' | 'set'): Promise<Product> {
    try {
      const response = await fetch(`${this.apiEndpoint}/${productId}/inventory`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity, operation }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update inventory: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating inventory:', error);
      throw error;
    }
  }

  // Bulk update products
  async bulkUpdateProducts(updates: Array<{ id: string; updates: Partial<Product> }>): Promise<Product[]> {
    try {
      const response = await fetch(`${this.apiEndpoint}/bulk`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updates }),
      });

      if (!response.ok) {
        throw new Error(`Failed to bulk update products: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error bulk updating products:', error);
      throw error;
    }
  }

  // Get product categories
  async getCategories(): Promise<Array<{ name: string; count: number; subcategories?: Array<{ name: string; count: number }> }>> {
    try {
      const response = await fetch(`${this.apiEndpoint}/categories`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  // Get trending products
  async getTrendingProducts(limit: number = 10): Promise<Product[]> {
    try {
      const response = await fetch(`${this.apiEndpoint}/trending?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch trending products: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching trending products:', error);
      throw error;
    }
  }

  // Get low stock products
  async getLowStockProducts(vendorId?: string): Promise<Product[]> {
    try {
      const params = vendorId ? `?vendorId=${vendorId}` : '';
      const response = await fetch(`${this.apiEndpoint}/low-stock${params}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch low stock products: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching low stock products:', error);
      throw error;
    }
  }

  // Generate product recommendations using AI
  async generateRecommendations(productId: string, customerId?: string, limit: number = 10): Promise<Product[]> {
    try {
      const params = new URLSearchParams({
        productId,
        limit: limit.toString(),
        ...(customerId && { customerId }),
      });

      const response = await fetch(`${this.apiEndpoint}/recommendations?${params}`);
      
      if (!response.ok) {
        throw new Error(`Failed to generate recommendations: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating recommendations:', error);
      throw error;
    }
  }

  // Generate product description using AI
  async generateDescription(productName: string, features: string[], category: string): Promise<string> {
    try {
      const response = await fetch(`${this.apiEndpoint}/generate-description`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName,
          features,
          category,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate description: ${response.status}`);
      }

      const result = await response.json();
      return result.description;
    } catch (error) {
      console.error('Error generating product description:', error);
      throw error;
    }
  }

  // Generate product images using AI
  async generateProductImage(productName: string, description: string, style: string = 'product-photography'): Promise<string> {
    try {
      const response = await fetch(`${this.apiEndpoint}/generate-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName,
          description,
          style,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate image: ${response.status}`);
      }

      const result = await response.json();
      return result.imageUrl;
    } catch (error) {
      console.error('Error generating product image:', error);
      throw error;
    }
  }

  // Validate product data
  validateProduct(product: Partial<Product>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!product.name?.trim()) {
      errors.push('Product name is required');
    }

    if (!product.description?.trim()) {
      errors.push('Product description is required');
    }

    if (typeof product.price !== 'number' || product.price <= 0) {
      errors.push('Product price must be a positive number');
    }

    if (!product.category?.trim()) {
      errors.push('Product category is required');
    }

    if (!product.vendor?.id) {
      errors.push('Vendor information is required');
    }

    if (product.inventory && typeof product.inventory.quantity !== 'number') {
      errors.push('Inventory quantity must be a number');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

// Utility functions
export const formatPrice = (price: number, currency: 'THB' | 'USD' = 'THB'): string => {
  return new Intl.NumberFormat(currency === 'THB' ? 'th-TH' : 'en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
};

export const calculateDiscount = (originalPrice: number, salePrice: number): number => {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

export const isProductInStock = (product: Product): boolean => {
  return product.inventory.available > 0 && product.status === 'active';
};

export const isLowStock = (product: Product): boolean => {
  return product.inventory.available <= product.inventory.lowStockThreshold;
};

// Singleton instance
export const productManager = new ProductManager();