import React, { useState } from 'react';
import { 
  Package, Calendar, DollarSign, Clock, Users, Video, 
  Trash2, Plus, CheckCircle, AlertCircle, Sparkles, Lock,
  Save, RefreshCw, Upload, Image as ImageIcon, Eye
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CategoryType } from '../types';

const IMAGE_PRESETS = [
  { label: 'Scented Candle Jar', url: '/src/assets/images/product_scented_candle_jar_1790775161737.jpg' },
  { label: 'Party Decor Arch', url: '/src/assets/images/product_party_decor_setup_1790775176807.jpg' },
  { label: 'Luxury Bubble Candle', url: '/src/assets/images/product_luxury_bubble_candle_1790775202396.jpg' },
  { label: 'Party Disposables', url: '/src/assets/images/product_disposable_tableware_1790775193176.jpg' },
  { label: 'Luxury Gift Hamper', url: '/src/assets/images/category_candle_hamper_lifestyle_1790853114266.jpg' },
  { label: 'Yankee Glass Jars', url: '/src/assets/images/hero_candle_lifestyle_editorial_1790853087024.jpg' },
  { label: 'Velvet Gold Tin', url: '/src/assets/images/hero_luxury_candles_decor_1790775140482.jpg' },
  { label: 'Brand Emblem Logo', url: '/src/assets/images/meer_royal_logo_1790857160911.jpg' }
];

