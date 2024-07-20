import styleFilters from "./filters.module.css";
import { useEffect, useId, useState } from "react";
import { useShowProducts } from "../../hooks/useShowProducts";
import { SearchProduct } from "../Icons/Icons";
import { useDebounce } from "../../hooks/useDebounce";

export function Filters() {
  const rangePriceFilter = useId();
  const categoryFilter = useId();
  const { setFilters, filters } = useShowProducts();
  const [categories, setCategories] = useState<string[]>([]);
  const { setInputValue } = useDebounce();

  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevState) => ({
      ...prevState,
      price: Number(event.target.value),
    }));
  };

  const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prevState) => ({
      ...prevState,
      category: event.target.value,
    }));
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { search } = Object.fromEntries(new FormData(event.target));
    setFilters((prevState) => ({
      ...prevState,
      search: search as string,
    }));
  };

  const handleDebounce = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    fetch("https://dummyjson.com/products/category-list")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <div className={styleFilters.contFilters}>
      <form onSubmit={handleSubmit} className={styleFilters.search}>
        <input
          type="text"
          placeholder="Buscar..."
          name="search"
          onChange={handleDebounce}
        />
        <button>
          <SearchProduct size="20px" color="#fff" />
        </button>
      </form>

      <select
        name=""
        id={categoryFilter}
        className={styleFilters.category}
        onChange={handleCategory}
      >
        <option value="all">Todas</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div className={styleFilters.rangePrice}>
        {/* <label htmlFor={rangePriceFilter}>Precio: </label> */}
        <input
          id={rangePriceFilter}
          type="range"
          onChange={handlePrice}
          max={1000}
          value={filters.price}
        />
        <span>${filters.price}</span>
      </div>
    </div>
  );
}
