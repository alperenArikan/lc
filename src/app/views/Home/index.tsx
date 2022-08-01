import FavIcon from "app/components/Common/Icons/FavIcon";
import ProductCard from "app/components/ProductCard";
import SortButton from "app/components/SortButton";
import { IContext, StoreContext } from "app/store/context";
import data from "app/utils/data";
import React, { ContextType } from "react";
import style from "./Home.module.scss";
import { sortType } from "app/utils/types";
const Home: React.FC<{}> = () => {
  const currentPath = ["Ana Sayfa", "Erkek", "Sweatshirt"];
  const { addFavorite, removeFavorite, favorites, addCart } = React.useContext(
    StoreContext
  ) as IContext;
  const [sortType, setSortType] = React.useState<sortType>("recommended");

  const sortedProducts = React.useMemo(() => {
    console.log(data[0]);
    switch (sortType) {
      case "recommended":
        return data;
      case "priceAsc":
        return [...data].sort(
          (a, b) =>
            parseFloat(a.Price.split(" ")[0].replace(",", ".")) -
            parseFloat(b.Price.split(" ")[0].replace(",", "."))
        );

      case "priceDesc":
        return [...data].sort(
          (a, b) =>
            parseFloat(b.Price.split(" ")[0].replace(",", ".")) -
            parseFloat(a.Price.split(" ")[0].replace(",", "."))
        );
      default:
        return data;
    }
  }, [sortType]);
  return (
    <div className={style.wrapper}>
      <div className={style.breadcrumb}>
        {currentPath.map((header, index) => {
          if (index < currentPath.length - 1) {
            return (
              <>
                <p>{header}</p>
                <span>&rsaquo;</span>
              </>
            );
          } else {
            return <p>{header}</p>;
          }
        })}
      </div>
      <p className={style.header}>Erkek Sweatshirt Modelleri</p>
      <div className={style.info__wrapper}>
        <div className={style.count__info}>{`${data.length} Ürün`}</div>
        <SortButton
          value={sortType}
          onChange={(e) => {
            setSortType(e.target.value as sortType);
          }}
        />
      </div>
      <div className={style.products__wrapper}>
        {sortedProducts.map((product) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </div>
  );
};

export default Home;
