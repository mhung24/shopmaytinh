import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { removeFromCart, updateQuantity } from "../Redux/ProductSlice";

export const Cart = () => {
  const url = "http://localhost:3000/products";
  const query = "http://localhost:5173";
  const dispatch = useDispatch();

  const [dataCart, setDataCart] = useState([]);

  const items = useSelector((state) => state.ProductSlice.carts);

  const loadData = () => {
    setDataCart(items);
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    loadData();
  }, [items]);

  return (
    <>
      <div className="mt-4 mb-4 text-sm">
        <NavLink to={"/"}>Trang chủ</NavLink>{" "}
        <span className="about_title">/ Giỏ hàng/</span>
      </div>

      <div className={dataCart.length !== 0 ? "none" : "no_cart"}>
        <img
          src={`//theme.hstatic.net/1000370192/1001217758/14/cart_empty_background.png?v=136`}
          alt=""
        />
        <p className="mt-2 mb-5">Không có sản phẩm nào</p>
        <NavLink
          to="/"
          className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Mua sắm ngay
        </NavLink>
      </div>
      <div className="flex">
        <div className="wrap_list-item-cart">
          {dataCart.map((item, index) => (
            <div key={index} className="wrap_item-cart">
              <div className="wrap_item-cart-img">
                <img src={`${url}/image/${item.image}`} alt="" />
              </div>
              <div className="item-listcart-paynow">
                <p className="item-cart-details-name">{item.title}</p>
                <div className="flex items-center mt-2">
                  <p className="item-cart-details-price">
                    {Intl.NumberFormat("en-US").format(item.price)}₫
                  </p>
                  <span className="mr-2">x</span>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: Number(e.target.value),
                        })
                      )
                    }
                    min="1"
                    className="border p-1 w-16 text-center mx-2"
                  />
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

        <div className={dataCart.length !== 0 ? "wrap_btn-paynow" : "none"}>
          <p className="uppercase font-semibold flex justify-between">
            Tổng cộng :{" "}
            <span className="total_price">
              {Intl.NumberFormat("en-US").format(totalPrice)}₫
            </span>
          </p>
          <p className="text-sm italic text-end">(Đã bao gồm VAT nếu có)</p>

          <div className="btn_cart-pay mt-5">
            <button>
              <a href={`${query}/checkout`}>Thanh toán</a>
            </button>
          </div>
          <div className="btn_cart-pay btn_cart-installment">
            <button>
              <a href="">Mua trả góp</a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
