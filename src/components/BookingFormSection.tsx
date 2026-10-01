import React, { useState } from 'react';
import { Truck, Calendar, MessageSquare, Save, Lock, Trash2, CheckCircle2, User, Phone, MapPin, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const BookingFormSection: React.FC = () => {
  const { bookings, addBooking, deleteBooking, contacts, storeTimings, language } = useStore();

  // Delivery Form State
  const [waName, setWaName] = useState('');
  const [waPhone, setWaPhone] = useState('');
  const [waCity, setWaCity] = useState('');
  const [waAddress, setWaAddress] = useState('');
  const [waOrderDetails, setWaOrderDetails] = useState('');

  // Pre-Booking State
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custDate, setCustDate] = useState('');
  const [custTimeSlot, setCustTimeSlot] = useState(storeTimings.timeSlots[0] || 'Evening Slot (04:00 PM - 08:00 PM)');
  const [showDbBox, setShowDbBox] = useState(false);

  // Send Delivery Details to WhatsApp
  const handleSendDetailsToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waName.trim() || !waPhone.trim() || !waCity.trim() || !waAddress.trim() || !waOrderDetails.trim()) {
      alert('⚠️ براہ کرم ڈیلیوری فارم کے تمام خانے لازمی پُر کریں!');
      return;
    }

    const message = `*🚨 NEW ORDER DETAILS - CANDLE REQUIRES* 🚨\n\n` +
      `*👤 Customer Name:* ${waName}\n` +
      `*📞 Contact Number:* ${waPhone}\n` +
      `*🏙️ City:* ${waCity}\n` +
      `*📍 Delivery Address:* ${waAddress}\n\n` +
      `*📦 Order Details & Quantity:* \n${waOrderDetails}\n\n` +
      `*⏰ Delivery Timings:* ${storeTimings.openingTime} - ${storeTimings.closingTime} (Cutoff: ${storeTimings.sameDayCutoff})`;

    const whatsappUrl = `https://wa.me/${contacts.whatsappPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Save Customer Booking locally
  const handleSaveCustomerData = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName.trim() || !custPhone.trim() || !custDate) {
      alert('⚠️ براہ کرم فارم کے تمام خانے پُر کریں اور تاریخ لازمی منتخب کریں!');
      return;
    }

    addBooking({
      name: custName,
      phone: custPhone,
      date: custDate,
      timeSlot: custTimeSlot,
      eventType: 'Pre-Booking Event Slot',
      city: 'Lahore'
    });

    setCustName('');
    setCustPhone('');
    setCustDate('');
    alert('✅ شکریہ! آپ کا ڈیٹا اور وقت کی سلاٹ کامیابی کے ساتھ رجسٹر ہو گئی ہے۔');
  };

  // Toggle Database view with password MUSHAHID
  const handleToggleCustomerDatabase = () => {
    if (showDbBox) {
      setShowDbBox(false);
    } else {
      const p = prompt('🔐 ڈیٹا بیس دیکھنے کے لیے اونر پاسورڈ (Password) درج کریں:');
      if (p === 'MUSHAHID' || p === 'KING') {
        setShowDbBox(true);
      } else {
        alert('❌ غلط پاسورڈ! آپ کو ڈیٹا تک رسائی نہیں مل سکتی۔ (Use "MUSHAHID")');
      }
    }
  };

  // Delete customer with password KING
  const handleDeleteCustomer = (id: string) => {
    const p = prompt('🔐 ڈیٹا حذف کرنے کے لیے اونر پاسورڈ (Password) درج کریں:');
    if (p === 'KING' || p === 'MUSHAHID') {
      deleteBooking(id);
      alert('✅ کسٹمر کا ڈیٹا کامیابی سے ڈیلیٹ ہو گیا ہے۔');
    } else {
      alert('❌ غلط پاسورڈ! آپ ڈیٹا حذف نہیں کر سکتے۔ (Use "KING")');
    }
  };

  return (
    <section id="forms-section" className="py-16 bg-[#F5EFEB] border-t border-[#E6DCCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-1 flex items-center justify-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-800" />
            <span>Store Dispatch Hours: {storeTimings.openingTime} – {storeTimings.closingTime} (Same-Day Cutoff: {storeTimings.sameDayCutoff})</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            {language === 'ur' ? 'آرڈر و پری بکنگ فارم' : 'Order & Pre-Booking Registration'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            براہ راست واٹس ایپ پر آرڈر بھیجیں یا اپنی آنے والی تقریب کا وقت اور تاریخ محفوظ کریں۔
          </p>
        </div>

        {/* Inline Two Forms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Form 1: Delivery Details */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-md flex flex-col justify-between">
            <div>
              <div className="border-b border-stone-100 pb-4 mb-4">
                <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-amber-900" />
                  <span>🚚 Delivery Details (ڈیلیوری فارم)</span>
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  اپنی ڈیلیوری کی تفصیلات لکھ کر ڈائریکٹ واٹس ایپ پر آرڈر کنفرم کریں۔
                </p>
              </div>

              <form onSubmit={handleSendDetailsToWhatsApp} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    پورا نام (Full Name) *
                  </label>
                  <input
                    type="text"
                    value={waName}
                    onChange={(e) => setWaName(e.target.value)}
                    placeholder="اپنا نام درج کریں..."
                    required
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-1 focus:ring-amber-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    رابطہ نمبر (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    value={waPhone}
                    onChange={(e) => setWaPhone(e.target.value)}
                    placeholder="مثال: 03290725117"
                    required
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-1 focus:ring-amber-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    شہر کا نام (City) *
                  </label>
                  <input
                    type="text"
                    value={waCity}
                    onChange={(e) => setWaCity(e.target.value)}
                    placeholder="مثال: Lahore, Karachi, Islamabad"
                    required
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-1 focus:ring-amber-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    ڈیلیوری کا مکمل پتہ (Address) *
                  </label>
                  <textarea
                    value={waAddress}
                    onChange={(e) => setWaAddress(e.target.value)}
                    placeholder="مکان نمبر، گلی نمبر، علاقے کا نام لکھیں..."
                    rows={2}
                    required
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-1 focus:ring-amber-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    آرڈر کی تفصیلات (Order Details) *
                  </label>
                  <textarea
                    value={waOrderDetails}
                    onChange={(e) => setWaOrderDetails(e.target.value)}
                    placeholder="آپ کو کیا سامان چاہیے؟ (مثال: 3 Scented Candles + Birthday Balloon Arch)"
                    rows={2}
                    required
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-1 focus:ring-amber-900 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>🚀 Send Details / Order via WhatsApp</span>
                </button>
              </form>
            </div>
          </div>

          {/* Form 2: Pre-Booking & Customer Registration */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-md flex flex-col justify-between">
            <div>
              <div className="border-b border-stone-100 pb-4 mb-4">
                <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-900" />
                  <span>📋 Pre-Booking / Registration</span>
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  اپنے آنے والے فنکشن یا آرڈر کی تاریخ اور وقت (Slot) رجسٹر کریں تاکہ سلاٹ بک رہے۔
                </p>
              </div>

              <form onSubmit={handleSaveCustomerData} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    پورا نام (Full Name) *
                  </label>
                  <input
                    type="text"
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    placeholder="اپنا نام لکھیں..."
                    required
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-1 focus:ring-amber-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    واٹس ایپ یا فون نمبر *
                  </label>
                  <input
                    type="tel"
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    placeholder="مثال: 03290725117"
                    required
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-1 focus:ring-amber-900 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      فنکشن کی تاریخ (Date) *
                    </label>
                    <input
                      type="date"
                      value={custDate}
                      onChange={(e) => setCustDate(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-1 focus:ring-amber-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      وقت کی سلاٹ (Event Time Slot) *
                    </label>
                    <select
                      value={custTimeSlot}
                      onChange={(e) => setCustTimeSlot(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:ring-1 focus:ring-amber-900 focus:outline-none"
                    >
                      {storeTimings.timeSlots.map((slot, i) => (
                        <option key={i} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#2C241E] hover:bg-stone-900 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4 text-amber-200" />
                  <span>💾 ویب سائٹ پر محفوظ کریں (Save Registration)</span>
                </button>
              </form>

              <div className="pt-6 border-t border-stone-100 mt-6">
                <button
                  onClick={handleToggleCustomerDatabase}
                  className="w-full py-2.5 bg-stone-700 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-amber-300" />
                  <span>🔒 View Saved Database (Owner Password: MUSHAHID)</span>
                </button>

                {/* Database Table Display */}
                {showDbBox && (
                  <div className="mt-4 p-4 bg-stone-50 rounded-2xl border border-stone-300 space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-sm font-bold text-stone-900">
                        📋 رجسٹرڈ کسٹمرز ڈیٹا بیس ({bookings.length})
                      </h4>
                      <span className="text-[10px] text-stone-500 font-mono">Delete PIN: KING</span>
                    </div>

                    {bookings.length === 0 ? (
                      <p className="text-xs text-stone-500 text-center py-4">کوئی ڈیٹا موجود نہیں ہے</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-stone-700">
                          <thead className="bg-stone-200/70 font-semibold">
                            <tr>
                              <th className="p-2">نام</th>
                              <th className="p-2">فون نمبر</th>
                              <th className="p-2">تاریخ و وقت</th>
                              <th className="p-2">ایکشن</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-200">
                            {bookings.map((c) => (
                              <tr key={c.id}>
                                <td className="p-2 font-medium">{c.name}</td>
                                <td className="p-2">
                                  <a
                                    href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    className="text-emerald-700 hover:underline"
                                  >
                                    {c.phone}
                                  </a>
                                </td>
                                <td className="p-2 font-semibold text-amber-900">
                                  <div>{c.date}</div>
                                  <div className="text-[10px] text-stone-500 font-normal">{c.timeSlot || 'Evening Slot'}</div>
                                </td>
                                <td className="p-2">
                                  <button
                                    onClick={() => handleDeleteCustomer(c.id)}
                                    className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded cursor-pointer"
                                  >
                                    حذف کریں
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
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
