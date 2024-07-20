import { Products } from "./components/Products/Products";
import { Header } from "./components/Header/Header";
import { Cart } from "./components/Cart/Cart";
import { CartProvider } from "./context/productsCart";
import "./App.css";
// import { useShowProducts } from "./hooks/useShowProducts";
import { useLoadProducts } from "./hooks/useLoadProducts";
import { Pagination } from "./components/Pagination/Pagination";
import { Footer } from "./components/Footer/Footer";

function App() {
  // const { handleFilters } = useShowProducts();
  // const showProducts = handleFilters();

  const { handleFilters } = useLoadProducts();
  const showProducts = handleFilters();

  return (
    <>
      <main>
        <CartProvider>
          <Cart />
          <Header />
          {showProducts.length > 0 && <Pagination />}
          <Products products={showProducts} />
        </CartProvider>
      </main>
      <Footer />
    </>
  );
}

export default App;
