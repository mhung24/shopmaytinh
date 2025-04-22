import React from "react";
import { NavLink } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="wrap_notfound">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-lg text-gray-600 mt-4">
        Oops! Trang bạn tìm không tồn tại.
      </p>
      <NavLink
        to="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Quay về trang chủ
      </NavLink>
    </div>
  );
};
