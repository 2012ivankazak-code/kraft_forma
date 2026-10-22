/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { ReelsShowcase } from './components/ReelsShowcase.tsx';
import { ProductGrid } from './components/ProductGrid.tsx';
import { MaterialsSection } from './components/MaterialsSection.tsx';
import { FAQSection } from './components/FAQSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { QuickOrderModal } from './components/QuickOrderModal.tsx';
import { ReelsGuideModal } from './components/ReelsGuideModal.tsx';
import { OrderSuccessModal } from './components/OrderSuccessModal.tsx';
import { PRODUCTS, Product } from './data/products.ts';
import { CartItem, DeliveryDetails } from './utils/cart.ts';
import { Check, ShoppingBag } from 'lucide-react';

const STORAGE_KEY = 'kraft_forma_cart_items_v1';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback to empty
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickBuyProduct, setQuickBuyProduct] = useState<Product | null>(null);
  const [isReelsGuideOpen, setIsReelsGuideOpen] = useState(false);
  const [successOrderData, setSuccessOrderData] = useState<{
    orderNumber: string;
    total: number;
    items: CartItem[];
    delivery: DeliveryDetails;
  } | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
          material: product.materialCategory,
          image: product.image,
        },
      ];
    });

    showToast(`«${product.name}» добавлен в корзину`);
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToReels = () => {
    document.getElementById('reels')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E1E1E] flex flex-col font-sans">
      {/* Top Banner (Slim, subtle, dismissible craft note) */}
      <div className="bg-[#2C2B29] text-[#FAF8F5] text-xs py-2 px-4 text-center font-medium tracking-wide">
        <span>Мастерская KRAFT & FORMA · Бесплатная доставка СДЭК по РФ при заказе от 5 000 руб.</span>
      </div>

      {/* Main Navigation Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReelsGuide={() => setIsReelsGuideOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onScrollToCatalog={scrollToCatalog} onScrollToReels={scrollToReels} />

        {/* Interactive Reels & Shorts Feature (Direct conversion from video traffic) */}
        <ReelsShowcase
          products={PRODUCTS}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onOpenReelsGuide={() => setIsReelsGuideOpen(true)}
        />

        {/* Curated Product Capsule Catalog */}
        <ProductGrid
          products={PRODUCTS}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onQuickBuy={(p) => setQuickBuyProduct(p)}
        />

        {/* Story of 3 Materials: Oak, Concrete, Steel */}
        <MaterialsSection />

        {/* Delivery & Care FAQ */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer onOpenReelsGuide={() => setIsReelsGuideOpen(true)} />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
        onQuickBuy={(p) => {
          setSelectedProduct(null);
          setQuickBuyProduct(p);
        }}
      />

      {/* Quick 1-Click Order Modal */}
      <QuickOrderModal
        product={quickBuyProduct}
        onClose={() => setQuickBuyProduct(null)}
        onOrderSuccess={(orderData) => setSuccessOrderData(orderData)}
      />

      {/* Slide-out Cart Drawer with Multi-channel checkout */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderSuccess={(orderData) => {
          setIsCartOpen(false);
          setSuccessOrderData(orderData);
        }}
      />

      {/* Reels Creator Guide Modal */}
      <ReelsGuideModal
        isOpen={isReelsGuideOpen}
        onClose={() => setIsReelsGuideOpen(false)}
      />

      {/* Order Success Confirmation Modal */}
      <OrderSuccessModal
        orderData={successOrderData}
        onClose={() => setSuccessOrderData(null)}
      />

      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#1E1E1E] text-white px-4 py-3 rounded-lg shadow-xl border border-[#33312E] text-xs flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-200">
          <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span className="font-medium">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-[#E8D0B3] hover:underline font-semibold flex items-center gap-1 shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>В корзину</span>
          </button>
        </div>
      )}
    </div>
  );
}
