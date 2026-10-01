export type CategoryType = 
  | 'all'
  | 'scented-candles'
  | 'luxury-jars'
  | 'bubble-candles'
  | 'party-decor'
  | 'balloons'
  | 'disposables'
  | 'gift-sets';

export interface Product {
  id: string;
  name: string;
  nameUrdu?: string;
  category: CategoryType;
  price: number;
  originalPrice?: number;
  image: string;
  fallbackImage?: string;
  description: string;
  scentNotes?: string[];
  burnTime?: string;
  dimensions?: string;
  waxType?: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  whatsappText?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedScent?: string;
  customNote?: string;
}

export interface CustomerBooking {
  id: string;
  name: string;
  phone: string;
  email?: string;
  eventType?: string;
  date: string;
  timeSlot?: string;
  city?: string;
  notes?: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  deliveryMethod: 'lahore-same-day' | 'standard-courier' | 'express-courier';
  paymentMethod: 'cod' | 'whatsapp' | 'bank-transfer';
  status: 'pending' | 'confirmed' | 'dispatched' | 'delivered';
  notes?: string;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'video' | 'image';
  src: string;
  poster?: string;
  category?: string;
  likes?: number;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  callNumber: string;
  whatsappNumber: string;
  avatarType?: 'crown' | 'tech' | 'user' | 'star';
  bio?: string;
}

export interface StoreContact {
  primaryPhone: string;
  whatsappPhone: string;
  secondaryPhone: string;
  ownerName: string;
  location: string;
  email: string;
}

export interface StoreTimings {
  openingTime: string;
  closingTime: string;
  sameDayCutoff: string;
  deliveryDays: string;
  timeSlots: string[];
}
