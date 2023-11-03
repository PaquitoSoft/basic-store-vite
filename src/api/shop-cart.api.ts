import { SHOP_CART_STORAGE_KEY } from "../constants";
import { readFromStorage, wait, writeToStorage } from "../helpers";
import products from '../data/products.json';
import { TShopCart } from "../types/shop-cart";

export const defaultShopCart: TShopCart = {
  id: -1,
  items: [],
  totalItems: 0,
  totalAmount: 0
};

const processShopCart = (shopCart: TShopCart) => {
  const totals = shopCart.items.reduce((acc, item) => {
    acc.items += item.quantity;
    acc.amount += item.quantity * item.product.price;
    return acc;
  }, { items: 0, amount: 0 });
  shopCart.totalItems = totals.items;
  shopCart.totalAmount = totals.amount;
  return shopCart;
};

const updateStoredShopCart = (shopCart: TShopCart) => {
  const processedShopCart = processShopCart(shopCart);
  writeToStorage(SHOP_CART_STORAGE_KEY, processedShopCart);
  return processedShopCart;
}

export async function getShopCart(): Promise<TShopCart> {
  await wait();
  return processShopCart(readFromStorage(SHOP_CART_STORAGE_KEY) || defaultShopCart);
}

export async function addToCart(productId: number): Promise<TShopCart> {
  const shopCart = await getShopCart();
  const product = products.find(p => p.id === Number(productId))!;
  const shopCartItem = shopCart.items.find(item => item.product.id === Number(productId));

  if (!shopCartItem) {
    shopCart.items.push({
      id: Date.now(),
      quantity: 1,
      amount: product.price,
      product
    });
  } else {
    shopCartItem.quantity += 1;
    shopCartItem.amount += shopCartItem.product.price;
  }

  return updateStoredShopCart(shopCart);
}

export async function updateInCart(itemId: number, newQuantity: number): Promise<TShopCart> {
  const shopCart = await getShopCart();
  const item = shopCart.items.find(item => item.id === Number(itemId));

  if (!item) {
    throw new Error('Item not found');
  }

  item.quantity = newQuantity;
  item.amount = newQuantity * item.product.price;

  return updateStoredShopCart(shopCart);
}

export async function removeFromCart(itemId: number): Promise<TShopCart> {
  const shopCart = await getShopCart()
  const itemIndex = shopCart.items.findIndex(item => item.id === Number(itemId));

  if (itemIndex === -1) {
    throw new Error('Item not found');
  }

  shopCart.items.splice(itemIndex, 1);

  return updateStoredShopCart(shopCart);
}
