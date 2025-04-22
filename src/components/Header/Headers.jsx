import React, { useEffect, useRef, useState } from "react";
import "./Headers.css";
import { CiSearch } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import logo from "../../assets/images/logo.png";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { ListCart } from "../Cart/ListCart";
import Cookies from "js-cookie";
import { ListSearch } from "../Cart/ListSearch";
import no_cart from "../../assets/images/no_cart.png";
import axios from "axios";

export const Headers = () => {
  const [dataUser, setDataUser] = useState([]);
  const [quantityCart, setQuantityCart] = useState(0);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/client/search?q=${debouncedQuery}`
        );

        if (response.status === 200) {
          setResults(response.data);
        }
      } catch (error) {}
    };

    fetchData();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const chooseDataQuantity = (i) => {
    setQuantityCart(i);
  };

  const token = Cookies.get("client");
  const list = Cookies.get("_ad");
  const listData = list ? JSON.parse(list) : [];

  const loadData = () => {
    if (token) {
      setDataUser([listData]);
    }
  };

  const handleLogOut = () => {
    Cookies.remove("client");
    Cookies.remove("_ad");
    location.reload();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="wrap_header_client">
        <div className="header_client">
          <div className="wrap_header-img">
            <a href="/">
              <img src={logo} alt="" />
            </a>
          </div>

          <div className="wrap_input-search">
            <input
              type="text"
              placeholder="Nhập tên sản phẩm..."
              name="search"
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowResults(true)}
            />
            <CiSearch size={22} color="000" />
            {showResults && (
              <div
                className="form_item-search"
                onMouseEnter={() => setShowResults(true)}
                onMouseLeave={() => setShowResults(false)}
              >
                <ListSearch data={results} />
              </div>
            )}
          </div>

          <div className="flex items-center ml-8">
            <div className="flex items-center">
              <FiPhoneCall size={26} color="fff" className="mr-3" />
              <div className="text-sm text-white">
                <p>Gọi để đặt hàng</p>
                <p>0862822098 </p>
              </div>
            </div>

            <div className="flex items-center ml-6">
              <CiUser size={26} color="fff" className="mr-3" />
              <div
                className={
                  dataUser.length === 0 ? "text-sm text-white" : "none"
                }
              >
                <p>Tài khoản</p>
                <p>
                  <a href="/account/login">Đăng nhập</a>
                </p>
              </div>

              {dataUser?.map((item, index) => (
                <div
                  className={
                    dataUser.length !== 0 ? "text-sm text-white" : "none"
                  }
                  key={index}
                >
                  <p>Xin chào</p>
                  <p>
                    <a href="/account/change-info">{item.username}</a>
                  </p>
                  <p
                    className="cursor-pointer"
                    onClick={() => {
                      handleLogOut();
                    }}
                  >
                    Đăng xuất
                  </p>
                </div>
              ))}
            </div>

            <div className=" ml-8 wrap_cart">
              <a href="" className="flex items-center">
                <AiOutlineShoppingCart size={26} color="fff" className="mr-3" />
                <p className="text-sm text-white">Giỏ hàng</p>
              </a>
              <div className="quantity_cart">
                <p>{token ? quantityCart : 0}</p>
              </div>
              <div className="list_cart">
                <ListCart onChooseData={chooseDataQuantity} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <Outlet />
      </div>

      <div className="footer">
        <Footer />
      </div>
    </>
  );
};
