import React, { Dispatch, SetStateAction } from "react";
import data from "app/utils/data";
import { IData } from "app/utils/types";

export interface ICartData {
  count: number;
  product: IData;
}
export interface IContext {
  addFavorite: (data: IData) => void;
  removeFavorite: (id: number) => void;
  addCart: (data: IData) => void;
  removeFromCart: (id: number) => void;
  decreaseProductCount: (id: number) => void;
  increaseProductCount: (id: number) => void;
  cart: ICartData[];
  favorites: IData[];
}
export const StoreContext = React.createContext<IContext | null>(null);

const Context: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [favorites, setFavorites] = React.useState<IData[]>([]);
  const [cart, setCart] = React.useState<ICartData[]>([]);

  const addFavorite = (data: IData) => {
    setFavorites([...favorites, data]);
  };
  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((x) => x.ModelId !== id));
  };
  const addCart = (data: IData) => {
    const productIndex = cart.findIndex(
      (product) => product.product.ModelId === data.ModelId
    );
    if (productIndex >= 0) {
      cart[productIndex].count = cart[productIndex].count + 1;
      setCart([...cart]);
    } else {
      setCart([...cart, { count: 1, product: data }]);
    }
  };
  const removeFromCart = (id: number) => {
    setCart(cart.filter((x) => x.product.ModelId !== id));
  };

  const decreaseProductCount = (id: number) => {
    const productIndex = cart.findIndex(
      (product) => product.product.ModelId === id
    );
    cart[productIndex].count = cart[productIndex].count - 1;
    setCart([...cart]);
  };
  const increaseProductCount = (id: number) => {
    const productIndex = cart.findIndex(
      (product) => product.product.ModelId === id
    );
    cart[productIndex].count = cart[productIndex].count + 1;
    setCart([...cart]);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addFavorite,
        removeFavorite,
        favorites,
        addCart,
        decreaseProductCount,
        increaseProductCount,
        removeFromCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default Context;
