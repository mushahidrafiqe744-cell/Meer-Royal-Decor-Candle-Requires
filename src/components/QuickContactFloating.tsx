import React, { useState } from 'react';
import { MessageSquare, Phone, X, Sparkles, Send } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const QuickContactFloating: React.FC = () => {
  const { contacts, language } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [customQuery, setCustomQuery] = useState('');

  const quickQuestions = [
    'What scents are available today?',
    'Need custom birthday balloon decor in Lahore',
    'Do you deliver to Karachi / Islamabad?',
    'What are wholesale candle rates?'
  ];

  const handleSendWhatsApp = (textToSend?: string) => {
    const msg = textToSend || customQuery || `Hi ${contacts.ownerName}, I'm interested in your candles & party decor.`;
    const url = `https://wa.me/${contacts.whatsappPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setCustomQuery('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Quick Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-[#2C241E] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-sm">
                🕯️
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold">Meer Royal Decor Assistant</h4>
                <p className="text-[10px] text-amber-200/80">Online · Lahore Studio</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-white p-1"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#FAF8F5] space-y-3">
            <div className="bg-white p-3 rounded-xl border border-stone-200 text-xs text-stone-700 leading-relaxed">
              Assalam-o-Alaikum! 🌟 Welcome to <strong>Meer Royal Decor & Candle Requires</strong>. How can we help you today?
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                Quick Inquiries:
              </span>
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendWhatsApp(q)}
                  className="w-full text-left p-2 bg-white hover:bg-amber-50 text-[11px] text-stone-700 font-medium rounded-lg border border-stone-200 transition-colors"
                >
                  💬 {q}
                </button>
              ))}
            </div>

            {/* Custom input */}
            <div className="pt-2 flex gap-1.5">
              <input
                type="text"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendWhatsApp()}
                placeholder="Type your question..."
                className="flex-1 px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-900"
              />
              <button
                onClick={() => handleSendWhatsApp()}
                className="p-2 bg-[#25D366] text-white rounded-md hover:bg-[#1EBE5D] transition-colors"
                aria-label="Send via WhatsApp"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Footer Call Option */}
          <div className="p-2.5 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs">
            <span className="text-[11px] text-stone-500">Need urgent help?</span>
            <a
              href={`tel:${contacts.primaryPhone.replace(/[^0-9]/g, '')}`}
              className="text-amber-900 font-bold hover:underline flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              <span>Call: {contacts.primaryPhone}</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <div className="flex items-center gap-2">
        <a
          href={`tel:${contacts.primaryPhone.replace(/[^0-9]/g, '')}`}
          aria-label="Call owner directly"
          className="w-11 h-11 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-lg hover:bg-stone-800 transition-transform hover:scale-105"
        >
          <Phone className="w-4 h-4" />
        </a>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle WhatsApp chat"
          className="h-12 px-4 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs flex items-center gap-2 shadow-lg transition-transform hover:scale-105 cursor-pointer"
        >
          <MessageSquare className="w-5 h-5 fill-white" />
          <span className="hidden sm:inline">WhatsApp Us</span>
        </button>
      </div>
    </div>
  );
};
