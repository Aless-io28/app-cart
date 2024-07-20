// import styleHeader from "./header.module.css";
import { Filters } from "../Filters/Filters";

// type Props = {
//   filters: React.Dispatch<
//     React.SetStateAction<{
//       category: string;
//       price: number;
//     }>
//   >;
// };

export function Header() {
  return (
    <div>
      <h1>PryShopp</h1>
      <Filters />
    </div>
  );
}
