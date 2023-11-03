import { useEffect, useState } from "react";
import originalProducts from '../../data/products.json';

import Product from "../../types/product";
import { wait } from "../../helpers";

function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      console.log('Updating products from server...');
      await wait();
      console.log('...we got the products. Lets update the state...');
      setProducts(originalProducts);
      console.log('...products updated!');
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return { products, loading };
}

export default useProducts;
