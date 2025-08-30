import { NextRequest, NextResponse } from 'next/server';

// Mock database for demonstration
const mockProducts = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    slug: 'iphone-15-pro-max',
    description: 'The ultimate iPhone with the most advanced Pro camera system, A17 Pro chip, and titanium design.',
    price: 44900,
    salePrice: 42900,
    currency: 'THB',
    images: [
      'https://replicate.delivery/xezq/qisfvMGUgXRevEC1UuubztIvwc39NOLAsE6tgt5ljeKmR4fUB/tmpkmvg9ev_.webp'
    ],
    category: 'smartphones',
    tags: ['apple', 'iphone', 'pro', '5g', 'premium'],
    specifications: {
      display: '6.7-inch Super Retina XDR',
      processor: 'A17 Pro chip',
      storage: '256GB',
      camera: '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      battery: 'Up to 29 hours video playback',
      color: 'Natural Titanium'
    },
    inventory: {
      quantity: 50,
      reserved: 5,
      available: 45,
      lowStockThreshold: 10
    },
    vendor: {
      id: 'vendor_1',
      name: 'Apple Authorized Reseller Thailand',
      rating: 4.8,
      verified: true
    },
    ratings: {
      average: 4.7,
      count: 1250,
      distribution: { 5: 850, 4: 300, 3: 70, 2: 20, 1: 10 }
    },
    status: 'active',
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    description: 'Galaxy S24 Ultra with built-in S Pen, 200MP camera, and Galaxy AI features.',
    price: 43900,
    currency: 'THB',
    images: [
      'https://placehold.co/800x600?text=Samsung+Galaxy+S24+Ultra+Professional+Product+Photography'
    ],
    category: 'smartphones',
    tags: ['samsung', 'galaxy', 's-pen', '5g', 'android'],
    specifications: {
      display: '6.8-inch Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 3',
      storage: '256GB',
      camera: '200MP Main + 50MP Periscope + 12MP Ultra Wide + 10MP Telephoto',
      battery: '5000mAh',
      color: 'Titanium Gray'
    },
    inventory: {
      quantity: 30,
      reserved: 3,
      available: 27,
      lowStockThreshold: 5
    },
    vendor: {
      id: 'vendor_2',
      name: 'Samsung Official Store Thailand',
      rating: 4.9,
      verified: true
    },
    ratings: {
      average: 4.6,
      count: 890,
      distribution: { 5: 600, 4: 220, 3: 50, 2: 15, 1: 5 }
    },
    status: 'active',
    featured: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'MacBook Pro 16-inch M3',
    slug: 'macbook-pro-16-m3',
    description: 'MacBook Pro 16-inch with M3 chip delivers exceptional performance for professionals.',
    price: 89900,
    currency: 'THB',
    images: [
      'https://placehold.co/800x600?text=MacBook+Pro+16+inch+M3+Professional+Product+Photography'
    ],
    category: 'laptops',
    tags: ['apple', 'macbook', 'pro', 'm3', 'laptop'],
    specifications: {
      display: '16.2-inch Liquid Retina XDR',
      processor: 'Apple M3 chip',
      memory: '16GB unified memory',
      storage: '512GB SSD',
      graphics: '10-core GPU',
      color: 'Space Black'
    },
    inventory: {
      quantity: 15,
      reserved: 2,
      available: 13,
      lowStockThreshold: 3
    },
    vendor: {
      id: 'vendor_1',
      name: 'Apple Authorized Reseller Thailand',
      rating: 4.8,
      verified: true
    },
    ratings: {
      average: 4.8,
      count: 456,
      distribution: { 5: 350, 4: 80, 3: 20, 2: 4, 1: 2 }
    },
    status: 'active',
    featured: false,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'AirPods Pro (2nd generation)',
    slug: 'airpods-pro-2nd-gen',
    description: 'AirPods Pro with Active Noise Cancellation, Adaptive Transparency, and Spatial Audio.',
    price: 8900,
    currency: 'THB',
    images: [
      'https://placehold.co/800x600?text=AirPods+Pro+2nd+Generation+Professional+Product+Photography'
    ],
    category: 'audio',
    tags: ['apple', 'airpods', 'wireless', 'pro', 'noise-cancellation'],
    specifications: {
      connectivity: 'Bluetooth 5.3',
      features: 'Active Noise Cancellation, Adaptive Transparency',
      battery: 'Up to 6 hours listening time',
      charging: 'MagSafe Charging Case',
      compatibility: 'iOS, iPadOS, macOS, watchOS',
      color: 'White'
    },
    inventory: {
      quantity: 100,
      reserved: 10,
      available: 90,
      lowStockThreshold: 20
    },
    vendor: {
      id: 'vendor_1',
      name: 'Apple Authorized Reseller Thailand',
      rating: 4.8,
      verified: true
    },
    ratings: {
      average: 4.5,
      count: 2100,
      distribution: { 5: 1400, 4: 500, 3: 150, 2: 35, 1: 15 }
    },
    status: 'active',
    featured: false,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date()
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;
    
    // Filter parameters
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
    const vendor = searchParams.get('vendor');
    const inStock = searchParams.get('inStock') === 'true';
    const featured = searchParams.get('featured') === 'true';
    
    // Search parameter
    const query = searchParams.get('q');
    
    // Sort parameters
    const sortField = searchParams.get('sortField') || 'createdAt';
    const sortDirection = searchParams.get('sortDirection') || 'desc';

    // Apply filters
    let filteredProducts = [...mockProducts];

    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
    }

    if (vendor) {
      filteredProducts = filteredProducts.filter(p => p.vendor.id === vendor);
    }

    if (inStock) {
      filteredProducts = filteredProducts.filter(p => p.inventory.available > 0);
    }

    if (featured) {
      filteredProducts = filteredProducts.filter(p => p.featured);
    }

    if (query) {
      const searchTerm = query.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Apply sorting
    filteredProducts.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortField) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = a.salePrice || a.price;
          bValue = b.salePrice || b.price;
          break;
        case 'rating':
          aValue = a.ratings.average;
          bValue = b.ratings.average;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        default:
          aValue = new Date(a.updatedAt).getTime();
          bValue = new Date(b.updatedAt).getTime();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Apply pagination
    const total = filteredProducts.length;
    const paginatedProducts = filteredProducts.slice(offset, offset + limit);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      products: paginatedProducts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      },
      filters: {
        category,
        minPrice,
        maxPrice,
        vendor,
        inStock,
        featured,
        query
      },
      sort: {
        field: sortField,
        direction: sortDirection
      }
    });

  } catch (error) {
    console.error('Products API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();
    
    // Validate required fields
    if (!productData.name || !productData.description || !productData.price || !productData.category) {
      return NextResponse.json(
        { error: 'Missing required fields: name, description, price, category' },
        { status: 400 }
      );
    }

    // Create new product
    const newProduct = {
      id: `product_${Date.now()}`,
      slug: productData.name.toLowerCase().replace(/\s+/g, '-'),
      ...productData,
      inventory: productData.inventory || {
        quantity: 0,
        reserved: 0,
        available: 0,
        lowStockThreshold: 5
      },
      ratings: {
        average: 0,
        count: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      },
      status: productData.status || 'active',
      featured: productData.featured || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // In a real app, this would save to the database
    mockProducts.push(newProduct);

    return NextResponse.json({
      success: true,
      product: newProduct,
      message: 'Product created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Create Product Error:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}