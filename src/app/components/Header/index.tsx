import React from "react";
import { Link } from "react-router-dom";
import CartIcon from "../Common/Icons/CartIcon";
import FavIcon from "../Common/Icons/FavIcon";
import style from "./Header.module.scss";
import data from "app/utils/data";
import { IData } from "app/utils/types";
import HeaderSearch from "./search";
import FavoritesDropdown from "./favorites";
const Header = () => {
  const [searchValue, setSearchValue] = React.useState<string>("");
  const filteredProducts = React.useMemo<IData[]>(() => {
    if (searchValue.length < 3) return [];
    else {
      return data.filter((product) => {
        return product.ProductDescription.toLocaleLowerCase().includes(
          searchValue.toLocaleLowerCase()
        );
      });
    }
  }, [searchValue]);
  const [isDropdownBaseActive, setDropdownBaseActive] =
    React.useState<boolean>(false);

  return (
    <div className={style.wrapper}>
      <div className={style.inner__wrapper}>
        <FavoritesDropdown
          isDropdownBaseActive={isDropdownBaseActive}
          setDropdownBaseActive={setDropdownBaseActive}
        />
        <Link className={style.logo__link} to="/">
          <img
            className={style.logo}
            src={process.env.PUBLIC_URL + "assets/companyLogo.png"}
          />
        </Link>
        <HeaderSearch
          className={style.web}
          filteredProducts={filteredProducts}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <div className={style.action__section__wrapper}>
          <button
            onClick={() => {
              setDropdownBaseActive(true);
            }}
            className={[style.button__wrapper, style.favorite__icon].join(" ")}
          >
            <FavIcon />
            <p className={style.link__text}>Favorilerim</p>
          </button>
          <Link to="/cart" className={style.button__wrapper}>
            <CartIcon />
            <p className={style.link__text}>Sepetim</p>
          </Link>
        </div>
      </div>
      <div className={style.category__list}>
        <p className={style.category}>Kadın</p>
        <p className={style.category}>Erkek</p>
        <p className={style.category}>Çocuk</p>
        <p className={style.category}>Bebek</p>
        <p className={style.category}>LCW Home</p>
      </div>
      <div>
        <HeaderSearch
          className={style.mobile}
          filteredProducts={filteredProducts}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </div>
    </div>
  );
};

export default Header;
