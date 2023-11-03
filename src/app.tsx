import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import HomeView from './views/home/home.view';
import ShopCartView from "./views/products/shop-cart.view";
import AppHeader from "./components/app-header";
import { loadShopCart } from "./stores/shop-cart.store";
import { useEffect } from "react";

function App() {
  useEffect(() => { loadShopCart(); }, []);

  return (
    <BrowserRouter>
      <AppHeader />

      <main className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/shop-cart" element={<ShopCartView />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App
