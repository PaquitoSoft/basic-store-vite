/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useEffect, useState, useContext, useMemo } from "react";
import { TShopCart } from "../types/shop-cart";
import { defaultShopCart, addToCart, getShopCart, removeFromCart, updateInCart } from "../api/shop-cart.api";

const ShopCartContext = createContext({
  shopCart: defaultShopCart,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateShopCart: (_shopCart: TShopCart) => {},
});

export const ShopCartProvider = ({ children }: { children: ReactNode }) => {
  const [shopCart, setShopCart] = useState<TShopCart>(defaultShopCart);
  const context = useMemo(() => ({ shopCart, updateShopCart: setShopCart }), [shopCart]);
  console.log('Rendering ShopCartProvider with totalItems:', shopCart.totalItems);
  useEffect(() => {
    const loadShopCart = async () => {
      console.log('Updating ShopCart from server...');
      const shopCart = await getShopCart();
      console.log('...we already got the shopCart. Lets update the state...');
      setShopCart(shopCart);
      console.log('ShopCart updated from server!');
    };
    loadShopCart();
  }, []);

  return (
    <ShopCartContext.Provider value={context}>{children}</ShopCartContext.Provider>
  )
};

export function useShopCart() {
  const { shopCart, updateShopCart } = useContext(ShopCartContext);
  const [isLoading, setLoading] = useState(false);

  const callApi = async (caller: () => Promise<TShopCart>) => {
    try {
      setLoading(true);
      const shopCart = await caller();
      updateShopCart(shopCart);
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addToShopCart = async (productId: number) => {
    callApi(() => addToCart(productId));
  };

  const updateInShopCart = (itemId: number, newQuantity: number) => {
    callApi(() => updateInCart(itemId, newQuantity));
  };

  const removeFromShopCart = (itemId: number) => {
    callApi(() => removeFromCart(itemId));
  };

  return {
    isLoading,
    shopCart,
    addToShopCart,
    updateInShopCart,
    removeFromShopCart
  };
}

export default useShopCart;
