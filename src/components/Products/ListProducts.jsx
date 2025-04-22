import React, { useEffect, useState } from "react";
import "./ListProducts.css";
import ApiService from "../Api/ApiService";
import { MdOutlineShoppingCart } from "react-icons/md";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/ProductSlice";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export const ListProducts = (props) => {
  const url = "http://localhost:3000";
  const { item, name } = props;
  const [listData, setListData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadData = async () => {
    const res = await ApiService.ApiProductByCategoryID(item);
    if (res.status === 200) {
      setListData(res.data);
    }
  };

  const token = Cookies.get("client");

  const handleClick = (item) => {
    if (token) {
      toast.success("Thêm sản phẩm thành công");
      dispatch(
        addToCart({
          id: item.product_id,
          title: item.name,
          price: item.cost_price,
          image: item.image,
          quantity: 1,
        })
      );
    } else {
      navigate("/account/login");
    }
  };

  console.log(123);

  useEffect(() => {
    loadData(addToCart(item));
  }, []);

  return (
    <div className="content_list-product">
      <h1>{name}</h1>
      <div className="wrap_list_product ">
        {listData
          ? listData.map((item, index) => (
              <div key={index} className="list_products">
                <div className="text-center ">
                  <a href={`products/${item.product_id}`}>
                    <img
                      src={
                        item.image
                          ? `${url}/products/image/${item.image}`
                          : `${url}/products/image/1741338590275_no_img.jpg`
                      }
                      alt=""
                      className="list_product-images"
                    />
                  </a>
                </div>
                <p className="list_product-name">
                  <a href={`products/${item.product_id}`}>{item.name}</a>
                </p>
                <div className="flex ml-2">
                  <p
                    className={
                      item.compare_price === item.cost_price
                        ? "none"
                        : "list_product-compare_price"
                    }
                  >
                    {Intl.NumberFormat("en-US").format(item.compare_price)}₫
                  </p>
                  <p
                    className={
                      item.cost_price - item.compare_price !== 0
                        ? "list_product-percent"
                        : "none"
                    }
                  >
                    ( Tiết kiệm:{" "}
                    {100 -
                      Math.round((item.cost_price / item.compare_price) * 100)}
                    %)
                  </p>
                </div>
                <p className="list_product-price">
                  {Intl.NumberFormat("en-US").format(item.cost_price)}₫
                </p>
                <div className="flex mr-2 ml-2 justify-end mb-3">
                  <div className="list_product-add_cart">
                    <button
                      onClick={() => {
                        handleClick(item);
                      }}
                    >
                      <MdOutlineShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};
