import React, { useEffect, useState } from "react";
import ApiService from "../Api/ApiService";
import "./AccountClient.css";
import { DetailMyOrders } from "./DetailMyOrders";
import { FaCaretDown } from "react-icons/fa6";
import { FaCaretRight } from "react-icons/fa6";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const ListMyOders = (props) => {
  const dataCookei = Cookies.get("_ad");
  const dataUser = dataCookei ? JSON.parse(dataCookei) : [];
  const url = "http://localhost:5173";
  const query = "http://localhost:3000";
  const [dp, setDp] = useState(false);
  const [dpInforOrder, setDpInforOder] = useState();
  const [dataOrder, setDataOrder] = useState([]);
  const [idDetail, setIdDetail] = useState();
  const loadData = async () => {
    const res = await ApiService.ApiOrderById(dataUser.id);
    const { orders } = res.data;
    if (res.status === 200) {
      setDataOrder(orders);
    }
  };

  const handleClick = (i) => {
    setDpInforOder(i);
  };

  const handleClickCancel = async (id) => {
    const response = await axios.put(`${query}/orders/cancel/${id}`, {
      status: "cancelled",
    });

    console.log(response);

    if (response.status === 200) {
      toast.success("Huỷ đơn thành công");
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  };

  console.log(dataOrder);

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Mã đơn hàng</td>
            <td>Ngày đặt</td>
            <td>Thành tiền</td>
            <td>TT thanh toán</td>
            <td>TT vận chuyển</td>
          </tr>
        </thead>

        <>
          {dataOrder.map((item, index) => (
            <tbody key={index}>
              <tr key={index}>
                <td>
                  <div className="flex items-center">
                    <div
                      className={
                        dpInforOrder === index ? "none" : "mr-1 cursor-pointer"
                      }
                      onClick={() => {
                        handleClick(index);
                      }}
                    >
                      <FaCaretRight />
                    </div>

                    <div
                      className={
                        dpInforOrder === index ? "mr-1 cursor-pointer" : "none"
                      }
                      onClick={() => {
                        setDpInforOder();
                      }}
                    >
                      <FaCaretDown />
                    </div>
                    <p># {item.id}</p>
                  </div>
                </td>
                <td>
                  {new Date(item.createdAt).toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                  })}
                </td>

                <td>{Intl.NumberFormat("en-US").format(item.total_price)} ₫</td>
                <td>
                  {item.unpaid === "unpaid"
                    ? "Chưa thanh toán"
                    : "Đã thanh toán"}
                </td>
                <td>
                  {item.status === "pending"
                    ? "Đang xử lí"
                    : item.status === "in transit"
                    ? "Đang vận chuyển"
                    : item.status === "completed"
                    ? "Hoàn thành"
                    : "Đã huỷ"}
                </td>
              </tr>

              <tr className={dpInforOrder === index ? "" : "none"}>
                <td colSpan={10}>
                  <div className="list_myorders-infor-cus">
                    {item.oderItems?.map((element, index) => (
                      <div key={index} className=" wrap_list-infor-customer">
                        <div className="list_myorders-infor-cus-img">
                          <img
                            src={`${query}/products/image/${element.images}`}
                            alt=""
                          />
                        </div>
                        <div>
                          <div className="wrap_table-break-word">
                            <p className="table-break-word">
                              <a href={`${url}/products/${element.product_id}`}>
                                {element.name}
                              </a>
                            </p>

                            <p>x {element.stock}</p>
                          </div>
                          <p className="text-end ">
                            {Intl.NumberFormat("en-US").format(element.price)} ₫
                          </p>
                        </div>
                      </div>
                    ))}
                    <p className="text-end mt-2 font-semibold">
                      Tổng cộng :{" "}
                      {Intl.NumberFormat("en-US").format(item.payable)} ₫
                    </p>
                  </div>
                </td>
              </tr>

              <tr className={dpInforOrder === index ? "" : "none"}>
                <td colSpan={10}>
                  <div className="text-end mt-2 mb-2">
                    <button
                      className="myorder_btn myorder_btn-detail"
                      onClick={() => {
                        setDp(true);
                        setIdDetail(item.id);
                      }}
                    >
                      Chi tiết đơn hàng
                    </button>
                    <button
                      className={
                        item.status === "cancelled" ||
                        item.status === "in transit" ||
                        item.status === "completed"
                          ? "none"
                          : "myorder_btn myorder_btn-canel"
                      }
                      onClick={() => handleClickCancel(item.id)}
                    >
                      Huỷ đơn hàng
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </>
      </table>
      <p
        className={dataOrder.length === 0 ? "text-center mt-4 italic" : "none"}
      >
        Không có đơn hàng nào
      </p>

      <>
        <DetailMyOrders
          data={dataOrder}
          dp={dp}
          onData={(i) => {
            setDp(i);
          }}
          id={idDetail}
        />
      </>
    </div>
  );
};
