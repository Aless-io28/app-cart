import { useContext } from "react";
import { IconArrow } from "../Icons/Icons";
import stylePagination from "./pagination.module.css";
import { FiltersContext } from "../../context/filters";
import { useLoadProducts } from "../../hooks/useLoadProducts";

export function Pagination() {
  const { filters, setFilters } = useContext(FiltersContext);
  const {
    pagination: { total },
    limitPrevious,
  } = useLoadProducts();

  const checkPage = (n: number) => {
    if (filters.page === Math.ceil((total || 0) / limitPrevious) - 1 && n === 1)
      return true;
    if (filters.page === 0 && n === -1) return true;
    return false;
  };

  return (
    <div className={stylePagination.contentPage}>
      <button
        disabled={checkPage(-1)}
        onClick={() =>
          setFilters((prevState) => ({
            ...prevState,
            page: prevState.page - 1,
          }))
        }
      >
        <IconArrow size="24px" color={checkPage(-1) ? "#444" : "#fff"} />
      </button>
      <p>{filters.page + 1}</p>
      <button
        disabled={checkPage(1)}
        onClick={() =>
          setFilters((prevState) => ({
            ...prevState,
            page: prevState.page + 1,
          }))
        }
      >
        <IconArrow size="24px" color={checkPage(1) ? "#444" : "#fff"} />
      </button>
    </div>
  );
}
