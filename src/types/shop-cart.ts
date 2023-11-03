import TProduct from "./product";

export type TShopCartItem = {
  id: number;
  quantity: number;
  amount: number;
  product: TProduct;
};

export type TShopCart = {
  id: number;
  items: TShopCartItem[];
  totalItems: number;
  totalAmount: number;
};

