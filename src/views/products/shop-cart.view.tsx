import ItemsGrid from '../../components/items-grid';
import ShopCartItem from '../../components/shop-cart-item';
import { useShopCartStore, updateInShopCart, removeFromShopCart } from '../../stores/shop-cart.store';

function ShopCartView() {
  const { shopCart } = useShopCartStore();
  console.log('Rendering <ShopCartView />');
  return (
    <ItemsGrid title="ShopCart">
      {shopCart?.items.map((item) => (
        <ShopCartItem
          key={item.id}
          item={item}
          onQuantityChange={updateInShopCart}
          onRemove={removeFromShopCart}
        />
      ))}
    </ItemsGrid>
  );
}

export default ShopCartView;
