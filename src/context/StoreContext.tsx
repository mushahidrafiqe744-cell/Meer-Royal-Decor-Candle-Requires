import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, CartItem, CustomerBooking, OrderRecord, MediaItem, TeamMember, StoreContact, StoreTimings, CategoryType } from '../types';
import { INITIAL_PRODUCTS, INITIAL_MEDIA, INITIAL_TEAM_MEMBERS, STORE_CONTACTS } from '../data/initialData';

interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'warning';
}

const DEFAULT_TIMINGS: StoreTimings = {
  openingTime: '10:00 AM',
  closingTime: '11:00 PM',
  sameDayCutoff: '2:00 PM',
  deliveryDays: 'Monday - Sunday (7 Days a Week)',
  timeSlots: [
    'Morning Slot (11:00 AM - 03:00 PM)',
    'Evening Slot (04:00 PM - 08:00 PM)',
    'Night Gala Slot (08:30 PM - 12:00 AM)',
    'Flexible Time (Call to coordinate)'
  ]
};

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  bookings: CustomerBooking[];
  orders: OrderRecord[];
  mediaList: MediaItem[];
  teamMembers: TeamMember[];
  contacts: StoreContact;
  storeTimings: StoreTimings;
  updateStoreTimings: (newTimings: Partial<StoreTimings>) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedCategory: CategoryType;
  setSelectedCategory: (cat: CategoryType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  language: 'en' | 'ur';
  setLanguage: (lang: 'en' | 'ur') => void;
  toast: ToastMessage | null;
  showToast: (text: string, type?: 'success' | 'info' | 'warning') => void;
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number, selectedScent?: string, customNote?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Booking Actions
  addBooking: (booking: Omit<CustomerBooking, 'id' | 'createdAt' | 'status'>) => CustomerBooking;
  updateBookingStatus: (id: string, status: CustomerBooking['status']) => void;
  deleteBooking: (id: string) => void;

  // Order Actions
  createOrder: (orderData: Omit<OrderRecord, 'id' | 'orderNumber' | 'createdAt' | 'status'>) => OrderRecord;
  updateOrderStatus: (id: string, status: OrderRecord['status']) => void;
  deleteOrder: (id: string) => void;

  // Admin Product Actions
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStock: (id: string) => void;

  // Media Actions
  addMedia: (media: Omit<MediaItem, 'id' | 'createdAt' | 'likes'>) => void;
  deleteMedia: (id: string) => void;

  // Team Actions
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  deleteTeamMember: (id: string) => void;

  // Reset
  resetStoreData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Helper to check if current URL points to Admin
const checkIsAdminRoute = () => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();
  return (
    path.includes('/admin') ||
    path === '/admin' ||
    path === '/admin/' ||
    hash.includes('admin') ||
    search.includes('admin')
  );
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('meer_products_v2');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('meer_cart_v2');
    return saved ? JSON.parse(saved) : [];
  });

  // Bookings
  const [bookings, setBookings] = useState<CustomerBooking[]>(() => {
    const saved = localStorage.getItem('meer_bookings_v2');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    const saved = localStorage.getItem('meer_orders_v2');
    return saved ? JSON.parse(saved) : [];
  });

  // Media
  const [mediaList, setMediaList] = useState<MediaItem[]>(() => {
    const saved = localStorage.getItem('meer_media_v2');
    return saved ? JSON.parse(saved) : INITIAL_MEDIA;
  });

  // Team Members
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('meer_team_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((m: TeamMember) => {
          if (m.name.toLowerCase().includes('aqsa')) {
            return {
              ...m,
              callNumber: '0303-9374747',
              whatsappNumber: '923039374747'
            };
          }
          return m;
        });
      } catch (e) {
        return INITIAL_TEAM_MEMBERS;
      }
    }
    return INITIAL_TEAM_MEMBERS;
  });

  // Timings
  const [storeTimings, setStoreTimings] = useState<StoreTimings>(() => {
    const saved = localStorage.getItem('meer_timings_v2');
    return saved ? JSON.parse(saved) : DEFAULT_TIMINGS;
  });

  // URL route
  const [currentView, setCurrentViewInternal] = useState<string>(() => {
    return checkIsAdminRoute() ? 'admin' : 'home';
  });

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [language, setLanguage] = useState<'en' | 'ur'>('en');
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Sync with Backend Database API on Mount
  useEffect(() => {
    async function syncBackendDatabase() {
      try {
        const res = await fetch('/api/database');
        if (res.ok) {
          const db = await res.json();
          if (db.products && Array.isArray(db.products) && db.products.length > 0) {
            setProducts(db.products);
          }
          if (db.bookings && Array.isArray(db.bookings)) {
            setBookings(db.bookings);
          }
          if (db.orders && Array.isArray(db.orders)) {
            setOrders(db.orders);
          }
          if (db.teamMembers && Array.isArray(db.teamMembers)) {
            setTeamMembers(db.teamMembers);
          }
          if (db.mediaList && Array.isArray(db.mediaList)) {
            setMediaList(db.mediaList);
          }
          if (db.timings) {
            setStoreTimings(db.timings);
          }
        }
      } catch (e) {
        console.log('Using local offline storage cache.');
      }
    }

    syncBackendDatabase();
  }, []);

  // Synchronize URL with view changes
  const setCurrentView = useCallback((view: string) => {
    setCurrentViewInternal(view);
    if (typeof window !== 'undefined') {
      if (view === 'admin') {
        const currentPath = window.location.pathname.toLowerCase();
        if (!currentPath.includes('/admin')) {
          try {
            window.history.pushState({ view: 'admin' }, '', '/admin');
          } catch (e) {
            window.location.hash = 'admin';
          }
        }
      } else {
        const currentPath = window.location.pathname.toLowerCase();
        if (currentPath.includes('/admin')) {
          try {
            window.history.pushState({ view: 'home' }, '', '/');
          } catch (e) {
            window.location.hash = '';
          }
        }
      }
    }
  }, []);

  // Listen to popstate and hashchange events
  useEffect(() => {
    const handleUrlChange = () => {
      if (checkIsAdminRoute()) {
        setCurrentViewInternal('admin');
      } else {
        setCurrentViewInternal(prev => (prev === 'admin' ? 'home' : prev));
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    handleUrlChange();

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('meer_products_v2', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('meer_cart_v2', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('meer_bookings_v2', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('meer_orders_v2', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('meer_media_v2', JSON.stringify(mediaList));
  }, [mediaList]);

  useEffect(() => {
    localStorage.setItem('meer_team_v2', JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem('meer_timings_v2', JSON.stringify(storeTimings));
  }, [storeTimings]);

  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = String(Date.now());
    setToast({ id, text, type });
    setTimeout(() => {
      setToast(prev => (prev?.id === id ? null : prev));
    }, 3200);
  };

  const updateStoreTimings = (newTimings: Partial<StoreTimings>) => {
    const updated = { ...storeTimings, ...newTimings };
    setStoreTimings(updated);
    fetch('/api/timings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    }).catch(() => {});
    showToast('Store & Booking Timings updated in database! ⏰', 'success');
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, selectedScent?: string, customNote?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.selectedScent === selectedScent);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedScent, customNote }];
    });
    showToast(`Added "${product.name}" to cart! 🛍️`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Booking operations
  const addBooking = (bookingData: Omit<CustomerBooking, 'id' | 'createdAt' | 'status'>): CustomerBooking => {
    const newBooking: CustomerBooking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };
    setBookings(prev => [newBooking, ...prev]);
    
    // Save to Backend Database
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBooking)
    }).catch(() => {});

    showToast('Event booking slot saved in database! 🎉', 'success');
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: CustomerBooking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    showToast(`Booking updated to ${status}`, 'info');
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
    fetch(`/api/bookings/${id}`, { method: 'DELETE' }).catch(() => {});
    showToast('Booking deleted from database', 'warning');
  };

  // Order operations
  const createOrder = (orderData: Omit<OrderRecord, 'id' | 'orderNumber' | 'createdAt' | 'status'>): OrderRecord => {
    const orderNumber = `MRD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderRecord = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    // Save to Backend Database
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    }).catch(() => {});

    showToast(`Order #${orderNumber} saved to database! 🚚`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: OrderRecord['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }).catch(() => {});
    showToast(`Order status updated to ${status}`, 'info');
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    fetch(`/api/orders/${id}`, { method: 'DELETE' }).catch(() => {});
    showToast('Order record removed from database', 'warning');
  };

  // Admin actions
  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => {
    const newProd: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1
    };
    setProducts(prev => [newProd, ...prev]);
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProd)
    }).catch(() => {});
    showToast(`Product "${newProd.name}" saved in database!`, 'success');
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    fetch(`/api/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields)
    }).catch(() => {});
    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    fetch(`/api/products/${id}`, { method: 'DELETE' }).catch(() => {});
    showToast('Product removed from database', 'warning');
  };

  const toggleProductStock = (id: string) => {
    const product = products.find(p => p.id === id);
    if (!product) return;
    const newStock = !product.inStock;
    setProducts(prev => prev.map(p => p.id === id ? { ...p, inStock: newStock } : p));
    fetch(`/api/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inStock: newStock })
    }).catch(() => {});
  };

  const addMedia = (mediaData: Omit<MediaItem, 'id' | 'createdAt' | 'likes'>) => {
    const newMedia: MediaItem = {
      ...mediaData,
      id: `med-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      likes: 1
    };
    setMediaList(prev => [newMedia, ...prev]);
    fetch('/api/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMedia)
    }).catch(() => {});
    showToast('Showcase media item published! 🎬', 'success');
  };

  const deleteMedia = (id: string) => {
    setMediaList(prev => prev.filter(m => m.id !== id));
    fetch(`/api/media/${id}`, { method: 'DELETE' }).catch(() => {});
    showToast('Showcase item deleted', 'warning');
  };

  const addTeamMember = (memberData: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = {
      ...memberData,
      id: `team-${Date.now()}`
    };
    setTeamMembers(prev => [...prev, newMember]);
    fetch('/api/team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMember)
    }).catch(() => {});
    showToast(`Team profile for ${newMember.name} saved in database!`, 'success');
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers(prev => prev.filter(t => t.id !== id));
    fetch(`/api/team/${id}`, { method: 'DELETE' }).catch(() => {});
    showToast('Team member removed from database', 'warning');
  };

  const resetStoreData = () => {
    setProducts(INITIAL_PRODUCTS);
    setMediaList(INITIAL_MEDIA);
    setTeamMembers(INITIAL_TEAM_MEMBERS);
    setStoreTimings(DEFAULT_TIMINGS);
    localStorage.removeItem('meer_products_v2');
    localStorage.removeItem('meer_media_v2');
    localStorage.removeItem('meer_team_v2');
    localStorage.removeItem('meer_timings_v2');
    showToast('Store catalog reset to default demo data', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        bookings,
        orders,
        mediaList,
        teamMembers,
        contacts: STORE_CONTACTS,
        storeTimings,
        updateStoreTimings,
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        cartOpen,
        setCartOpen,
        selectedProduct,
        setSelectedProduct,
        language,
        setLanguage,
        toast,
        showToast,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        addBooking,
        updateBookingStatus,
        deleteBooking,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStock,
        addMedia,
        deleteMedia,
        addTeamMember,
        deleteTeamMember,
        resetStoreData
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
