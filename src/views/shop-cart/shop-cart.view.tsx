import ItemsGrid from '../../components/items-grid';
import ShopCartItem from '../../components/shop-cart-item';
import { useShopCart } from '../../components/shop-cart-context';

function ShopCartView() {
  const { shopCart, updateInShopCart, removeFromShopCart } = useShopCart();
  console.log('Rendering <ShopCartView />');
  return (
    <ItemsGrid title="ShopCart">
      {shopCart.items.map((item) => (
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
