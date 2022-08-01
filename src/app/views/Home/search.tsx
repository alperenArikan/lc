import FavIcon from "app/components/Common/Icons/FavIcon";
import ProductCard from "app/components/ProductCard";
import SortButton from "app/components/SortButton";
import { IContext, StoreContext } from "app/store/context";
import data from "app/utils/data";
import React, { ContextType } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import style from "./Home.module.scss";
import { sortType } from "app/utils/types";

const Search: React.FC<{}> = () => {
  const params = useParams();
  const { search } = useLocation();
  console.log(search);
  const navigator = useNavigate();
  const searchParameter = new URLSearchParams(search).get("s");
  const [sortType, setSortType] = React.useState<sortType>("recommended");

  const filteredProducts = React.useMemo(() => {
    try {
      const filteredData = data.filter((product) => {
        return product.ProductDescription.toLocaleLowerCase().includes(
          searchParameter!.toLocaleLowerCase()
        );
      });
      switch (sortType) {
        case "recommended":
          return filteredData;
        case "priceAsc":
          return filteredData.sort(
            (a, b) =>
              parseFloat(a.Price.split(" ")[0].replace(",", ".")) -
              parseFloat(b.Price.split(" ")[0].replace(",", "."))
          );

        case "priceDesc":
          return filteredData.sort(
            (a, b) =>
              parseFloat(b.Price.split(" ")[0].replace(",", ".")) -
              parseFloat(a.Price.split(" ")[0].replace(",", "."))
          );
        default:
          return filteredData;
      }
    } catch (err) {}
  }, [data, searchParameter, sortType]);

  if (!search || !searchParameter) {
    return <Navigate to="/" />;
  }

  return (
    <div className={style.wrapper}>
      <div className={style.search__header}>
        <p className={style.search__value}>{`"${searchParameter}"`}</p>
        <p className={style.text}>ile ilgili</p>
        <p className={style.count}>{` ${filteredProducts?.length} `}</p>
        <p className={style.text}>ürün bulduk</p>
      </div>
      <div className={style.info__wrapper}>
        <div className={style.count__info}></div>
        <SortButton
          value={sortType}
          onChange={(e) => {
            setSortType(e.target.value as sortType);
          }}
        />
      </div>
      <div className={style.products__wrapper}>
        {filteredProducts!.map((product) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </div>
  );
};

export default Search;
