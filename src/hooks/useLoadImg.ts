import { useState } from "react";
import { ProductProps } from "../components/Interfaces/typeProducts";

const URL_UNDEFINED = "https://automaq.pe/img/no_disponible.png";

export function useLoadImgProduct() {
  const [urlsImages, setUrlsImages] = useState<{ [key: number]: string }>([]);

  const serchImages = (products: ProductProps[]) => {
    for (const product of products) {
      const newName = product.title.split(" ")[0];
      fetch(`https://dummyjson.com/products/search?q=${newName}`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.products.length)
            return setUrlsImages((prev) => ({
              ...prev,
              [product.id]: URL_UNDEFINED,
            }));

          setUrlsImages((prev) => ({
            ...prev,
            [product.id]: data.products[0].thumbnail,
          }));
        })
        .catch((error) => console.log(error));
    }
  };

  return {
    serchImages,
    urlsImages,
  };
}
