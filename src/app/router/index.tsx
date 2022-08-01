import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import { AppRoutes } from "./routes";

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {AppRoutes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={<route.component></route.component>}
            ></Route>
          );
        })}
      </Route>
      <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
    </Routes>
  );
};

export default Router;
