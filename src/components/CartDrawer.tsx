import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, MessageSquare, Truck, ShieldCheck, CheckCircle2, Ticket } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal,
    createOrder,
    contacts,
    language
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'lahore-same-day' | 'standard-courier' | 'express-courier'>('lahore-same-day');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [completedOrderNumber, setCompletedOrderNumber] = useState<string | null>(null);

  if (!cartOpen) return null;

  // Delivery calculation
  const freeDeliveryThreshold = 3500;
  const baseDeliveryFee = deliveryMethod === 'lahore-same-day' ? 250 : deliveryMethod === 'express-courier' ? 450 : 300;
  const deliveryFee = cartTotal >= freeDeliveryThreshold ? 0 : baseDeliveryFee;
  const discountAmount = Math.round((cartTotal * discountPercent) / 100);
  const finalTotal = Math.max(0, cartTotal - discountAmount + deliveryFee);

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'ROYAL10') {
      setDiscountPercent(10);
      setCouponApplied(true);
    } else {
      alert('Invalid coupon code. Try "ROYAL10" for 10% off!');
    }
  };

  const handleWhatsAppCheckout = () => {
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      alert('Please fill in your Name, Phone/WhatsApp number, and Delivery Address!');
      return;
    }

    const itemsSummary = cart
      .map((item, idx) => `${idx + 1}. ${item.product.name} (Qty: ${item.quantity}${item.selectedScent ? ` · ${item.selectedScent}` : ''}) - Rs. ${(item.product.price * item.quantity).toLocaleString()}`)
      .join('\n');

    const message = `*👑 NEW ORDER - MEER ROYAL DECOR* 👑\n` +
      `----------------------------------------\n` +
      `*Customer Name:* ${customerName}\n` +
      `*Phone / WhatsApp:* ${phone}\n` +
      `*City:* ${city}\n` +
      `*Delivery Address:* ${address}\n` +
      `*Delivery Option:* ${deliveryMethod === 'lahore-same-day' ? 'Lahore Same-Day Express' : 'Pakistan Courier'}\n\n` +
      `*📦 ITEMS ORDERED:*\n${itemsSummary}\n\n` +
      `----------------------------------------\n` +
      `*Subtotal:* Rs. ${cartTotal.toLocaleString()}\n` +
      `*Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}\n` +
      (discountAmount > 0 ? `*Discount (10%):* -Rs. ${discountAmount.toLocaleString()}\n` : '') +
      `*💵 TOTAL AMOUNT:* Rs. ${finalTotal.toLocaleString()}\n` +
      (notes.trim() ? `*Special Notes:* ${notes}\n` : '') +
      `----------------------------------------\n` +
      `Please confirm my order dispatch! ✨`;

    // Also register order in system
    const placed = createOrder({
      customerName,
      phone,
      city,
      address,
      items: cart.map(i => ({
        productId: i.product.id,
        productName: i.product.name,
        price: i.product.price,
        quantity: i.quantity
      })),
      subtotal: cartTotal,
      deliveryFee,
      discount: discountAmount,
      total: finalTotal,
      deliveryMethod,
      paymentMethod: 'whatsapp',
      notes
    });

    const url = `https://wa.me/${contacts.whatsappPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setCompletedOrderNumber(placed.orderNumber);
  };

  const handleCODCheckout = () => {
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      alert('Please fill in your Name, Phone/WhatsApp number, and Delivery Address!');
      return;
    }

    const placed = createOrder({
      customerName,
      phone,
      city,
      address,
      items: cart.map(i => ({
        productId: i.product.id,
        productName: i.product.name,
        price: i.product.price,
        quantity: i.quantity
      })),
      subtotal: cartTotal,
      deliveryFee,
      discount: discountAmount,
      total: finalTotal,
      deliveryMethod,
      paymentMethod: 'cod',
      notes
    });

    setCompletedOrderNumber(placed.orderNumber);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-900" />
              <h2 className="font-serif text-lg font-bold text-stone-900">
                {language === 'ur' ? 'آپ کا شاپنگ بیگ' : 'Your Shopping Bag'}
              </h2>
              <span className="text-xs text-stone-500 font-medium tabular-nums">
                ({cart.length} {cart.length === 1 ? 'item' : 'items'})
              </span>
            </div>

            <button
              onClick={() => setCartOpen(false)}
              aria-label="Close cart"
              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success Screen if Order Placed */}
          {completedOrderNumber ? (
            <div className="p-8 text-center space-y-4 my-auto">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">Order Confirmed!</h3>
              <p className="text-xs text-stone-600">
                Thank you, <strong className="text-stone-900">{customerName}</strong>! Your order reference is{' '}
                <strong className="text-amber-900">{completedOrderNumber}</strong>.
              </p>
              <div className="p-4 bg-stone-50 rounded-xl text-left text-xs space-y-1.5 border border-stone-200">
                <div><strong>Delivery City:</strong> {city}</div>
                <div><strong>Address:</strong> {address}</div>
                <div><strong>Total Payable:</strong> Rs. {finalTotal.toLocaleString()} (Cash on Delivery)</div>
                <div className="text-stone-500 pt-1">Our team will call / WhatsApp you on {phone} for immediate dispatch.</div>
              </div>
              <button
                onClick={() => {
                  setCompletedOrderNumber(null);
                  setCartOpen(false);
                }}
                className="w-full py-3 bg-[#2C241E] text-white text-xs font-semibold rounded-md hover:bg-stone-900 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : cart.length === 0 ? (
            /* Empty State */
            <div className="p-12 text-center my-auto space-y-3">
              <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto stroke-1" />
              <h3 className="font-serif text-lg font-bold text-stone-800">Your bag is empty</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our scented jar candles, balloon arches, and theme party disposables to fill your cart.
              </p>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-2 px-5 py-2.5 bg-[#2C241E] text-white text-xs font-medium rounded-md hover:bg-stone-900 transition-colors"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            /* Cart Content & Checkout Form */
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* Itemized Cart List */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedScent || ''}`}
                    className="flex gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200/80 items-center"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover bg-stone-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-bold text-stone-900 truncate">
                        {item.product.name}
                      </h4>
                      {item.selectedScent && (
                        <span className="text-[11px] text-amber-900 font-medium block">
                          Scent: {item.selectedScent}
                        </span>
                      )}
                      <div className="text-xs font-bold text-stone-900 mt-1 tabular-nums">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded bg-white border border-stone-300 text-stone-700 text-xs font-bold flex items-center justify-center hover:bg-stone-100"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-white border border-stone-300 text-stone-700 text-xs font-bold flex items-center justify-center hover:bg-stone-100"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 text-red-500 hover:text-red-700 ml-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code Strip */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Ticket className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code (e.g. ROYAL10)"
                    disabled={couponApplied}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-md uppercase"
                  />
                </div>
                <button
                  onClick={applyCoupon}
                  disabled={couponApplied || !couponCode.trim()}
                  className="px-3 py-1.5 bg-stone-800 text-white text-xs font-medium rounded-md hover:bg-stone-900 disabled:opacity-50"
                >
                  {couponApplied ? 'Applied ✓' : 'Apply'}
                </button>
              </div>

              {/* Delivery Details Form */}
              <div className="border-t border-stone-200 pt-4 space-y-3">
                <h3 className="text-xs uppercase tracking-wider font-bold text-stone-800 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-amber-900" />
                  <span>Delivery Address & Info</span>
                </h3>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full Name *"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-amber-900 focus:outline-none"
                    required
                  />

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="WhatsApp / Mobile Number (e.g. 03244787003) *"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-amber-900 focus:outline-none"
                    required
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        if (e.target.value.toLowerCase() === 'lahore') {
                          setDeliveryMethod('lahore-same-day');
                        } else {
                          setDeliveryMethod('standard-courier');
                        }
                      }}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-amber-900 focus:outline-none"
                    >
                      <option value="Lahore">Lahore (Same-Day)</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Islamabad">Islamabad / Rawalpindi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="Gujranwala">Gujranwala</option>
                      <option value="Other">Other Pakistan City</option>
                    </select>

                    <select
                      value={deliveryMethod}
                      onChange={(e) => setDeliveryMethod(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-amber-900 focus:outline-none"
                    >
                      <option value="lahore-same-day">Lahore Express (Rs. 250)</option>
                      <option value="standard-courier">Standard Courier (Rs. 300)</option>
                      <option value="express-courier">Urgent Air Courier (Rs. 450)</option>
                    </select>
                  </div>

                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Complete Street Address / House / Flat No. / Area *"
                    rows={2}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-amber-900 focus:outline-none"
                    required
                  />

                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Gift Message / Special Delivery Instructions"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-md focus:ring-1 focus:ring-amber-900 focus:outline-none text-stone-600"
                  />
                </div>
              </div>

              {/* Order Calculation Summary */}
              <div className="bg-[#F9F7F4] p-4 rounded-xl space-y-2 text-xs border border-stone-200">
                <div className="flex justify-between text-stone-600">
                  <span>Items Subtotal:</span>
                  <span className="font-semibold text-stone-900 tabular-nums">Rs. {cartTotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-stone-600">
                  <span>Delivery Fee:</span>
                  <span className="font-semibold text-stone-900 tabular-nums">
                    {deliveryFee === 0 ? <span className="text-emerald-700">FREE</span> : `Rs. ${deliveryFee}`}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({discountPercent}%):</span>
                    <span className="tabular-nums">-Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}

                {cartTotal < freeDeliveryThreshold && (
                  <div className="text-[11px] text-amber-900 bg-amber-50 px-2.5 py-1 rounded border border-amber-200/60">
                    Add Rs. {(freeDeliveryThreshold - cartTotal).toLocaleString()} more for <strong>FREE Delivery</strong>!
                  </div>
                )}

                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline font-bold text-stone-900 text-sm">
                  <span>Grand Total:</span>
                  <span className="font-serif text-lg text-amber-950 tabular-nums">
                    Rs. {finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* Bottom Action Footer */}
          {!completedOrderNumber && cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-stone-200 bg-white space-y-2">
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-md transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Confirm & Send Order via WhatsApp</span>
              </button>

              <button
                onClick={handleCODCheckout}
                className="w-full py-2.5 bg-[#2C241E] hover:bg-stone-900 text-white text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Truck className="w-4 h-4 text-amber-200" />
                <span>Place Cash on Delivery (COD) Order</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
