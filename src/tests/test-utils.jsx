import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { ProductsContext, ProductsProvider } from "../ProductsContext";
import { CartContext, CartProvider } from "../CartContext";
import Product from "../components/Product";
import Cart from "../components/Cart";
import Store from "../components/Store";
import Sidebar from "../components/Sidebar";
import { mdiMicrosoftWindows, mdiPenguin, mdiApple, mdiMicrosoftXbox, mdiSonyPlaystation, mdiNintendoSwitch } from '@mdi/js';

const PLATFORMS = {
  pc: {
    icon: mdiMicrosoftWindows,
    used: false
  },
  linux: {
    icon: mdiPenguin,
    used: false
  },
  macos: {
    icon: mdiApple,
    used: false
  },
  playstation: {
    icon: mdiSonyPlaystation,
    used: false
  },
  xbox: {
    icon: mdiMicrosoftXbox,
    used: false
  },
  nintendo: {
    icon: mdiNintendoSwitch,
    used: false
  }
};

export function renderProductPage({
  initialRoute = "/store/tomb-raider",
  products = [],
  cart = [],
  addToCart = () => {},
  error = null,
  isLoading = false,
} = {}) {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <ProductsContext.Provider value={{ data: products, error, isLoading }}>
        <CartContext.Provider value={{ cart, addToCart }}>
          <Routes>
            <Route path="/store/:id" element={<Product />} />
          </Routes>
        </CartContext.Provider>
      </ProductsContext.Provider>
    </MemoryRouter>
  );
}

export function renderCartPage({
  cart = [],
  removeFromCart = () => {},
  clearCart = () => {}
} = {}) {
  return render(
    <MemoryRouter>
      <ProductsProvider>
        <CartContext.Provider value={{ cart, removeFromCart, clearCart }}>
          <Cart />
        </CartContext.Provider>
      </ProductsProvider>
    </MemoryRouter>
  );
}

export function renderStorePage({
  data = [],
  cart = [],
  addToCart = () => {},
  error = null,
  isLoading = false,
  PLATFORM_ICONS = PLATFORMS,
  resetIcons = () => {}
} = {}) {
  return render(
    <MemoryRouter>
      <ProductsContext.Provider value={{ data, error, isLoading, PLATFORM_ICONS, resetIcons }}>
        <CartContext.Provider value={{ cart, addToCart }}>
          <Store />
        </CartContext.Provider>
      </ProductsContext.Provider>
    </MemoryRouter>
  );
}

export function renderSidebar() {
  return render(
    <MemoryRouter>
      <ProductsProvider>
          <Sidebar activeFilter={null} setActiveFilter={() => {}} />
      </ProductsProvider>
    </MemoryRouter>
  );
}