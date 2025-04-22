import React, { useEffect, useState } from "react";
import "./CheckOut.css";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearCart } from "../Redux/ProductSlice";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import PaymentQRCode from "../QrPay/PaymentQRCode";
import { useNavigate } from "react-router-dom";

export const CheckOuts = () => {
  const listCookiesUser = Cookies.get("_ad");
  const dataCookiesUser = listCookiesUser ? JSON.parse(listCookiesUser) : [];
  const url = "http://localhost:3000";
  const dispatch = useDispatch();
  const [successTrue, setSuccessTrue] = useState(false);
  const [trueATM, setTrueATM] = useState(false);
  const [payATM, setPayATM] = useState();
  const navigate = useNavigate();

  const items = useSelector((state) => state.ProductSlice.carts);
  console.log(items);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // if (items.length === 0) {
  //   navigate("/cart");
  // }

  const [dataRadio, setDataRadio] = useState({
    user_id: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    delivery: "",
    pay: "",
    total: 0,
    list_product: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataRadio({
      ...dataRadio,
      [name]: value,
    });
  };

  const loadData = () => {
    setDataRadio({
      ...dataRadio,
      user_id: dataCookiesUser.id,
      fullName: dataCookiesUser.fullName,
      email: dataCookiesUser.email,
      phone: dataCookiesUser.phone,
      address: dataCookiesUser.address,

      total: totalPrice,
      list_product: items?.map((i) => ({
        product_id: i.id,
        user_id: dataCookiesUser.id,
        images: i.image,
        name: i.title,
        price: i.price,
        stock: i.quantity,
      })),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        items.length !== 0 ||
        (dataRadio.delivery !== "" && dataRadio.pay !== "")
      ) {
        const response = await axios.post(`${url}/orders/create`, dataRadio);
        if (response.status === 200) {
          setSuccessTrue(true);
          setTimeout(() => {
            navigate("/");
            dispatch(clearCart());
          }, 4000);
        }
      } else {
        console.log(1);
      }
    } catch (error) {}
  };

  const handleClick = () => {
    // if (dataRadio.pay === "ATM") {
    //   setPayATM(true);
    //   setTrueATM(false);
    // }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="wrap_checkouts">
      <div className="wrap_checkout-infor-user">
        <p className="text-xl uppercase font-semibold">mhungcomputer</p>
        <div className={successTrue === true || payATM === false ? "none" : ""}>
          <div className="flex align-center text-sm mt-3 mb-3">
            <a href="">Giỏ hàng </a>
            <p> / Thông tin giao hàng </p>
          </div>

          <p className="font-semibold text-lq mb-3">Thông tin giao hàng</p>

          <form onSubmit={handleSubmit}>
            <div className="wrap_input-infor-user">
              <p>Họ và tên</p>
              <input
                type="text"
                name="fullName"
                value={dataRadio?.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="wrap_input-infor-user">
              <p>Email</p>
              <input
                type="email"
                value={dataRadio?.email}
                name="email"
                onChange={handleChange}
              />
            </div>

            <div className="wrap_input-infor-user">
              <p>Số điện thoại</p>
              <input
                type="text"
                value={dataRadio?.phone}
                name="phone"
                onChange={handleChange}
              />
            </div>
            <p className="font-semibold text-lq mt-3">Phương thức vận chuyển</p>

            <div className="content-box ">
              <div>
                <div className="wrap_radio">
                  <input
                    className="radio"
                    type="radio"
                    value={"home delivery"}
                    name="delivery"
                    onChange={handleChange}
                  />{" "}
                  Giao tận nơi
                </div>
                <div
                  className={
                    dataRadio.delivery === "home delivery"
                      ? "wrap_field-required"
                      : "none"
                  }
                >
                  <div className="wrap_input-infor-user field-required">
                    <p>Địa chỉ</p>
                    <input
                      type="text"
                      value={dataRadio?.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="wrap_radio bd_wrap-radio">
                  <input
                    type="radio"
                    name="delivery"
                    value={"in store"}
                    onChange={handleChange}
                  />{" "}
                  Nhận tại cửa hàng
                </div>
                <div>
                  <div
                    className={
                      dataRadio.delivery === "in store"
                        ? "wrap_field-required"
                        : "none"
                    }
                  >
                    <div className="wrap_input-infor-user field-required">
                      <p>Địa chỉ</p>
                      <input
                        type="text"
                        value={
                          "Đường Phù Nghĩa, phường Lộc Hạ, thành phố Nam Định, tỉnh Nam Định"
                        }
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="font-semibold text-lq mt-3">Phương thức thanh toán</p>

            <div className="content-box ">
              <div>
                <div className="wrap_radio">
                  <input
                    className="radio"
                    type="radio"
                    value={"COD"}
                    name="pay"
                    onChange={handleChange}
                  />{" "}
                  Thanh toán khi giao hàng (COD)
                </div>
              </div>

              <div>
                <div className="wrap_radio bd_wrap-radio">
                  <input
                    type="radio"
                    name="pay"
                    value={"ATM"}
                    onChange={handleChange}
                  />{" "}
                  Chuyển khoản qua ngân hàng
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button onClick={handleClick} className="checkout_btn-paynow">
                Thanh toán
              </button>
            </div>
          </form>
        </div>

        <div className={successTrue === true ? "" : "none"}>
          <div className="flex align-center">
            <IoCheckmarkDoneOutline size={27} />
            <p className="ml-2 text-xl">Đặt hàng thành công</p>
          </div>
          <p className="italic font-sm">
            ( Đơn hàng sẽ được giao trong 2 - 3 ngày tới. Quý khách vui lòng để
            ý điện thoại)
          </p>

          <div className="infor_order">
            <h1>Thông tin giao hàng</h1>
            <p>{dataRadio?.fullName}</p>
            <p>{dataRadio?.phone}</p>

            <p>{dataRadio?.address}</p>

            <h1>Phương thức thanh toán</h1>
            <p>{dataRadio?.delivery}</p>
          </div>
        </div>

        {/* <div className={payATM === true || trueATM === false ? "" : "none"}>
          <PaymentQRCode amount={totalPrice} onChosseData={checkATM} />
        </div> */}
      </div>

      <div className="wrap_checkout-infor ml-10">
        <div className="wrap_checkout-infor-item">
          {items?.map((item, index) => (
            <div key={index} className="list_checkout-infor">
              <div className="check_out-infor-img">
                <img src={`${url}/products/image/${item.image}`} alt="" />
              </div>

              <div className="check_out-infor-title">
                <p>{item.title}</p>
              </div>

              <div>
                <p>{Intl.NumberFormat("en-US").format(item.price)} ₫</p>
              </div>
            </div>
          ))}
        </div>

        <div className="wrap_checkout-infor-item">
          <p className="mt-4 mb-4">
            Tạm tính: {Intl.NumberFormat("en-US").format(totalPrice)} ₫
          </p>
          <p className="mt-4 mb-4">Phí vận chuyển: Miễn phí</p>
        </div>

        <div>
          <p className="mt-4 mb-4">
            Tổng cộng: {Intl.NumberFormat("en-US").format(totalPrice)} ₫{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
