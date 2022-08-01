import Cart from "app/views/Cart";
import Home from "app/views/Home";
import Search from "app/views/Home/search";
import React from "react";

export interface AppRoute {
  title: string;
  path: string;
  component: React.FC;
}

export const AppRoutes: AppRoute[] = [
  {
    path: "/",
    title: "Ana Ekran",
    component: Home,
  },
  {
    path: "/cart",
    title: "Sepet",
    component: Cart,
  },
  {
    path: "/search",
    title: "Arama",
    component: Search,
  },
];
