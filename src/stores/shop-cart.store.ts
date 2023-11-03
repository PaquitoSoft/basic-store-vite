import { create } from 'zustand';
import type { TShopCart } from '../types/shop-cart';
import { addToCart, getShopCart, removeFromCart, updateInCart } from '../api/shop-cart.api';

export type TShopCartStore = {
  shopCart?: TShopCart;
  isLoading: boolean;
}

export const useShopCartStore = create<TShopCartStore>(() => ({
  shopCart: undefined,
  isLoading: true,
}));

const callApi = async (caller: () => Promise<TShopCart>) => {
  try {
    useShopCartStore.setState(() => ({ isLoading: true }));
    const shopCart = await caller();
    useShopCartStore.setState(() => ({ shopCart }));
  } catch(error) {
    console.error(error);
  } finally {
    useShopCartStore.setState(() => ({ isLoading: false }));
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
