import React, { useState } from 'react';
import {
  X,
  Trash2,
  ArrowRight,
  Send,
  MessageCircle,
  Truck,
  CheckCircle2,
  AlertCircle,
  Tag,
} from 'lucide-react';
import {
  CartItem,
  DeliveryDetails,
  calculateSubtotal,
  calculateShipping,
  calculateTotal,
  formatPrice,
  validateOrderForm,
  generateTelegramOrderMessage,
  generateTelegramShareLink,
  generateWhatsAppShareLink,
  FREE_SHIPPING_THRESHOLD,
} from '../utils/cart.ts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOrderSuccess: (orderData: {
    orderNumber: string;
    total: number;
    items: CartItem[];
    delivery: DeliveryDetails;
  }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const [delivery, setDelivery] = useState<DeliveryDetails>({
    name: '',
    contact: '',
    city: '',
    deliveryMethod: 'cdek_pvz',
    address: '',
    comment: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = calculateSubtotal(items);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const shippingCost = calculateShipping(subtotal - discountAmount, delivery.deliveryMethod);
  const total = calculateTotal(subtotal, shippingCost, discountAmount);

  const progressToFreeShipping = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'REELS' || clean === 'REELS10') {
      setDiscountPercent(10);
      setPromoMessage({ text: 'Промокод применен: скидка 10% на заказ!', isError: false });
    } else {
      setPromoMessage({ text: 'Неверный промокод. Попробуйте REELS10', isError: true });
    }
  };

  const handleProcessOrder = (channel: 'site' | 'telegram' | 'whatsapp') => {
    const { valid, errors } = validateOrderForm(delivery);
    if (!valid) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    const orderNumber = `KF-${Math.floor(1000 + Math.random() * 9000)}`;

    if (channel === 'telegram') {
      const msg = generateTelegramOrderMessage(items, total, delivery, orderNumber);
      const url = generateTelegramShareLink(msg);
      window.open(url, '_blank');
      onOrderSuccess({ orderNumber, total, items, delivery });
      onClearCart();
      return;
    }

    if (channel === 'whatsapp') {
      const msg = generateTelegramOrderMessage(items, total, delivery, orderNumber);
      const url = generateWhatsAppShareLink(msg);
      window.open(url, '_blank');
      onOrderSuccess({ orderNumber, total, items, delivery });
      onClearCart();
      return;
    }

    // Direct on-site submission
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOrderSuccess({ orderNumber, total, items, delivery });
      onClearCart();
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-lg h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#E8E2D8] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div>
            <h2 id="cart-title" className="text-lg font-bold text-[#1E1E1E]">
              Корзина мастерской
            </h2>
            <span className="text-xs text-[#7A7469]">
              {items.length === 0
                ? 'Пусто'
                : `${items.reduce((acc, i) => acc + i.quantity, 0)} шт. на сумму ${formatPrice(subtotal)}`}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Закрыть корзину"
            className="p-2 text-[#7A7469] hover:text-[#1E1E1E] hover:bg-[#F4EFEA] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-4 sm:p-6 pb-8 space-y-6 overflow-y-auto">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#F4EFEA] text-[#7A7469] flex items-center justify-center mx-auto">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-[#1E1E1E]">Корзина пока пуста</h3>
              <p className="text-xs text-[#7A7469] max-w-xs mx-auto">
                Перейдите в коллекцию и выберите тактильный предмет для дома или в подарок.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-[#2C2B29] text-white text-xs font-semibold rounded-md shadow-xs hover:bg-[#1E1E1E] transition-colors"
              >
                К каталогу товаров
              </button>
            </div>
          ) : (
            <>
              {/* Free Shipping Meter */}
              <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E8E2D8] space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B655B] flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#8A6345]" />
                    {remainingForFreeShipping === 0 ? (
                      <strong className="text-emerald-700">Бесплатная доставка СДЭК активна!</strong>
                    ) : (
                      <span>
                        До бесплатной доставки: <strong>{formatPrice(remainingForFreeShipping)}</strong>
                      </span>
                    )}
                  </span>
                  <span className="text-[11px] font-mono text-[#7A7469]">
                    {progressToFreeShipping}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#E8E2D8] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8A6345] rounded-full transition-all duration-300"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3 divide-y divide-[#F0EBE3]">
                {items.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md bg-[#F4EFEA] shrink-0 border border-[#E8E2D8]"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-[#1E1E1E] truncate">
                        {item.name}
                      </h4>
                      <span className="text-[11px] text-[#7A7469] block">
                        {item.material}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#1E1E1E] tabular-nums">
                        {formatPrice(item.price)}
                      </span>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-[#D5CFC5] rounded-md overflow-hidden bg-white shrink-0">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs hover:bg-[#F4EFEA]"
                        aria-label="Уменьшить"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-mono font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs hover:bg-[#F4EFEA]"
                        aria-label="Увеличить"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-[#9E9689] hover:text-rose-600 transition-colors"
                      aria-label={`Удалить ${item.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5 pt-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#9E9689]" />
                    <input
                      type="text"
                      placeholder="Промокод (попробуйте REELS10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs border border-[#D5CFC5] rounded-md bg-[#FAF8F5] focus:bg-white focus:outline-hidden focus:border-[#2C2B29]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#2C2B29] text-white text-xs font-semibold rounded-md hover:bg-black transition-colors"
                  >
                    Применить
                  </button>
                </div>
                {promoMessage && (
                  <span
                    className={`text-[11px] block ${
                      promoMessage.isError ? 'text-rose-600' : 'text-emerald-700'
                    }`}
                  >
                    {promoMessage.text}
                  </span>
                )}
              </form>

              {/* Delivery Details Form */}
              <div className="pt-4 border-t border-[#E8E2D8] space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#7C756B]">
                  Данные для отправки:
                </h3>

                {/* Delivery Method Selection */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDelivery({ ...delivery, deliveryMethod: 'cdek_pvz' })}
                    className={`p-2 text-left rounded-md border text-xs transition-all ${
                      delivery.deliveryMethod === 'cdek_pvz'
                        ? 'border-[#2C2B29] bg-[#FAF8F5] font-semibold text-[#1E1E1E] shadow-2xs'
                        : 'border-[#E8E2D8] text-[#6B655B] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span className="block font-medium">СДЭК ПВЗ</span>
                    <span className="text-[10px] text-[#7A7469]">до пункта</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDelivery({ ...delivery, deliveryMethod: 'courier' })}
                    className={`p-2 text-left rounded-md border text-xs transition-all ${
                      delivery.deliveryMethod === 'courier'
                        ? 'border-[#2C2B29] bg-[#FAF8F5] font-semibold text-[#1E1E1E] shadow-2xs'
                        : 'border-[#E8E2D8] text-[#6B655B] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span className="block font-medium">Курьер</span>
                    <span className="text-[10px] text-[#7A7469]">до двери</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDelivery({ ...delivery, deliveryMethod: 'pickup' })}
                    className={`p-2 text-left rounded-md border text-xs transition-all ${
                      delivery.deliveryMethod === 'pickup'
                        ? 'border-[#2C2B29] bg-[#FAF8F5] font-semibold text-[#1E1E1E] shadow-2xs'
                        : 'border-[#E8E2D8] text-[#6B655B] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span className="block font-medium">Самовывоз</span>
                    <span className="text-[10px] text-[#7A7469]">мастерская</span>
                  </button>
                </div>

                {/* Inputs */}
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="block text-[#6B655B] mb-0.5">Имя и фамилия *</label>
                    <input
                      type="text"
                      placeholder="Иван Казаков"
                      value={delivery.name}
                      onChange={(e) => setDelivery({ ...delivery, name: e.target.value })}
                      className="w-full px-3 py-2 border border-[#D5CFC5] rounded-md bg-[#FAF8F5] focus:bg-white focus:outline-hidden focus:border-[#2C2B29]"
                    />
                    {formErrors.name && (
                      <span className="text-[11px] text-rose-600 mt-0.5 block">
                        {formErrors.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#6B655B] mb-0.5">
                      Телефон или @Telegram для связи *
                    </label>
                    <input
                      type="text"
                      placeholder="+7 (999) 000-00-00 или @username"
                      value={delivery.contact}
                      onChange={(e) => setDelivery({ ...delivery, contact: e.target.value })}
                      className="w-full px-3 py-2 border border-[#D5CFC5] rounded-md bg-[#FAF8F5] focus:bg-white focus:outline-hidden focus:border-[#2C2B29]"
                    />
                    {formErrors.contact && (
                      <span className="text-[11px] text-rose-600 mt-0.5 block">
                        {formErrors.contact}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[#6B655B] mb-0.5">Город *</label>
                      <input
                        type="text"
                        placeholder="Москва"
                        value={delivery.city}
                        onChange={(e) => setDelivery({ ...delivery, city: e.target.value })}
                        className="w-full px-3 py-2 border border-[#D5CFC5] rounded-md bg-[#FAF8F5] focus:bg-white focus:outline-hidden focus:border-[#2C2B29]"
                      />
                      {formErrors.city && (
                        <span className="text-[11px] text-rose-600 mt-0.5 block">
                          {formErrors.city}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-[#6B655B] mb-0.5">
                        {delivery.deliveryMethod === 'cdek_pvz' ? 'Адрес ПВЗ *' : 'Улица, дом, кв *'}
                      </label>
                      <input
                        type="text"
                        placeholder={
                          delivery.deliveryMethod === 'cdek_pvz'
                            ? 'ул. Ленина 24'
                            : 'ул. Тверская 12, кв 45'
                        }
                        value={delivery.address}
                        onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
                        className="w-full px-3 py-2 border border-[#D5CFC5] rounded-md bg-[#FAF8F5] focus:bg-white focus:outline-hidden focus:border-[#2C2B29]"
                      />
                      {formErrors.address && (
                        <span className="text-[11px] text-rose-600 mt-0.5 block">
                          {formErrors.address}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#6B655B] mb-0.5">
                      Пожелания / Гравировка (по желанию)
                    </label>
                    <input
                      type="text"
                      placeholder="Например: в подарочной крафт-коробке"
                      value={delivery.comment}
                      onChange={(e) => setDelivery({ ...delivery, comment: e.target.value })}
                      className="w-full px-3 py-2 border border-[#D5CFC5] rounded-md bg-[#FAF8F5] focus:bg-white focus:outline-hidden focus:border-[#2C2B29]"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Totals & Checkout Buttons */}
        {items.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-[#E8E2D8] bg-[#FAF8F5] sticky bottom-0 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#6B655B]">
                <span>Товары ({items.reduce((acc, i) => acc + i.quantity, 0)} шт.):</span>
                <span className="font-mono tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Скидка по промокоду ({discountPercent}%):</span>
                  <span className="font-mono tabular-nums">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#6B655B]">
                <span>Доставка ({delivery.deliveryMethod === 'pickup' ? 'Самовывоз' : 'СДЭК'}):</span>
                <span className="font-mono tabular-nums">
                  {shippingCost === 0 ? 'Бесплатно' : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#1E1E1E] pt-2 border-t border-[#E8E2D8]">
                <span>Итого к оплате:</span>
                <span className="font-mono tabular-nums">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Direct ordering buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => handleProcessOrder('telegram')}
                className="w-full py-3 px-4 bg-[#2AABEE] hover:bg-[#229ED9] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Быстро заказать в Telegram (без ожидания)</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleProcessOrder('site')}
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-3 bg-[#2C2B29] hover:bg-[#1E1E1E] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSubmitting ? 'Оформляем...' : 'Оформить на сайте'}</span>
                </button>

                <button
                  onClick={() => handleProcessOrder('whatsapp')}
                  className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>В WhatsApp</span>
                </button>
              </div>
            </div>

            <p className="text-[10px] text-center text-[#8C8476]">
              Оплата после подтверждения наличия или при получении СДЭК.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
