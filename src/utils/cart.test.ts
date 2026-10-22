import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSubtotal,
  calculateShipping,
  calculateTotal,
  formatPrice,
  validateOrderForm,
  generateTelegramOrderMessage,
  CartItem,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_COST,
} from './cart.ts';

test('calculateSubtotal sums up item prices multiplied by quantity', () => {
  const items: CartItem[] = [
    { id: '1', name: 'Лоток', price: 3400, quantity: 2, material: 'Бетон & Дуб', image: '' },
    { id: '2', name: 'Кашпо', price: 2100, quantity: 1, material: 'Бетон', image: '' },
  ];
  assert.equal(calculateSubtotal(items), 3400 * 2 + 2100);
});

test('calculateShipping gives free shipping if subtotal >= 5000 or pickup', () => {
  assert.equal(calculateShipping(FREE_SHIPPING_THRESHOLD, 'cdek_pvz'), 0);
  assert.equal(calculateShipping(4999, 'cdek_pvz'), STANDARD_SHIPPING_COST);
  assert.equal(calculateShipping(1000, 'pickup'), 0);
});

test('calculateTotal calculates total with shipping and discount', () => {
  assert.equal(calculateTotal(3000, 390, 500), 2890);
  assert.equal(calculateTotal(100, 0, 500), 0); // No negative totals
});

test('formatPrice formats rubles properly', () => {
  const formatted = formatPrice(3400);
  assert.match(formatted, /3.*400.*₽/);
});

test('validateOrderForm detects invalid inputs', () => {
  const resultInvalid = validateOrderForm({
    name: '',
    contact: '',
    city: '',
    deliveryMethod: 'cdek_pvz',
    address: '',
  });
  assert.equal(resultInvalid.valid, false);
  assert.ok(resultInvalid.errors.name);
  assert.ok(resultInvalid.errors.contact);
  assert.ok(resultInvalid.errors.city);
  assert.ok(resultInvalid.errors.address);

  const resultValid = validateOrderForm({
    name: 'Анна',
    contact: '+7 (999) 123-45-67',
    city: 'Москва',
    deliveryMethod: 'pickup',
  });
  assert.equal(resultValid.valid, true);
});

test('generateTelegramOrderMessage creates clear formatted message', () => {
  const items: CartItem[] = [
    { id: '1', name: 'Лоток Kontur', price: 3400, quantity: 1, material: 'Бетон & Дуб', image: '' },
  ];
  const msg = generateTelegramOrderMessage(
    items,
    3400,
    {
      name: 'Иван',
      contact: '@ivan_tg',
      city: 'Санкт-Петербург',
      deliveryMethod: 'cdek_pvz',
      address: 'ул. Рубинштейна 12',
      comment: 'С латунной гравировкой',
    },
    'KF-8821'
  );
  assert.ok(msg.includes('Лоток Kontur'));
  assert.ok(msg.includes('KF-8821'));
  assert.ok(msg.includes('@ivan_tg'));
  assert.ok(msg.includes('С латунной гравировкой'));
});