export const AdminPortal: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStock,
    orders,
    updateOrderStatus,
    deleteOrder,
    bookings,
    updateBookingStatus,
    deleteBooking,
    mediaList,
    addMedia,
    deleteMedia,
    teamMembers,
    addTeamMember,
    deleteTeamMember,
    storeTimings,
    updateStoreTimings,
    resetStoreData,
    setCurrentView
  } = useStore();

  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'bookings' | 'products' | 'timings' | 'media' | 'team'>('orders');

  // New Product Form State
  const [newProdName, setNewProdName] = useState('');
  const [newProdUrdu, setNewProdUrdu] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<CategoryType>('scented-candles');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdOriginalPrice, setNewProdOriginalPrice] = useState('');
  const [newProdImage, setNewProdImage] = useState(IMAGE_PRESETS[0].url);
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdScentNotes, setNewProdScentNotes] = useState('');

  // Media Form State
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [newMediaType, setNewMediaType] = useState<'video' | 'image'>('video');
  const [newMediaSrc, setNewMediaSrc] = useState('');
  const [newMediaCategory, setNewMediaCategory] = useState('Candles');

  // Team Form State
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberDesignation, setNewMemberDesignation] = useState('');
  const [newMemberCall, setNewMemberCall] = useState('');
  const [newMemberWA, setNewMemberWA] = useState('');
  const [newMemberBio, setNewMemberBio] = useState('');

  // Timings Form State
  const [openingTime, setOpeningTime] = useState(storeTimings.openingTime);
  const [closingTime, setClosingTime] = useState(storeTimings.closingTime);
  const [sameDayCutoff, setSameDayCutoff] = useState(storeTimings.sameDayCutoff);
  const [deliveryDays, setDeliveryDays] = useState(storeTimings.deliveryDays);
  const [newTimeSlot, setNewTimeSlot] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === 'KING' || pin === 'MUSHAHID' || pin === '1234') {
      setIsAuthenticated(true);
    } else {
      alert('❌ Invalid Security PIN! Please enter "KING" or "MUSHAHID".');
    }
  };

  const handleProductImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setNewProdImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMediaFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setNewMediaSrc(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdPrice) {
      alert('Please provide product title and price!');
      return;
    }

    addProduct({
      name: newProdName,
      nameUrdu: newProdUrdu || undefined,
      category: newProdCategory,
      price: Number(newProdPrice),
      originalPrice: newProdOriginalPrice ? Number(newProdOriginalPrice) : undefined,
      image: newProdImage || IMAGE_PRESETS[0].url,
      description: newProdDesc || 'Artisan handcrafted scented creation by Meer Royal Decor.',
      scentNotes: newProdScentNotes ? newProdScentNotes.split(',').map(s => s.trim()) : ['Vanilla', 'Amber'],
      inStock: true,
      isNewArrival: true,
      isBestSeller: false
    });

    setNewProdName('');
    setNewProdUrdu('');
    setNewProdPrice('');
    setNewProdOriginalPrice('');
    setNewProdImage(IMAGE_PRESETS[0].url);
    setNewProdDesc('');
    setNewProdScentNotes('');
  };

  const handleCreateMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaTitle.trim() || !newMediaSrc.trim()) {
      alert('Please provide title and media link / image file!');
      return;
    }

    addMedia({
      title: newMediaTitle,
      type: newMediaType,
      src: newMediaSrc,
      category: newMediaCategory
    });

    setNewMediaTitle('');
    setNewMediaSrc('');
  };

  const handleCreateTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberDesignation.trim()) {
      alert('Please provide name and designation!');
      return;
    }

    addTeamMember({
      name: newMemberName,
      designation: newMemberDesignation,
      callNumber: newMemberCall || '0324-4787003',
      whatsappNumber: newMemberWA || '923244787003',
      bio: newMemberBio,
      avatarType: 'crown'
    });

    setNewMemberName('');
    setNewMemberDesignation('');
    setNewMemberCall('');
    setNewMemberWA('');
    setNewMemberBio('');
  };

  const handleSaveTimings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreTimings({
      openingTime,
      closingTime,
      sameDayCutoff,
      deliveryDays
    });
  };

  const handleAddTimeSlot = () => {
    if (!newTimeSlot.trim()) return;
    const updated = [...storeTimings.timeSlots, newTimeSlot.trim()];
    updateStoreTimings({ timeSlots: updated });
    setNewTimeSlot('');
  };

  const handleDeleteTimeSlot = (index: number) => {
    const updated = storeTimings.timeSlots.filter((_, i) => i !== index);
    updateStoreTimings({ timeSlots: updated });
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 bg-[#FAF8F5]">
        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xl max-w-md w-full text-center space-y-5">
          <div className="w-16 h-16 bg-amber-50 text-amber-900 rounded-full flex items-center justify-center mx-auto border border-amber-200/80">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">Owner Admin Portal</h2>
            <p className="text-xs text-stone-500 mt-1">
              Enter Owner Security PIN (<code className="text-amber-900 font-bold">KING</code> or <code className="text-amber-900 font-bold">MUSHAHID</code>) to manage orders, team, timings & products.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Security PIN (KING)..."
              required
              className="w-full px-4 py-3 text-sm text-center tracking-widest bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-900"
            />

            <button
              type="submit"
              className="w-full py-3 bg-[#2C241E] hover:bg-stone-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-md"
            >
              Unlock Dashboard
            </button>
          </form>

          <button
            onClick={() => setCurrentView('home')}
            className="text-xs text-stone-500 hover:text-stone-800"
          >
            ← Return to Storefront
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Bar Header */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Admin Session Active
              </span>
              <span className="text-xs text-stone-400">·</span>
              <span className="text-xs text-stone-500">Meer Royal Decor Management</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Store Control Center
            </h1>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={resetStoreData}
              title="Reset to default initial data"
              className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
              <span>Reset Demo Data</span>
            </button>

            <button
              onClick={() => setCurrentView('home')}
              className="px-4 py-2 bg-amber-900 hover:bg-amber-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              View Live Storefront ↗
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'orders' ? 'bg-[#2C241E] text-white shadow-xs' : 'bg-white text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Customer Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'bookings' ? 'bg-[#2C241E] text-white shadow-xs' : 'bg-white text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Event Bookings ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('timings')}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'timings' ? 'bg-[#2C241E] text-white shadow-xs' : 'bg-white text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>⏰ Store & Booking Timings</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'products' ? 'bg-[#2C241E] text-white shadow-xs' : 'bg-white text-stone-600 hover:bg-stone-100'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Products & Stock ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'team' ? 'bg-[#2C241E] text-white shadow-xs' : 'bg-white text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>👥 Team Management ({teamMembers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'media' ? 'bg-[#2C241E] text-white shadow-xs' : 'bg-white text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Showcase Media ({mediaList.length})</span>
          </button>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                Recent Orders & Deliveries
              </h3>
              <p className="text-xs text-stone-500">
                Track status of Cash on Delivery (COD) and WhatsApp orders.
              </p>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center text-stone-400 border border-stone-200">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="font-serif text-base font-medium">No orders recorded yet.</p>
                <p className="text-xs mt-1">Customer checkout orders will appear here in real-time.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold bg-stone-100 text-stone-800 px-2 py-0.5 rounded">
                          {ord.orderNumber}
                        </span>
                        <span className="text-xs text-stone-400">
                          {new Date(ord.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <h4 className="font-serif text-lg font-bold text-stone-900">{ord.customerName}</h4>
                      <p className="text-xs text-stone-600">
                        📞 {ord.phone} · 📍 {ord.address}, {ord.city}
                      </p>

                      <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/60 text-xs space-y-1">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>{item.quantity}x {item.productName}</span>
                            <span className="font-semibold">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                        <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-stone-900">
                          <span>Total (inc. Delivery):</span>
                          <span>Rs. {ord.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col justify-between items-end gap-2">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                        className="px-3 py-1.5 text-xs bg-stone-100 border border-stone-300 rounded-lg font-semibold cursor-pointer"
                      >
                        <option value="pending">🟡 Pending Dispatch</option>
                        <option value="confirmed">🔵 Confirmed</option>
                        <option value="delivered">🟢 Delivered</option>
                        <option value="cancelled">🔴 Cancelled</option>
                      </select>

                      <button
                        onClick={() => {
                          if (confirm('Delete this order record?')) deleteOrder(ord.id);
                        }}
                        className="p-2 text-stone-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                Event Decor Pre-Bookings
              </h3>
              <p className="text-xs text-stone-500">
                Customer bookings submitted via the online booking form.
              </p>
            </div>

            {bookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center text-stone-400 border border-stone-200">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="font-serif text-base font-medium">No event bookings received yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookings.map((bk) => (
                  <div key={bk.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase bg-amber-50 text-amber-900 px-2 py-0.5 rounded">
                          {bk.eventType}
                        </span>
                        <span className="text-[11px] text-stone-400">
                          {bk.date}
                        </span>
                      </div>

                      <h4 className="font-serif text-base font-bold text-stone-900">{bk.name}</h4>
                      <p className="text-xs text-stone-600">
                        📞 <a href={`tel:${bk.phone}`} className="text-amber-900 hover:underline">{bk.phone}</a>
                      </p>
                      <p className="text-xs text-stone-500">
                        ⏰ Slot: <strong>{bk.timeSlot}</strong>
                      </p>
                      <p className="text-xs text-stone-500">
                        📍 City: {bk.city}
                      </p>
                      {bk.notes && (
                        <p className="text-xs italic bg-stone-50 p-2 rounded border border-stone-200 text-stone-600">
                          "{bk.notes}"
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      <a
                        href={`https://wa.me/${bk.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(bk.name)},%20confirming%20your%20event%20booking%20for%20${encodeURIComponent(bk.date)}%20with%20Meer%20Royal%20Decor.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg"
                      >
                        Chat on WhatsApp
                      </a>

                      <button
                        onClick={() => {
                          if (confirm('Delete this booking?')) deleteBooking(bk.id);
                        }}
                        className="p-1 text-stone-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: TIMINGS (STORE & BOOKING TIME SLOTS) */}
        {activeTab === 'timings' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-900" />
                  <span>Configure Store Operating & Dispatch Timings</span>
                </h3>
                <p className="text-xs text-stone-500">
                  Manage store opening, closing hours, and same-day delivery cutoff times.
                </p>
              </div>

              <form onSubmit={handleSaveTimings} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Store Opening Time
                    </label>
                    <input
                      type="text"
                      value={openingTime}
                      onChange={(e) => setOpeningTime(e.target.value)}
                      placeholder="e.g. 10:00 AM"
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Store Closing Time
                    </label>
                    <input
                      type="text"
                      value={closingTime}
                      onChange={(e) => setClosingTime(e.target.value)}
                      placeholder="e.g. 11:00 PM"
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Lahore Same-Day Cutoff
                    </label>
                    <input
                      type="text"
                      value={sameDayCutoff}
                      onChange={(e) => setSameDayCutoff(e.target.value)}
                      placeholder="e.g. 2:00 PM"
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Delivery Days
                    </label>
                    <input
                      type="text"
                      value={deliveryDays}
                      onChange={(e) => setDeliveryDays(e.target.value)}
                      placeholder="e.g. 7 Days a Week"
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#2C241E] hover:bg-stone-900 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4 text-amber-200" />
                  <span>Save Timings Changes</span>
                </button>
              </form>
            </div>

            {/* Event Setup Time Slots Manager */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Event Setup & Booking Time Slots
                </h3>
                <p className="text-xs text-stone-500">
                  These time slots appear on the customer booking form for selection.
                </p>
              </div>

              <div className="flex gap-2 max-w-md">
                <input
                  type="text"
                  value={newTimeSlot}
                  onChange={(e) => setNewTimeSlot(e.target.value)}
                  placeholder="e.g. Midnight Surprise Slot (11:30 PM - 01:00 AM)"
                  className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                />
                <button
                  type="button"
                  onClick={handleAddTimeSlot}
                  className="px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 cursor-pointer"
                >
                  Add Slot
                </button>
              </div>

              <div className="space-y-2 pt-2">
                {storeTimings.timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-3 max-w-lg"
                  >
                    <span className="text-xs font-medium text-stone-800 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-800" />
                      <span>{slot}</span>
                    </span>

                    <button
                      onClick={() => handleDeleteTimeSlot(index)}
                      className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PRODUCTS (WITH INSTANT IMAGE UPLOAD & PREVIEW) */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs">
              <div className="border-b border-stone-100 pb-3 mb-4">
                <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-900" />
                  <span>➕ Add & Publish Product to Storefront</span>
                </h3>
                <p className="text-xs text-stone-500">
                  Select an image from device or choose a preset — your image will immediately show live upon publishing!
                </p>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Product Title *</label>
                    <input
                      type="text"
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      placeholder="e.g. Royal Gold Scented Jar"
                      required
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Urdu Title (optional)</label>
                    <input
                      type="text"
                      value={newProdUrdu}
                      onChange={(e) => setNewProdUrdu(e.target.value)}
                      placeholder="مثال: رائل گولڈ خوشبودار کینڈل"
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Category *</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                    >
                      <option value="scented-candles">Scented Candles</option>
                      <option value="luxury-jars">Luxury Jars</option>
                      <option value="bubble-candles">Bubble Candles</option>
                      <option value="party-decor">Party Decor</option>
                      <option value="balloons">Balloons</option>
                      <option value="disposables">Disposables</option>
                      <option value="gift-sets">Gift Sets</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Price in PKR *</label>
                    <input
                      type="number"
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      placeholder="e.g. 1850"
                      required
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Original Price (optional)</label>
                    <input
                      type="number"
                      value={newProdOriginalPrice}
                      onChange={(e) => setNewProdOriginalPrice(e.target.value)}
                      placeholder="e.g. 2200"
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Scent Notes (comma separated)</label>
                    <input
                      type="text"
                      value={newProdScentNotes}
                      onChange={(e) => setNewProdScentNotes(e.target.value)}
                      placeholder="e.g. French Vanilla, Sandalwood"
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                    />
                  </div>
                </div>

                {/* IMAGE UPLOAD & PRESET CHOOSER */}
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-amber-900" />
                      <span>📸 Product Image (Upload File or Select Preset)</span>
                    </span>
                    <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-100/70 px-2 py-0.5 rounded">
                      ✅ Image Ready to Show
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    {/* File Upload & URL Input */}
                    <div className="space-y-2">
                      <label className="flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-stone-100 text-stone-800 border-2 border-dashed border-stone-300 rounded-xl cursor-pointer transition-colors text-xs font-semibold">
                        <Upload className="w-4 h-4 text-amber-900" />
                        <span>Choose Image from Phone / Computer</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProductImageFileChange}
                          className="hidden"
                        />
                      </label>

                      <div className="text-[11px] text-stone-500 text-center">or paste image link:</div>

                      <input
                        type="text"
                        value={newProdImage}
                        onChange={(e) => setNewProdImage(e.target.value)}
                        placeholder="Paste image URL here..."
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:bg-white"
                      />
                    </div>

                    {/* Live Preview Box */}
                    <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-stone-200">
                      <img
                        src={newProdImage || IMAGE_PRESETS[0].url}
                        alt="Preview"
                        className="w-20 h-20 rounded-lg object-cover bg-stone-100 border border-stone-200"
                      />
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-stone-900">
                          {newProdName || 'Product Image Preview'}
                        </div>
                        <div className="text-[11px] text-stone-500">
                          {newProdPrice ? `Rs. ${Number(newProdPrice).toLocaleString()}` : 'Price not set'}
                        </div>
                        <div className="text-[10px] text-emerald-700 font-medium">
                          Will show on storefront immediately upon publish!
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preset Buttons */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-semibold text-stone-600">Quick Image Presets:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {IMAGE_PRESETS.map((preset, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setNewProdImage(preset.url)}
                          className={`px-2.5 py-1 text-[11px] rounded-lg border transition-colors cursor-pointer ${
                            newProdImage === preset.url
                              ? 'bg-amber-900 text-white border-amber-900'
                              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">Product Description</label>
                  <textarea
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    placeholder="Short description of aromas, wax blend, burn time, or event setup details..."
                    rows={2}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-[#2C241E] hover:bg-stone-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-amber-200" />
                  <span>Publish Product (Live With Image)</span>
                </button>
              </form>
            </div>

            {/* CATALOG LIST */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-stone-200 flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Current Catalog ({products.length})
                </h3>
              </div>

              <div className="divide-y divide-stone-100">
                {products.map((p) => (
                  <div key={p.id} className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-14 h-14 rounded-xl object-cover bg-stone-100 border border-stone-200 shrink-0"
                      />
                      <div>
                        <h4 className="font-serif text-sm font-bold text-stone-900">{p.name}</h4>
                        <div className="text-xs text-stone-500">
                          {p.category} · <strong className="text-stone-900">Rs. {p.price.toLocaleString()}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleProductStock(p.id)}
                        className={`px-3 py-1.5 text-xs rounded-lg font-medium cursor-pointer ${
                          p.inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-100 text-stone-400'
                        }`}
                      >
                        {p.inStock ? 'In Stock' : 'Out of Stock'}
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete product "${p.name}"?`)) deleteProduct(p.id);
                        }}
                        className="p-1.5 text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: TEAM */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  👥 Add Team Member Profile
                </h3>
                <p className="text-xs text-stone-500">
                  Profile cards appear in the leadership & team section.
                </p>
              </div>

              <form onSubmit={handleCreateTeamMember} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="Name (e.g. Aqsa) *"
                    required
                    className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                  />

                  <input
                    type="text"
                    value={newMemberDesignation}
                    onChange={(e) => setNewMemberDesignation(e.target.value)}
                    placeholder="Designation (e.g. Managing Director) *"
                    required
                    className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="tel"
                    value={newMemberCall}
                    onChange={(e) => setNewMemberCall(e.target.value)}
                    placeholder="Call Phone (e.g. 0303-9374747)"
                    className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                  />

                  <input
                    type="tel"
                    value={newMemberWA}
                    onChange={(e) => setNewMemberWA(e.target.value)}
                    placeholder="WhatsApp Phone (e.g. 923039374747)"
                    className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                  />
                </div>

                <textarea
                  value={newMemberBio}
                  onChange={(e) => setNewMemberBio(e.target.value)}
                  placeholder="Short Bio / Specialty..."
                  rows={2}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                />

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#2C241E] hover:bg-stone-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  Publish Team Member Card
                </button>
              </form>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-stone-200">
                <h3 className="font-serif text-lg font-bold text-stone-900">Current Team Members</h3>
              </div>

              <div className="divide-y divide-stone-100">
                {teamMembers.map((t) => (
                  <div key={t.id} className="p-4 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-stone-900">{t.name}</h4>
                      <span className="text-xs text-amber-900 font-semibold">{t.designation}</span>
                      <div className="text-xs text-stone-500">Call: {t.callNumber} · WA: {t.whatsappNumber}</div>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`Remove ${t.name}?`)) deleteTeamMember(t.id);
                      }}
                      className="p-1.5 text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: MEDIA */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs">
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                📤 Upload Live Showcase Media / Video Link
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                Add MP4 video clips or photo highlights to the "Our Work" reel section.
              </p>

              <form onSubmit={handleCreateMedia} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newMediaTitle}
                    onChange={(e) => setNewMediaTitle(e.target.value)}
                    placeholder="Showcase Title *"
                    required
                    className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                  />

                  <select
                    value={newMediaType}
                    onChange={(e) => setNewMediaType(e.target.value as any)}
                    className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                  >
                    <option value="video">Video (MP4 Clip)</option>
                    <option value="image">Image Photo</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-xl cursor-pointer text-xs font-semibold">
                    <Upload className="w-4 h-4 text-amber-900" />
                    <span>Choose Media File from Device</span>
                    <input
                      type="file"
                      accept={newMediaType === 'video' ? 'video/*' : 'image/*'}
                      onChange={handleMediaFileChange}
                      className="hidden"
                    />
                  </label>

                  <input
                    type="text"
                    value={newMediaSrc}
                    onChange={(e) => setNewMediaSrc(e.target.value)}
                    placeholder="or paste direct video/image URL *"
                    required
                    className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#2C241E] hover:bg-stone-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  Publish Showcase Reel
                </button>
              </form>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-stone-200">
                <h3 className="font-serif text-lg font-bold text-stone-900">Showcase Gallery Items</h3>
              </div>

              <div className="divide-y divide-stone-100">
                {mediaList.map((m) => (
                  <div key={m.id} className="p-4 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-stone-900">{m.title}</h4>
                      <span className="text-xs text-stone-400">{m.type.toUpperCase()} · {m.category}</span>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm('Delete media item?')) deleteMedia(m.id);
                      }}
                      className="p-1.5 text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
