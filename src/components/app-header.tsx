import { Link } from "react-router-dom";
import { useShopCartStore } from "../stores/shop-cart.store";

function AppHeader() {
  const { shopCart, isLoading } = useShopCartStore();
  console.log('Rendering <AppHeader /> with totalItems', !isLoading ? shopCart?.totalItems: '(no shop cart yet)');

  return (
    <header>
      <div className="max-w-7xl mx-auto bg-slate-600 px-4 py-6 mt-4 rounded-xl">
        <div className="flex min-w-0 justify-between">
          <Link to="/" className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
            Basic Store
          </Link>
          {
            !isLoading ?
              <Link to="/shop-cart" className="text-xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                Cart ({shopCart?.totalItems})
              </Link>
            :
            <div className="text-lg font-bold leading-7 text-white sm:text-xl sm:truncate">loading...</div>
          }
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
