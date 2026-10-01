import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { CategoryStoriesBar } from './components/CategoryStoriesBar';
import { Hero } from './components/Hero';
import { StatsCounterSection } from './components/StatsCounterSection';
import { ProductCatalog } from './components/ProductCatalog';
import { MediaShowcase } from './components/MediaShowcase';
import { VideoAdSection } from './components/VideoAdSection';
import { StoryCraftSection } from './components/StoryCraftSection';
import { PartyDecorSection } from './components/PartyDecorSection';
import { TeamSection } from './components/TeamSection';
import { BookingFormSection } from './components/BookingFormSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { DeliveryTrustSection } from './components/DeliveryTrustSection';
import { AdminPortal } from './components/AdminPortal';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { QuickContactFloating } from './components/QuickContactFloating';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { currentView } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {currentView === 'admin' ? (
          <AdminPortal />
        ) : (
          <>
            <CategoryStoriesBar />
            <Hero />
            <StatsCounterSection />
            <ProductCatalog />
            <MediaShowcase />
            <VideoAdSection />
            <StoryCraftSection />
            <PartyDecorSection />
            <TeamSection />
            <BookingFormSection />
            <TestimonialsSection />
            <DeliveryTrustSection />
          </>
        )}
      </main>

      <Footer />

      {/* Global Modals & Overlay Portals */}
      <ProductModal />
      <CartDrawer />
      <QuickContactFloating />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
