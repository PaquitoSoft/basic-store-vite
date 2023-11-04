import { signal } from "@preact/signals-react";
import type { TShopCart } from '../types/shop-cart';
import { addToCart, getShopCart, removeFromCart, updateInCart } from '../api/shop-cart.api';

export const shopCart = signal<TShopCart | undefined>(undefined);
export const isLoading = signal(true);

const callApi = async (caller: () => Promise<TShopCart>) => {
  try {
    isLoading.value = true;
    const _shopCart = await caller();
    shopCart.value = _shopCart;
  } catch(error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

export const loadShopCart = async () => {
  callApi(() => getShopCart());
};

export const addToShopCart = async (productId: number) => {
  callApi(() => addToCart(productId));
};

export const updateInShopCart = (itemId: number, newQuantity: number) => {
  callApi(() => updateInCart(itemId, newQuantity));
};

export const removeFromShopCart = (itemId: number) => {
  callApi(() => removeFromCart(itemId));
};
