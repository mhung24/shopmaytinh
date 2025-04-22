import React, { useEffect, useState } from "react";
import "./Subheader.css";
import { LuList } from "react-icons/lu";
import { MdOutlineNavigateNext } from "react-icons/md";
import banner1 from "../../assets/images/banner1.png";
import banner2 from "../../assets/images/banner2.png";
import banner3 from "../../assets/images/banner3.png";
import banner4 from "../../assets/images/banner4.png";
import banner5 from "../../assets/images/banner5.png";
import ApiService from "../Api/ApiService";
import { NavLink } from "react-router-dom";

export const Subheader = () => {
  const [dataSup, setDataSup] = useState([]);
  const loadData = async () => {
    const res = await ApiService.ApiSupplier();
    setDataSup(res.data);
  };

  console.log(dataSup);

  const list = [
    {
      title: "Trang chủ",
      img: "https://theme.hstatic.net/1000370192/1001217758/14/menu_icon_1.png?v=136",
      list: [
        {
          name: "Bảng giá thu mua đồ cũ",
        },
      ],
      link: "#",
    },
    {
      title: "Màn hình",
      img: "https://theme.hstatic.net/1000370192/1001217758/14/menu_icon_2.png?v=136",
      test: [{ name: 12333 }],
      link: `/collections/all?search="Màn hình"`,
    },
    {
      title: "PC",
      img: "https://theme.hstatic.net/1000370192/1001217758/14/menu_icon_3.png?v=136",
      list: [
        {
          name: "PC bộ",
        },
      ],
    },
    {
      title: "Laptop",
      img: "https://theme.hstatic.net/1000370192/1001217758/14/menu_icon_4.png?v=136",
    },
    {
      title: "Phụ kiện",
      img: "https://theme.hstatic.net/1000370192/1001217758/14/menu_icon_5.png?v=136",
    },
    {
      title: "Linh kiện",
      img: "https://theme.hstatic.net/1000370192/1001217758/14/menu_icon_6.png?v=136",
    },
    {
      title: "Tự build cấu hình",
      img: "https://theme.hstatic.net/1000370192/1001217758/14/menu_icon_7.png?v=136",
    },
  ];

  const listTitle = [
    {
      title: "Hướng dẫn bán máy cũ",
      img: "https://theme.hstatic.net/1000370192/1001217758/14/policy_header_image_1.png?v=136",
    },
    {
      title: "Hướng dẫn mua online",
      img: "https://theme.hstatic.net/1000370192/1001217758/14/policy_header_image_2.png?v=136",
    },
    {
      title: "Hướng dẫn mua trả góp",
      img: "https://theme.hstatic.net/1000370192/1001217758/14/policy_header_image_3.png?v=136",
    },
  ];

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="flex ">
      <div className="subheader_category">
        <div className="flex items-center subheader_category-title ">
          <LuList size={18} color="fff" />
          <h2 className="ml-2 uppercase font-bold text-white text-sm">
            Danh mục sản phẩm
          </h2>
        </div>

        <div>
          <nav className="relative">
            <ul>
              {list.map((item, index) => (
                <li key={index} className="wrap_list-category ">
                  <div className="flex items-center">
                    <img width={24} height={24} src={item.img} alt="" />
                    <NavLink to={item.link}>
                      <span className="ml-2 text-sm">{item.title}</span>
                    </NavLink>
                  </div>

                  <MdOutlineNavigateNext size={16} />
                  <div className={`list_category`}>
                    {item.list?.map((i, indx) => (
                      <p key={indx}>{i.name}</p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="subheader_banner">
        <nav className="mt-2 mb-2">
          <ul className="flex items-center ">
            {listTitle.map((item, index) => (
              <li key={index} className="flex items-center ml-6">
                <img width={24} height={24} src={item.img} alt="" />
                <span className="text-sm ml-2">{item.title}</span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="banner ml-6">
          <div className="flex">
            <div className="big_banner mr-3">
              <a href="">
                <img src={banner1} alt="" />
              </a>
            </div>
            <div className="">
              <div className="smart_banner">
                <a href="">
                  <img src={banner2} alt="" />{" "}
                </a>
              </div>
              <div className="smart_banner mt-3">
                <a href="">
                  <img src={banner3} alt="" />{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="flex mt-1">
            <div className="wrap_small-banner">
              <a href="">
                <img src={banner4} alt="" />{" "}
              </a>
            </div>
            <div className="wrap_small-banner">
              <a href="">
                <img src={banner5} alt="" />{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
