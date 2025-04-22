import React, { useState } from "react";
import { Home } from "../Home/Home";
import { TbListDetails } from "react-icons/tb";
import { MdOutlineShoppingCart } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { RiProductHuntLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { TbReportAnalytics } from "react-icons/tb";
import { Link, NavLink, Outlet } from "react-router-dom";

const listItem = [
  {
    title: "Tổng quan",
    icon: <TbListDetails />,
    link: "generals",
  },
  {
    title: "Đơn hàng",
    icon: <MdOutlineShoppingCart />,
    link: "orders",
  },

  {
    title: "Sản phẩm",
    icon: <RiProductHuntLine />,
    link: "products",
  },
  {
    title: "Khách hàng",
    icon: <CiUser />,
    link: "customer",
  },
  {
    title: "Báo cáo",
    icon: <TbReportAnalytics />,
    // link: "dd",
  },
];

export const Menu = (props) => {
  const { onChosenData } = props;

  const [bgList, setBgList] = useState(0);

  const setBgListItem = (index, name) => {
    setBgList(index);
    onChosenData(name);
  };
  return (
    <>
      <div className="wrap_list-menu">
        {listItem.map((item, index) => (
          <div
            key={index}
            className={
              bgList === index ? "list_menu bg_list-menu" : "list_menu"
            }
          >
            <NavLink to={item.link}>
              <button
                className="btn_list-item"
                onClick={() => {
                  setBgListItem(index, item.title);
                }}
              >
                <i>{item.icon}</i>
                <p>{item.title}</p>
              </button>
            </NavLink>
          </div>
        ))}
      </div>

      <div className="admin_content">
        <div className="admin_content-list-wrap">
          <Outlet />
        </div>
      </div>
    </>
  );
};
