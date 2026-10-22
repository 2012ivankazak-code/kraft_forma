/**
 * Pure cart and order calculations for KRAFT & FORMA
 */

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  material: string;
  image: string;
  variant?: string;
}

export interface DeliveryDetails {
  name: string;
  contact: string; // phone or @telegram
  city: string;
  deliveryMethod: 'cdek_pvz' | 'courier' | 'pickup';
  address?: string;
  comment?: string;
}

export const FREE_SHIPPING_THRESHOLD = 5000;
export const STANDARD_SHIPPING_COST = 390;

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * Math.max(0, item.quantity), 0);
}

export function calculateShipping(subtotal: number, deliveryMethod: DeliveryDetails['deliveryMethod']): number {
  if (deliveryMethod === 'pickup') return 0;
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return STANDARD_SHIPPING_COST;
}

export function calculateTotal(subtotal: number, shippingCost: number, discountAmount = 0): number {
  return Math.max(0, subtotal + shippingCost - discountAmount);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
}

export function validateOrderForm(form: Partial<DeliveryDetails>): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!form.name || form.name.trim().length < 2) {
    errors.name = 'Пожалуйста, укажите ваше имя';
  }

  if (!form.contact || form.contact.trim().length < 4) {
    errors.contact = 'Укажите номер телефона или @telegram для подтверждения';
  }

  if (!form.city || form.city.trim().length < 2) {
    errors.city = 'Укажите город доставки';
  }

  if (form.deliveryMethod !== 'pickup' && (!form.address || form.address.trim().length < 3)) {
    errors.address = form.deliveryMethod === 'cdek_pvz' 
      ? 'Укажите адрес удобного ПВЗ СДЭК' 
      : 'Укажите точный адрес для курьера';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateTelegramOrderMessage(items: CartItem[], total: number, delivery: DeliveryDetails, orderNumber: string): string {
  const itemsList = items
    .map((item, idx) => `${idx + 1}. ${item.name} (${item.material}) — ${item.quantity} шт. × ${formatPrice(item.price)}`)
    .join('\n');

  const deliveryMethodText = {
    cdek_pvz: 'СДЭК (до пункта выдачи)',
    courier: 'Курьерская доставка до двери',
    pickup: 'Самовывоз из мастерской',
  }[delivery.deliveryMethod];

  return `🌿 Заказ #${orderNumber} с сайта KRAFT & FORMA\n\n` +
    `Позиции:\n${itemsList}\n\n` +
    `Итого к оплате: ${formatPrice(total)}\n\n` +
    `Клиент: ${delivery.name}\n` +
    `Связь: ${delivery.contact}\n` +
    `Город: ${delivery.city}\n` +
    `Способ доставки: ${deliveryMethodText}\n` +
    (delivery.address ? `Адрес: ${delivery.address}\n` : '') +
    (delivery.comment ? `Пожелания / Гравировка: ${delivery.comment}\n` : '');
}

export function generateTelegramShareLink(message: string, telegramUsername = 'kraft_forma_workshop'): string {
  // Can link to direct chat or telegram share
  return `https://t.me/${telegramUsername}?text=${encodeURIComponent(message)}`;
}

export function generateWhatsAppShareLink(message: string, phone = '79990000000'): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
