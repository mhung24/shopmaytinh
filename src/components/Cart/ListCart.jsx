import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import "./ListCart.css";
import { IoCloseSharp } from "react-icons/io5";
import { removeFromCart } from "../Redux/ProductSlice";

export const ListCart = (props) => {
  const query = "http://localhost:5173";
  const { onChooseData } = props;
  const url = "http://localhost:3000/products";
  const [dataCart, setDataCart] = useState([]);

  const items = useSelector((state) => state.ProductSlice.carts);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const dispatch = useDispatch();

  const token = Cookies.get("client");
  const loadData = () => {
    setDataCart(items);
    onChooseData(totalQuantity);
  };

  useEffect(() => {
    loadData();
  }, [items]);

  return (
    <>
      <div className={token ? "none" : "text-center mt-20"}>
        <p>Vui lòng đăng nhập để xem giỏ hàng</p>
      </div>
      <div className={token ? "wrap_list-cart" : "none"}>
        <div className={dataCart.length !== 0 ? "none" : "no_cart"}>
          <img
            src={`//theme.hstatic.net/1000370192/1001217758/14/cart_empty_background.png?v=136`}
            alt=""
          />
          <p className="mt-2">Không có sản phẩm nào</p>
        </div>
        {dataCart.map((item, index) => (
          <div key={index} className="wrap_item-cart">
            <div className="wrap_item-cart-img">
              <img src={`${url}/image/${item.image}`} alt="" />
            </div>
            <div className="item-cart-details">
              <p className="item-cart-details-name">{item.title}</p>
              <div className="flex items-start">
                <p className="item-cart-details-price">
                  {Intl.NumberFormat("en-US").format(item.price)}₫
                </p>
                <span className="mr-2">x</span>
                <p>{item.quantity}</p>
              </div>
            </div>
            <button
              className="cursor-pointer"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              <IoCloseSharp />
            </button>
          </div>
        ))}
      </div>

      <div className={token ? "mt-2 pl-3 pr-3" : "none"}>
        <p>
          Tổng cộng :{" "}
          <span className="total_price">
            {Intl.NumberFormat("en-US").format(totalPrice)}₫
          </span>
        </p>
        <button className="header_btn-pay">
          <a href={`${query}/cart`}>Thanh toán</a>
        </button>
      </div>
    </>
  );
};
