import { useContext, useEffect, useState } from "react";
import { FiltersContext } from "../context/filters";
import { ProductObject } from "../components/Interfaces/typeProducts";

export function useLoadProducts() {
  const { filters, setFilters } = useContext(FiltersContext);
  const [products, setProducts] = useState<ProductObject>({
    products: [],
    total: 0,
  });
  const limitPrevious = 29;

  useEffect(() => {
    console.log(
      `https://dummyjson.com/products/search?q=${
        filters.search
      }&limit=${limitPrevious}&skip=${filters.page * limitPrevious}`
    );
    fetch(
      `https://dummyjson.com/products/search?q=${
        filters.search
      }&limit=${limitPrevious}&skip=${filters.page * limitPrevious}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [filters.search, filters.page]);

  useEffect(() => {
    if (filters.search != "") return;
    const urlCategory =
      filters.category === "all" ? "" : `category/${filters.category}`;
    fetch(`https://dummyjson.com/products/${urlCategory}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [filters.category]);

  // useEffect(() => {
  //   fetch(
  //     `https://dummyjson.com/products?limit=${limitPrevious}&skip=${
  //       filters.page * limitPrevious
  //     }`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data);
  //     });
  // }, [filters.page]);

  const handleFilters = () => {
    return products.products.filter((product) => {
      return (
        product.price >= filters.price &&
        (filters.category === "all" || product.category === filters.category)
      );
    });
  };

  return {
    filters,
    setFilters,
    handleFilters,
    pagination: {
      total: products.total,
    },
    limitPrevious,
  };
}
