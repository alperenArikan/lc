import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Foooter";
import Header from "../Header";
import style from "./Layout.module.scss";
const Layout = () => {
  return (
    <div className={style.wrapper}>
      <Header />
      <div className={style.content__wrapper}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
