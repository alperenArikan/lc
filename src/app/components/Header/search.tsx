import { IData } from "app/utils/types";
import React, { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Header.module.scss";
const HeaderSearch: React.FC<{
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  filteredProducts: IData[];
  className: string;
}> = ({ searchValue, setSearchValue, filteredProducts, className }) => {
  const navigate = useNavigate();
  const [minLengthErrorOccured, setMinLengthErrorOccured] =
    React.useState<boolean>(false);
  const wrapperRef = React.useRef<HTMLFormElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDropdownBaseActive, setDropdownBaseActive] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (filteredProducts.length > 0 || minLengthErrorOccured) {
      setDropdownBaseActive(true);
    }
  }, [minLengthErrorOccured, filteredProducts]);
  React.useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
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
  }, [wrapperRef, isDropdownBaseActive]);

  return (
    <form
      ref={wrapperRef}
      onSubmit={(e: React.SyntheticEvent) => {
        e.preventDefault();
        inputRef.current?.focus();
        if (searchValue.length < 3) {
          setMinLengthErrorOccured(true);
        } else {
          inputRef.current?.blur();
          setDropdownBaseActive(false);
          navigate(`/search?s=${searchValue}`);
        }
      }}
      className={[
        style.search__wrapper,
        isDropdownBaseActive ? style.dropdown__active : "",
        className,
      ].join(" ")}
    >
      <span
        onClick={() => {
          inputRef.current?.focus();
        }}
        className={["material-symbols-outlined", style.search__icon].join(" ")}
      >
        search
      </span>
      <input
        value={searchValue}
        ref={inputRef}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.value.length >= 3 && minLengthErrorOccured) {
            setMinLengthErrorOccured(false);
          }
          setSearchValue(e.target.value);
        }}
        className={style.search__input}
      ></input>
      <button type="submit" className={style.search__button}>
        Ara
      </button>
      {isDropdownBaseActive && (
        <div className={style.search__dropdown}>
          {minLengthErrorOccured && (
            <p className={style.search__dropdown__error}>
              Lütfen arama yapmak için en az 3 karakter giriniz.
            </p>
          )}
          {filteredProducts.slice(0, 4).map((product) => {
            const indexOfFoundKeyword =
              product.ProductDescription.toLocaleLowerCase().indexOf(
                searchValue.toLowerCase()
              );
            const before = product.ProductDescription.substring(
              0,
              indexOfFoundKeyword
            );
            const after = product.ProductDescription.substring(
              indexOfFoundKeyword + searchValue.length + 1,
              product.ProductDescription.length
            );

            return (
              <p className={style.search__dropdown__result}>
                {before}
                <span className={style.search__dropdown__result__bold}>
                  {product.ProductDescription.substring(
                    indexOfFoundKeyword,
                    indexOfFoundKeyword + searchValue.length + 1
                  )}
                </span>
                {after}
              </p>
            );
          })}
        </div>
      )}
    </form>
  );
};

export default HeaderSearch;
