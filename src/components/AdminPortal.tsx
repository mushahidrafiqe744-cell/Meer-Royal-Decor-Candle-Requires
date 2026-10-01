import React, { useState } from 'react';
import {
  Lock,
  PackagePlus,
  ClipboardList,
  Video,
  Users,
  BarChart3,
  Trash2,
  Phone,
  MessageSquare,
  Sparkles,
  RefreshCw,
  Clock,
  Plus,
  Save,
  Check
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CategoryType } from '../types';

export const AdminPortal: React.FC = () => {
  const {
    products,
    addProduct,
    deleteProduct,
    toggleProductStock,
    bookings,
    updateBookingStatus,
    deleteBooking,
    orders,
    updateOrderStatus,
    deleteOrder,
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
  const [newProdImage, setNewProdImage] = useState('');
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
      image: newProdImage || '/src/assets/images/product_scented_candle_jar_1790775161737.jpg',
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
    setNewProdImage('');
    setNewProdDesc('');
    setNewProdScentNotes('');
  };

  const handleCreateMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaTitle.trim() || !newMediaSrc.trim()) {
      alert('Please provide title and media link / image URL!');
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
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium rounded-xl transition-colors cursor-pointer"
            >
              Lock & Logout
            </button>

            <button
              onClick={() => setCurrentView('home')}
              className="px-4 py-2 bg-[#2C241E] hover:bg-stone-900 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              View Storefront
            </button>
          </div>
        </div>

        {/* Real-time KPI Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block uppercase font-medium">Orders Placed</span>
            <span className="font-serif text-2xl font-bold text-stone-900 tabular-nums">{orders.length}</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block uppercase font-medium">Event Bookings</span>
            <span className="font-serif text-2xl font-bold text-stone-900 tabular-nums">{bookings.length}</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block uppercase font-medium">Live Products</span>
            <span className="font-serif text-2xl font-bold text-stone-900 tabular-nums">{products.length}</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block uppercase font-medium">Total Order Value</span>
            <span className="font-serif text-2xl font-bold text-amber-950 tabular-nums">
              Rs. {orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'orders' ? 'bg-[#2C241E] text-white' : 'bg-white text-stone-700 hover:bg-stone-100'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Orders Ledger ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'bookings' ? 'bg-[#2C241E] text-white' : 'bg-white text-stone-700 hover:bg-stone-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Event Bookings ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('timings')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'timings' ? 'bg-[#2C241E] text-white' : 'bg-white text-stone-700 hover:bg-stone-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>⏰ Store & Booking Timings</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'products' ? 'bg-[#2C241E] text-white' : 'bg-white text-stone-700 hover:bg-stone-100'
            }`}
          >
            <PackagePlus className="w-4 h-4" />
            <span>Products Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'team' ? 'bg-[#2C241E] text-white' : 'bg-white text-stone-700 hover:bg-stone-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Team Management ({teamMembers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'media' ? 'bg-[#2C241E] text-white' : 'bg-white text-stone-700 hover:bg-stone-100'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Media Showcase ({mediaList.length})</span>
          </button>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">Received Customer Orders</h3>
                <p className="text-xs text-stone-500">All WhatsApp & COD checkout records</p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="p-12 text-center text-xs text-stone-500">
                No orders registered yet. Test by placing an order from the store cart!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
                    <tr>
                      <th className="p-3">Order #</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">City & Address</th>
                      <th className="p-3">Items</th>
                      <th className="p-3">Total (PKR)</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-stone-50/50">
                        <td className="p-3 font-bold text-stone-900">{ord.orderNumber}</td>
                        <td className="p-3 font-medium">{ord.customerName}</td>
                        <td className="p-3">
                          <a
                            href={`https://wa.me/${ord.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            className="text-emerald-700 hover:underline flex items-center gap-1"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>{ord.phone}</span>
                          </a>
                        </td>
                        <td className="p-3 max-w-xs truncate" title={ord.address}>
                          <span className="font-semibold block">{ord.city}</span>
                          <span className="text-stone-500 text-[11px]">{ord.address}</span>
                        </td>
                        <td className="p-3">
                          {ord.items.map(i => `${i.productName} (x${i.quantity})`).join(', ')}
                        </td>
                        <td className="p-3 font-bold text-stone-900 tabular-nums">
                          Rs. {ord.total.toLocaleString()}
                        </td>
                        <td className="p-3">
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                            className="text-xs p-1 rounded-md border border-stone-300 font-medium"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => {
                              if (confirm('Delete this order record?')) deleteOrder(ord.id);
                            }}
                            className="p-1 text-red-600 hover:text-red-800 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-stone-200">
              <h3 className="font-serif text-lg font-bold text-stone-900">Event Date Pre-Bookings</h3>
              <p className="text-xs text-stone-500">Customer pre-reservations for parties and wedding setups</p>
            </div>

            {bookings.length === 0 ? (
              <div className="p-12 text-center text-xs text-stone-500">
                No customer bookings recorded yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
                    <tr>
                      <th className="p-3">Customer Name</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Event Date</th>
                      <th className="p-3">Time Slot</th>
                      <th className="p-3">Event Type</th>
                      <th className="p-3">City</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-stone-50/50">
                        <td className="p-3 font-bold text-stone-900">{b.name}</td>
                        <td className="p-3">
                          <a
                            href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            className="text-emerald-700 hover:underline flex items-center gap-1"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>{b.phone}</span>
                          </a>
                        </td>
                        <td className="p-3 font-semibold text-amber-900">{b.date}</td>
                        <td className="p-3 font-medium text-stone-600">{b.timeSlot || 'Evening Slot'}</td>
                        <td className="p-3">{b.eventType}</td>
                        <td className="p-3">{b.city}</td>
                        <td className="p-3">
                          <select
                            value={b.status}
                            onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                            className="text-xs p-1 rounded-md border border-stone-300 font-medium"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => {
                              if (confirm('Delete this booking?')) deleteBooking(b.id);
                            }}
                            className="p-1 text-red-600 hover:text-red-800 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: TIMINGS (STORE & BOOKING TIME SLOTS) */}
        {activeTab === 'timings' && (
          <div className="space-y-6">
            
            {/* General Timings Form */}
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

              {/* Add New Slot Strip */}
              <div className="flex gap-2 max-w-md">
                <input
                  type="text"
                  value={newTimeSlot}
                  onChange={(e) => setNewTimeSlot(e.target.value)}
                  placeholder="e.g. Midnight Surprise Slot (11:30 PM - 01:00 AM)"
                  className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                />
                <button
                  onClick={handleAddTimeSlot}
                  className="px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Add Slot
                </button>
              </div>

              {/* Slots List */}
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

        {/* TAB 4: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs">
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                ➕ Add New Product to Storefront
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                Publish a new handmade candle, balloon arch, or party disposable pack.
              </p>

              <form onSubmit={handleCreateProduct} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="Product Title *"
                    required
                    className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                  />

                  <input
                    type="text"
                    value={newProdUrdu}
                    onChange={(e) => setNewProdUrdu(e.target.value)}
                    placeholder="Urdu Title (optional)"
                    className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                  />

                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="number"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    placeholder="Price in PKR (e.g. 1850) *"
                    required
                    className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                  />

                  <input
                    type="number"
                    value={newProdOriginalPrice}
                    onChange={(e) => setNewProdOriginalPrice(e.target.value)}
                    placeholder="Original Price (optional)"
                    className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                  />

                  <input
                    type="text"
                    value={newProdImage}
                    onChange={(e) => setNewProdImage(e.target.value)}
                    placeholder="Image URL or Asset Path"
                    className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#2C241E] hover:bg-stone-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  🚀 Publish Product to Catalog
                </button>
              </form>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-stone-200">
                <h3 className="font-serif text-lg font-bold text-stone-900">Current Catalog ({products.length})</h3>
              </div>

              <div className="divide-y divide-stone-100">
                {products.map((p) => (
                  <div key={p.id} className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover bg-stone-100" />
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
                        className={`px-2.5 py-1 text-xs rounded-lg font-medium ${
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

        {/* TAB 5: TEAM MANAGEMENT */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs">
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                👥 Add New Team Profile Card
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                Add a director, manager, or styling specialist with direct phone & WhatsApp contact.
              </p>

              <form onSubmit={handleCreateTeamMember} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="Full Name (e.g. Tayyaba) *"
                    required
                    className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                  />

                  <input
                    type="text"
                    value={newMemberDesignation}
                    onChange={(e) => setNewMemberDesignation(e.target.value)}
                    placeholder="Designation (e.g. Creative Director) *"
                    required
                    className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="tel"
                    value={newMemberCall}
                    onChange={(e) => setNewMemberCall(e.target.value)}
                    placeholder="Call Phone (e.g. 0324-4787003)"
                    className="px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white"
                  />

                  <input
                    type="tel"
                    value={newMemberWA}
                    onChange={(e) => setNewMemberWA(e.target.value)}
                    placeholder="WhatsApp Phone (e.g. 923244787003)"
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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

                  <input
                    type="text"
                    value={newMediaSrc}
                    onChange={(e) => setNewMediaSrc(e.target.value)}
                    placeholder="Media Video/Image URL *"
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
