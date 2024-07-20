import { IconCart, DeleteProduct } from "../Icons/Icons.tsx";
import { useId, useRef } from "react";
import styleCart from "./cart.module.css";
import { useCart } from "../../hooks/useCart.tsx";
import { ProductProps } from "../Interfaces/typeProducts.ts";
import { ClearCart } from "../Icons/Icons";
// import { useLoadImgProduct } from "../../hooks/useLoadImg.ts";

export function Cart() {
  const cartProducts = useId();
  const inputCheckRef = useRef<HTMLInputElement>(null);
  const { cart, quantityProd, removeProduct, clearCart } = useCart();
  // const { urlsImages, serchImages } = useLoadImgProduct();

  // const handleClick = () => {
  //   if (!inputCheckRef.current?.checked) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // };

  // useEffect(() => {
  //   serchImages(cart);
  // }, [cart]);

  const quantityMinus = (product: ProductProps) => {
    quantityProd({ product: product, action: -1 });
  };

  const quantityPlus = (product: ProductProps) => {
    quantityProd({ product: product, action: 1 });
  };

  return (
    <>
      <label className={styleCart.showCart} htmlFor={cartProducts}>
        <IconCart />
      </label>
      <input type="checkbox" name="" id={cartProducts} ref={inputCheckRef} />
      {/* <div className={styleCart.afterCart}></div> */}
      <ul className={styleCart.contentCart}>
        {cart.length == 0 && <h2>No hay productos</h2>}
        {cart.map((product) => (
          <li className={styleCart.cardProd}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>
              {product.title} - ${product.price}
            </h3>
            <div className={styleCart.quantityProduct}>
              <button onClick={() => quantityMinus(product)}>-</button>
              <input type="text" placeholder="0" value={product.quantity} />
              <button onClick={() => quantityPlus(product)}>+</button>
            </div>
            <div
              className={styleCart.btnDeleteProduct}
              onClick={() => removeProduct(product)}
            >
              <DeleteProduct size="28" />
            </div>
          </li>
        ))}
        {cart.length > 0 && (
          <div onClick={clearCart} className={styleCart.clearCart}>
            <ClearCart size="24px" />
          </div>
        )}
      </ul>
    </>
  );
}
