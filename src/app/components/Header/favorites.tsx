import { IContext, StoreContext } from "app/store/context";
import React, { Dispatch, SetStateAction } from "react";
import FavIcon from "../Common/Icons/FavIcon";
import style from "./Header.module.scss";
const FavoritesDropdown: React.FC<{
  isDropdownBaseActive: boolean;
  setDropdownBaseActive: Dispatch<SetStateAction<boolean>>;
}> = ({ isDropdownBaseActive, setDropdownBaseActive }) => {
  const { favorites, addFavorite, removeFavorite } = React.useContext(
    StoreContext
  ) as IContext;
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownBaseActive(false);
        document.removeEventListener("mousedown", handleClickOutside);
      }
    }
    if (isDropdownBaseActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, isDropdownBaseActive]);
  return (
    <>
      {isDropdownBaseActive && (
        <div ref={dropdownRef} className={style.favorites__dropdown}>
          <div className={style.products__wrapper}>
            <div className={style.top__bar}>
              <p
                className={style.cart__count}
              >{`Favorilerim (${favorites.length} ürün)`}</p>
            </div>
            <div className={style.cart__list}>
              {favorites.map((product) => {
                const isFavorite = favorites.some(
                  (data) => data.ModelId === product.ModelId
                );
                return (
                  <div className={style.cart__product__wrapper}>
                    <div className={style.image__wrapper}>
                      <img
                        src={product.DefaultOptionImageUrl}
                        className={style.image}
                      ></img>
                    </div>

                    <div className={style.info_wrapper}>
                      <div>
                        <p className={style.name}>
                          {product.ProductDescription}
                        </p>
                      </div>
                      <div>
                        <div className={style.info__row}>
                          <p className={style.info__normal}>Beden: </p>
                          <p className={style.info__bold}>M</p>
                        </div>
                        <div className={style.info__row}>
                          <p className={style.info__normal}>Renk: </p>
                          <p className={style.info__bold}>Gri Melanj Baskı</p>
                        </div>
                      </div>
                    </div>
                    <div className={style.action__wrapper}>
                      <div>
                        <p className={style.discounted__price}>
                          {product.OldPrice}
                        </p>
                        <p className={style.current__price}>{product.Price}</p>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            if (isFavorite) {
                              removeFavorite(product.ModelId);
                            } else {
                              addFavorite(product);
                            }
                          }}
                          className={style.add__favorite__button}
                        >
                          <FavIcon
                            contained={isFavorite}
                            color={isFavorite ? "primary" : "secondary"}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FavoritesDropdown;
