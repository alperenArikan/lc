import { IContext, StoreContext } from "app/store/context";
import { IData } from "app/utils/types";
import React from "react";
import Button from "../Common/Button";
import FavIcon from "../Common/Icons/FavIcon";
import style from "./ProductCard.module.scss";

const ProductCard: React.FC<{ product: IData }> = ({ product }) => {
  const { addFavorite, removeFavorite, favorites, addCart } = React.useContext(
    StoreContext
  ) as IContext;
  const isFavorite = favorites.some((data) => data.ModelId === product.ModelId);
  return (
    <div className={style.product__card__wrapper}>
      <img
        src={product.DefaultOptionImageUrl}
        className={style.product__card__image}
      ></img>
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
        <FavIcon contained={isFavorite} />
      </button>
      <div className={style.product__card__info__wrapper}>
        <p className={style.product__card__header}>
          {product.ProductDescription}
        </p>
        <p className={style.product__card__price}>{product.Price}</p>
        <div className={style.product__card__colors__wrapper}>
          {Array.from({ length: product.OptionColorCount })
            .slice(0, 5)
            .map((mockColorCode, index) => {
              return (
                <div
                  style={{
                    background:
                      "#" + Math.floor(Math.random() * 16777215).toString(16),
                  }}
                  className={style.product__card__color}
                >
                  {product.OptionColorCount > 5 && index === 4
                    ? `+${product.OptionColorCount - 5}`
                    : ""}
                </div>
              );
            })}

          <p
            className={style.product__card__color__count}
          >{`${product.OptionColorCount} Renk`}</p>
        </div>
        <Button
          fontSize="sm"
          onClick={() => {
            addCart(product);
          }}
          className={style.add__cart__button}
        >
          Sepete Ekle
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
