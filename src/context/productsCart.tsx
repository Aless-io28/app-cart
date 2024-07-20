import { createContext, useReducer } from "react";
import { ProductProps } from "../components/Interfaces/typeProducts";

export const ProductsCartContext = createContext<{
  cart: ProductProps[];
  addProduct: (product: ProductProps) => void;
  removeProduct: (product: ProductProps) => void;
  clearCart: () => void;
  quantityProd: ({
    product,
    action,
  }: {
    product: ProductProps;
    action: number;
  }) => void;
}>({
  cart: [],
  addProduct: () => {},
  removeProduct: () => {},
  clearCart: () => {},
  quantityProd: () => {},
});

type Props = {
  children: React.ReactNode;
};

// --

const updateLocalCart = (cart: ProductProps[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const initialState: ProductProps[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);

const reducerProduct = (
  state: ProductProps[],
  action: { type: string; payload: ProductProps }
) => {
  const { type: actionType, payload: actionPayload } = action;

  switch (actionType) {
    case "ADD_PRODUCT": {
      const { id } = actionPayload;
      const productInCartIndex = state.findIndex((item) => item.id === id);

      if (productInCartIndex >= 0) {
        // const newState = structuredClone(state);
        // newState[productInCartIndex].quantity += 1;
        // localStorage.setItem("cart", JSON.stringify(newState));

        const newState = [
          ...state.slice(0, productInCartIndex),
          {
            ...state[productInCartIndex],
            quantity: (state[productInCartIndex]?.quantity ?? 0) + 1,
          },
          ...state.slice(productInCartIndex + 1),
        ];

        updateLocalCart(newState);
        return newState;
      }

      const newState = [...state, { ...actionPayload, quantity: 1 }];

      updateLocalCart(newState);
      return newState;
    }

    case "REMOVE_PRODUCT": {
      const { id } = actionPayload;
      const newState = state.filter((item) => item.id !== id);
      updateLocalCart(newState);
      return newState;
    }

    case "QUANTITY_PLUS": {
      const { id } = actionPayload;
      const productInCartIndex = state.findIndex((item) => item.id === id);
      if (productInCartIndex >= 0) {
        const newState = structuredClone(state);
        const newQuantity = (newState[productInCartIndex]?.quantity ?? 0) + 1;
        newState[productInCartIndex].quantity = newQuantity;
        updateLocalCart(newState);
        return newState;
      }
      break;
    }

    case "QUANTITY_MINUS": {
      const { id } = actionPayload;
      const productInCartIndex = state.findIndex((item) => item.id === id);
      if (
        productInCartIndex >= 0 &&
        (state[productInCartIndex].quantity ?? 0) > 1
      ) {
        const newState = structuredClone(state);
        const newQuantity = (newState[productInCartIndex]?.quantity ?? 0) - 1;
        newState[productInCartIndex].quantity = newQuantity;
        updateLocalCart(newState);
        return newState;
      }
      break;
    }

    case "CLEAR_CART": {
      updateLocalCart([]);
      return [];
    }
  }

  return state;
};

export function CartProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducerProduct, initialState);

  const addProduct = (product: ProductProps) => {
    dispatch({ type: "ADD_PRODUCT", payload: product });
  };

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
      payload: {
        id: 0,
        quantity: 0,
        title: "",
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: "",
        category: "",
        thumbnail: "",
        images: [],
        description: "",
      },
    });
  };

  const removeProduct = (product: ProductProps) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: product });
  };

  const quantityProd = ({
    product,
    action,
  }: {
    product: ProductProps;
    action: number;
  }) => {
    if (action === 1) dispatch({ type: "QUANTITY_PLUS", payload: product });
    if (action === -1) dispatch({ type: "QUANTITY_MINUS", payload: product });
  };

  return (
    <ProductsCartContext.Provider
      value={{
        cart: state,
        addProduct,
        clearCart,
        quantityProd,
        removeProduct,
      }}
    >
      {children}
    </ProductsCartContext.Provider>
  );
}
