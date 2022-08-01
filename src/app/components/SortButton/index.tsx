import { sortType } from "app/utils/types";
import React from "react";
import style from "./SortButton.module.scss";
const SortButton: React.FC<{
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: sortType;
}> = ({ onChange, value }) => {
  const [isDropdownBaseActive, setDropdownBaseActive] =
    React.useState<boolean>(false);
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
    <button
      onClick={() => {
        setDropdownBaseActive(true);
      }}
      className={style.sort__button}
    >
      <span>
        <img src={process.env.PUBLIC_URL + "/assets/Icon-Sort.svg"} />
      </span>
      <p>Sırala</p>
      {isDropdownBaseActive && (
        <div ref={dropdownRef} className={style.sort__dropdown}>
          <div className={style.sort__dropdown__row}>
            <input
              checked={value === "recommended"}
              onChange={onChange}
              value="recommended"
              id="recommended"
              name="sort__type"
              type="radio"
            ></input>
            <label htmlFor="recommended">Önerilen Sıralama</label>
          </div>
          <div className={style.sort__dropdown__row}>
            {" "}
            <input
              checked={value === "priceAsc"}
              onChange={onChange}
              value="priceAsc"
              id="priceAsc"
              name="sort__type"
              type="radio"
            ></input>
            <label htmlFor="priceAsc">En düşük fiyat</label>
          </div>
          <div className={style.sort__dropdown__row}>
            {" "}
            <input
              checked={value === "priceDesc"}
              onChange={onChange}
              value="priceDesc"
              id="priceDesc"
              name="sort__type"
              type="radio"
            ></input>
            <label htmlFor="priceDesc">En yüksek fiyat</label>
          </div>

          <div className={style.sort__dropdown__row}>
            {" "}
            <input
              checked={value === "new"}
              onChange={onChange}
              value="new"
              id="new"
              name="sort__type"
              type="radio"
            ></input>
            <label htmlFor="new">En yeniler</label>
          </div>
          <div className={style.sort__dropdown__row}>
            {" "}
            <input
              checked={value === "bestSeller"}
              onChange={onChange}
              value="bestSeller"
              id="bestSeller"
              name="sort__type"
              type="radio"
            ></input>
            <label htmlFor="bestSeller">En çok satanlar</label>
          </div>
          <div className={style.sort__dropdown__row}>
            {" "}
            <input
              checked={value === "liked"}
              onChange={onChange}
              value="liked"
              id="liked"
              name="sort__type"
              type="radio"
            ></input>
            <label htmlFor="liked">En çok beğenilenler</label>
          </div>
          <div className={style.sort__dropdown__row}>
            {" "}
            <input
              checked={value === "discount"}
              onChange={onChange}
              value="discount"
              id="discount"
              name="sort__type"
              type="radio"
            ></input>
            <label htmlFor="discount">İndirim oranı</label>
          </div>
        </div>
      )}
    </button>
  );
};

export default SortButton;
