import Button from "app/components/Common/Button";
import CloseIcon from "app/components/Common/Icons/CloseIcon";
import FavIcon from "app/components/Common/Icons/FavIcon";
import TrashIcon from "app/components/Common/Icons/TrashIcon";
import Modal from "app/components/Common/Modal";
import { IContext, StoreContext } from "app/store/context";
import { IData } from "app/utils/types";
import React from "react";
import { Link } from "react-router-dom";
import style from "./Cart.module.scss";
import LeftArrow from "app/components/Common/Icons/LeftArrow.svg";
const Cart: React.FC<{}> = () => {
  const {
    cart,
    favorites,
    addFavorite,
    removeFavorite,
    increaseProductCount,
    decreaseProductCount,
    removeFromCart,
  } = React.useContext(StoreContext) as IContext;
  const [isDeleteModalOpen, setDeleteModalOpen] =
    React.useState<boolean>(false);
  const [dataToDelete, setDataToDelete] = React.useState<IData | null>(null);
  const shippingCost = 20;
  const discounts = 20;
  const totalPrice = React.useMemo(() => {
    return cart.reduce((a, b) => {
      return (
        a +
        parseFloat(b.product.Price.split(" ")[0].replace(",", ".")) * b.count
      );
    }, 0);
  }, [cart]);
  return (
    <div className={style.cart__wrapper}>
      <div className={style.products__wrapper}>
        <div className={style.top__bar}>
          <p className={style.cart__count}>{`Sepetim (${cart.length} ürün)`}</p>
          <Link className={style.back__to__shopping__wrapper} to="/">
            <img src={LeftArrow}></img>

            <a className={style.back__to__shopping}>Alışverişe devam et</a>
          </Link>
        </div>
        <div className={style.cart__list}>
          {cart.map((product) => {
            const isFavorite = favorites.some(
              (data) => data.ModelId === product.product.ModelId
            );
            return (
              <div className={style.cart__product__wrapper}>
                <div className={style.image__wrapper}>
                  <img
                    src={product.product.DefaultOptionImageUrl}
                    className={style.image}
                  ></img>
                </div>

                <div className={style.info_wrapper}>
                  <div>
                    <p className={style.name}>
                      {product.product.ProductDescription}
                    </p>
                    <p className={style.code}>W1CE95Z8 - 998</p>
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
                      {product.product.OldPrice}
                    </p>
                    <p className={style.current__price}>
                      {product.product.Price}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        if (isFavorite) {
                          removeFavorite(product.product.ModelId);
                        } else {
                          addFavorite(product.product);
                        }
                      }}
                      className={style.add__favorite__button}
                    >
                      <FavIcon
                        contained={isFavorite}
                        color={isFavorite ? "primary" : "secondary"}
                      />
                    </button>
                    <button
                      onClick={() => {
                        if (isFavorite) {
                          removeFromCart(product.product.ModelId);
                        } else {
                          setDataToDelete(product.product);
                          setDeleteModalOpen(true);
                        }
                      }}
                      className={style.add__favorite__button}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                  <div className={style.action__buttons__wrapper}>
                    <button
                      onClick={() => {
                        if (product.count === 1) {
                          setDeleteModalOpen(true);
                          setDataToDelete(product.product);
                        } else {
                          decreaseProductCount(product.product.ModelId);
                        }
                      }}
                      className={style.action__button}
                    >
                      -
                    </button>
                    <p className={style.count}>{product.count}</p>
                    <button
                      onClick={() => {
                        increaseProductCount(product.product.ModelId);
                      }}
                      className={style.action__button}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={style.summary__wrapper}>
        <p className={style.header}>Sipariş Özeti</p>
        <div className={style.summary__inner__wrapper}>
          <p className={style.text__normal}>Ürün Toplam</p>
          <p className={style.text__normal}>{totalPrice.toFixed(2) + " TL"}</p>
        </div>
        <div className={style.summary__inner__wrapper}>
          <p className={style.text__bold}>İndirimler</p>
          <p className={style.text__bold}>{discounts + " TL"} </p>
        </div>
        <div className={style.summary__inner__wrapper}>
          <p className={style.text__normal}>Ara toplam</p>
          <p className={style.text__normal}>
            {(totalPrice - discounts).toFixed(2) + " TL"}
          </p>
        </div>
        <div className={style.summary__inner__wrapper}>
          <p className={style.text__bold}>Kargo ücreti</p>
          <p className={style.text__bold}>{shippingCost + " TL"}</p>
        </div>
        <div className={style.summary__inner__wrapper}>
          <p className={style.text__total}>Genel toplam</p>
          <p className={style.text__total}>
            {(totalPrice - discounts + shippingCost).toFixed(2) + " TL"}
          </p>
        </div>
      </div>
      <Modal open={isDeleteModalOpen}>
        <div className={style.delete__modal__wrapper}>
          <div className={style.toolbar}>
            <button
              onClick={() => {
                setDeleteModalOpen(false);
              }}
              className={style.close__button}
            >
              <CloseIcon />
            </button>
          </div>
          <p className={style.text}>
            Ürünü sepetinizden sildikten sonra favorilerinizde saklamak ister
            misiniz?
          </p>
          <div className={style.action__buttons}>
            <Button
              onClick={() => {
                removeFromCart(dataToDelete?.ModelId!);
                setDataToDelete(null);
                setDeleteModalOpen(false);
              }}
              className={style.delete__button}
              variant="outlined"
            >
              Sil
            </Button>
            <Button
              onClick={() => {
                removeFromCart(dataToDelete?.ModelId!);
                addFavorite(dataToDelete!);
                setDataToDelete(null);
                setDeleteModalOpen(false);
              }}
              className={style.favorite__button}
              variant="contained"
            >
              Sil ve favorilere ekle
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
