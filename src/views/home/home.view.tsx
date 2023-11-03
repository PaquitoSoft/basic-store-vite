import { useCallback } from 'react';
import type TProduct from '../../types/product';
import CatalogProduct from '../../components/catalog-product';
import useProducts from './use-home-view';
import { addToShopCart } from '../../stores/shop-cart.store';

type TProductsGridProps = {
  products: TProduct[];
  onAddToCart: (product: TProduct) => void;
};

const ProductsGrid = ({ products, onAddToCart }: TProductsGridProps) => {
  console.log('Rendering <ProductsGrid />');
  return (
    <div className="grid grid-cols-1 gap-y-40 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product: TProduct) => (
        <CatalogProduct
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

const Home = () => {
  const { products } = useProducts();

  const onAddToCart = useCallback((product: TProduct) => {
    addToShopCart(product.id);
  }, []);

  console.log('Rendering <HomePage />');

  return (
    <>
      <h1 className="text-4xl pb-10">Catalog</h1>
      <ProductsGrid products={products} onAddToCart={onAddToCart} />
    </>
  )
}

export default Home
