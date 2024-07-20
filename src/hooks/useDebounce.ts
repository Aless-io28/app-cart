import { useContext, useEffect, useState } from "react";
import { FiltersContext } from "../context/filters";

export function useDebounce() {
  const [inputValue, setInputValue] = useState("");
  const { setFilters } = useContext(FiltersContext);

  useEffect(() => {
    const delayTime = 500;
    const timer = setTimeout(() => {
      setFilters((prevState) => ({ ...prevState, search: inputValue }));
    }, delayTime);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  return { inputValue, setInputValue };
}
