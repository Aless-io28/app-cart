import { createContext, useState } from "react";
import { Dispatch, SetStateAction } from "react";

export const FiltersContext = createContext<{
  filters: {
    category: string;
    price: number;
    search: string;
    page: number;
  };
  setFilters: Dispatch<
    SetStateAction<{
      category: string;
      price: number;
      search: string;
      page: number;
    }>
  >;
}>({
  filters: {
    category: "all",
    price: 0,
    search: "",
    page: 0,
  },
  setFilters: () => {},
});

type Props = {
  children: React.ReactNode;
};

export function FiltersProvider({ children }: Props) {
  const [filters, setFilters] = useState({
    category: "all",
    price: 0,
    search: "",
    page: 0,
  });

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}
