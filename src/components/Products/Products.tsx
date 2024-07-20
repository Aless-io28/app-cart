import styleProd from "./products.module.css";
import { useEffect } from "react";
import { AddCart, RemoveCart } from "../Icons/Icons";
import { useLoadImgProduct } from "../../hooks/useLoadImg.ts";
import { useCart } from "../../hooks/useCart.tsx";
import { ProductObject, ProductProps } from "../Interfaces/typeProducts.ts";

export function Products({ products }: ProductObject) {
  const { serchImages, urlsImages } = useLoadImgProduct();
  const { addProduct, cart, removeProduct } = useCart();

  useEffect(() => {
    serchImages(products);
  }, []);

  const productCheck = (product: ProductProps) => {
    return cart.some((item) => item.id === product.id);
  };

  return (
    <ul className={styleProd.contProd}>
      {products.map((product) => {
        const check = productCheck(product);
        return (
          <li key={product.id} className={styleProd.cardProd}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <h2>$ {product.price}</h2>
            <div
              style={{ borderColor: check ? "#f66" : "#dde" }}
              className={styleProd.iconBuy}
              onClick={() =>
                check ? removeProduct(product) : addProduct(product)
              }
            >
              {check ? (
                <RemoveCart size="24px" color="#f66" />
              ) : (
                <AddCart size="24px" color="#dde" />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
