import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import HomeView from './views/home/home.view';
import ShopCartView from "./views/shop-cart/shop-cart.view";
import AppHeader from "./components/app-header";
import { ShopCartProvider } from "./components/shop-cart-context";

function App() {
  return (
    <BrowserRouter>
      <ShopCartProvider>
        <AppHeader />

        <main className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/shop-cart" element={<ShopCartView />} />
          </Routes>
        </main>
      </ShopCartProvider>
    </BrowserRouter>
  );
}

export default App
