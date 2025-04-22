import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import no_avatar from "../../assets/images/no_avatar.png";
import { LiaCommentSolid } from "react-icons/lia";
import { CiViewList } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa";
import "./Admin.css";
import { Menu } from "./Menu";
import { GrUserManager } from "react-icons/gr";
import { IoIosLogOut } from "react-icons/io";
import Cookies from "js-cookie";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ListProducts, ListUserAdmin } from "../Redux/ProductSlice";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [text, setText11] = useState("Tổng quan");
  const test = (i) => {
    setText11(i);
  };

  const listUser = JSON.parse(localStorage.getItem("data"));

  const handleLogOut = () => {
    Cookies.remove("token");
    Cookies.remove("data");
    localStorage.removeItem("data");
    navigate("/admin/login");
  };
  return (
    <>
      <div className="wrap_header">
        <div className="admin_logo">
          <img src={logo} alt="" />
        </div>

        <div className="wrap_admin-header-content">
          <p>{text}</p>
        </div>

        <div className="wrap_admin_icon">
          <i>
            <LiaCommentSolid size={18} />
          </i>
          <i>
            <CiViewList size={18} />
          </i>
          <i>
            <FaRegBell size={18} />
          </i>
          <div className="wrap_admin-infor">
            <p>{listUser?.username}</p>
            <img src={no_avatar} alt="" />

            <div className="admin_infor">
              <div className="admin_infor-header">
                <h1>{listUser?.fullName}</h1>
                <p>{listUser?.email}</p>
              </div>
              <div className="list_array">
                <NavLink to={"account"}>
                  <div className="array_item">
                    <i>
                      <GrUserManager />
                    </i>
                    <p>Quản lý tài khoản</p>
                  </div>
                </NavLink>

                <div onClick={handleLogOut} className="array_item">
                  <i>
                    <IoIosLogOut />
                  </i>
                  <p>Đăng xuất</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap_admin-content">
        <Menu onChosenData={test} />
      </div>
    </>
  );
};
