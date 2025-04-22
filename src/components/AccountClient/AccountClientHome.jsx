import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./AccountClient.css";

export const AccountClientHome = () => {
  const data = Cookies.get("_ad");
  const dataUser = data ? JSON.parse(data) : [];
  const navigate = useNavigate();
  const token = Cookies.get("client");

  if (token === undefined) {
    navigate("/");
  }
  const list = [
    {
      link: "change-info",

      title: "Thông tin tài khoản",
    },

    {
      link: "order",

      title: "Đơn hàng của tôi",
    },

    {
      link: "change-pass",

      title: "Đổi mật khẩu",
    },
  ];

  return (
    <div>
      <div className="mt-4 mb-4 text-sm flex">
        <NavLink to={"/"}>Trang chủ </NavLink>

        <span className="about_title">/ Tài khoản</span>
      </div>

      <div className="flex">
        <div className="account_client-left">
          <h1>Trang tài khoản</h1>
          <p>Xin chào, {dataUser.fullName} !</p>

          <div className="wrap_list-account-menu">
            {list.map((item, index) => (
              <div key={index}>
                <NavLink
                  to={`${item.link}`}
                  className={({ isActive }) =>
                    isActive
                      ? "account_menu-forcus account_menu"
                      : "account_menu"
                  }
                >
                  {item.title}
                </NavLink>
              </div>
            ))}
          </div>
        </div>
        <div className="wrap_list-right">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
