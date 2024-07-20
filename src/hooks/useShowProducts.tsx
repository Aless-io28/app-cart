import { useContext, useState, useEffect } from "react";
import { FiltersContext } from "../context/filters";
import { ProductProps } from "../components/Interfaces/typeProducts";

export function useShowProducts() {
  const { filters, setFilters } = useContext(FiltersContext);
  const [productsApi, setProductsApi] = useState<ProductProps[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?skip=89&limit=30")
      .then((res) => res.json())
      .then((data) => {
        setProductsApi(data.products);
      });
  }, []);

  const handleFilters = () => {
    return productsApi.filter((product) => {
      return (
        product.price >= filters.price &&
        (filters.category === "all" || product.category === filters.category) &&
        (filters.search === "" ||
          product.title
            .toLowerCase()
            .includes(filters.search.toLocaleLowerCase()))
      );
    });
  };

  return {
    filters,
    setFilters,
    handleFilters,
  };
}
