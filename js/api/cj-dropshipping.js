// ===== CJ DROPSHIPPING API INTEGRATION =====
// This module handles all CJ Dropshipping API operations
// NOTE: All API calls should be made through your backend (Supabase Edge Functions)
// to keep the API key secure

class CJDropshippingAPI {
  constructor() {
    this.baseUrl = 'https://developers.cjdropshipping.com/api2.0/v1';
    // API key is stored on backend and accessed via Edge Functions
  }

  // ===== PRODUCT OPERATIONS =====

  /**
   * Search products from CJ Dropshipping catalog
   * @param {string} keyword - Search keyword
   * @param {number} pageNo - Page number for pagination
   * @param {number} pageSize - Items per page
   */
  async searchProducts(keyword, pageNo = 1, pageSize = 50) {
    try {
      const response = await fetch('/api/cj/products/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword,
          pageNo,
          pageSize
        })
      });

      if (!response.ok) {
        throw new Error('Product search failed');
      }

      return await response.json();
    } catch (error) {
      console.error('CJ search error:', error);
      throw error;
    }
  }

  /**
   * Get product details from CJ Dropshipping
   * @param {string} productId - CJ product ID
   */
  async getProductDetails(productId) {
    try {
      const response = await fetch(`/api/cj/products/${productId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }

      return await response.json();
    } catch (error) {
      console.error('CJ get product error:', error);
      throw error;
    }
  }

  /**
   * Get product variants (sizes, colors, etc.)
   * @param {string} productId - CJ product ID
   */
  async getProductVariants(productId) {
    try {
      const response = await fetch(`/api/cj/products/${productId}/variants`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch variants');
      }

      return await response.json();
    } catch (error) {
      console.error('CJ get variants error:', error);
      throw error;
    }
  }

  /**
   * Get product images
   * @param {string} productId - CJ product ID
   */
  async getProductImages(productId) {
    try {
      const response = await fetch(`/api/cj/products/${productId}/images`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      return await response.json();
    } catch (error) {
      console.error('CJ get images error:', error);
      throw error;
    }
  }

  // ===== INVENTORY & STOCK =====

  /**
   * Check product stock/inventory
   * @param {string} productId - CJ product ID
   */
  async checkStock(productId) {
    try {
      const response = await fetch(`/api/cj/products/${productId}/stock`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to check stock');
      }

      return await response.json();
    } catch (error) {
      console.error('CJ check stock error:', error);
      throw error;
    }
  }

  /**
   * Sync inventory across multiple products
   */
  async syncInventory(productIds) {
    try {
      const response = await fetch('/api/cj/inventory/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds })
      });

      if (!response.ok) {
        throw new Error('Inventory sync failed');
      }

      return await response.json();
    } catch (error) {
      console.error('CJ inventory sync error:', error);
      throw error;
    }
  }

  // ===== SHIPPING & RATES =====

  /**
   * Calculate shipping rates for a product
   * @param {object} shippingInfo - Contains destination, weight, etc.
   */
  async calculateShippingRate(shippingInfo) {
    try {
      const response = await fetch('/api/cj/shipping/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shippingInfo)
      });

      if (!response.ok) {
        throw new Error('Shipping calculation failed');
      }

      return await response.json();
    } catch (error) {
      console.error('CJ shipping calculation error:', error);
      throw error;
    }
  }

  /**
   * Get available shipping methods
   * @param {string} country - Destination country code
   */
  async getShippingMethods(country) {
    try {
      const response = await fetch(`/api/cj/shipping/methods?country=${country}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch shipping methods');
      }

      return await response.json();
    } catch (error) {
      console.error('CJ get shipping methods error:', error);
      throw error;
    }
  }

  // ===== ORDERS =====

  /**
   * Create order with CJ Dropshipping
   * @param {object} orderData - Order details
   */
  async createOrder(orderData) {
    try {
      const response = await fetch('/api/cj/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Order creation failed');
      }

      return await response.json();
    } catch (error) {
      console.error('CJ order creation error:', error);
      throw error;
    }
  }

  /**
   * Get order details from CJ
   * @param {string} cjOrderId - CJ Order ID
   */
  async getOrderDetails(cjOrderId) {
    try {
      const response = await fetch(`/api/cj/orders/${cjOrderId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }

      return await response.json();
    } catch (error) {
      console.error('CJ get order error:', error);
      throw error;
    }
  }

  /**
   * Get order status
   * @param {string} cjOrderId - CJ Order ID
   */
  async getOrderStatus(cjOrderId) {
    try {
      const response = await fetch(`/api/cj/orders/${cjOrderId}/status`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch order status');
      }

      return await response.json();
    } catch (error) {
      console.error('CJ get order status error:', error);
      throw error;
    }
  }

  // ===== TRACKING =====

  /**
   * Get tracking information for an order
   * @param {string} cjOrderId - CJ Order ID
   */
  async getTrackingInfo(cjOrderId) {
    try {
      const response = await fetch(`/api/cj/orders/${cjOrderId}/tracking`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tracking info');
      }

      return await response.json();
    } catch (error) {
      console.error('CJ tracking error:', error);
      throw error;
    }
  }

  // ===== PRICING =====

  /**
   * Get product pricing
   * @param {string} productId - CJ product ID
   */
  async getPricing(productId) {
    try {
      const response = await fetch(`/api/cj/products/${productId}/pricing`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch pricing');
      }

      return await response.json();
    } catch (error) {
      console.error('CJ pricing error:', error);
      throw error;
    }
  }

  /**
   * Get bulk pricing for multiple products
   */
  async getBulkPricing(productIds) {
    try {
      const response = await fetch('/api/cj/products/pricing/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bulk pricing');
      }

      return await response.json();
    } catch (error) {
      console.error('CJ bulk pricing error:', error);
      throw error;
    }
  }

  // ===== CATEGORIES & BROWSE =====

  /**
   * Get product categories
   */
  async getCategories() {
    try {
      const response = await fetch('/api/cj/categories', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      return await response.json();
    } catch (error) {
      console.error('CJ categories error:', error);
      throw error;
    }
  }

  /**
   * Get trending products
   */
  async getTrendingProducts(limit = 10) {
    try {
      const response = await fetch(`/api/cj/products/trending?limit=${limit}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch trending products');
      }

      return await response.json();
    } catch (error) {
      console.error('CJ trending products error:', error);
      throw error;
    }
  }
}

// Initialize CJ Dropshipping client
const cjAPI = new CJDropshippingAPI();

// Helper function to import products to store
async function importProductToCatalog(cjProductId) {
  try {
    const productDetails = await cjAPI.getProductDetails(cjProductId);
    const images = await cjAPI.getProductImages(cjProductId);
    const variants = await cjAPI.getProductVariants(cjProductId);
    const pricing = await cjAPI.getPricing(cjProductId);

    const importedProduct = {
      cj_product_id: cjProductId,
      name: productDetails.name,
      description: productDetails.description,
      category: productDetails.category,
      images: images,
      variants: variants,
      price: pricing.retail_price,
      cost: pricing.wholesale_price,
      supplier: 'CJ Dropshipping',
      created_at: new Date().toISOString()
    };

    // Save to Wimp-Drop database
    const result = await supabase.insert('products', importedProduct);
    showNotification('Product imported successfully!', 'success');
    return result;
  } catch (error) {
    console.error('Product import error:', error);
    showNotification('Failed to import product', 'error');
    throw error;
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CJDropshippingAPI, cjAPI };
}
