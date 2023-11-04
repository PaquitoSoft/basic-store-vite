import { Link } from "react-router-dom";
import { shopCart, isLoading } from "../stores/shop-cart.store";

function AppHeader() {
  console.log('Rendering <AppHeader /> with totalItems',
    !isLoading.value ? shopCart.value?.totalItems: '(no shop cart yet)'
  );

  return (
    <header>
      <div className="max-w-7xl mx-auto bg-slate-600 px-4 py-6 mt-4 rounded-xl">
        <div className="flex min-w-0 justify-between">
          <Link to="/" className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
            Basic Store
          </Link>
          {
            !isLoading.value ?
              <Link to="/shop-cart" className="text-xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                Cart ({shopCart.value?.totalItems})
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
