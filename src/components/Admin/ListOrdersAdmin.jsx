import React, { useEffect, useState } from "react";
import "./Account.css";
import ApiService from "../Api/ApiService";
import { FaCaretDown } from "react-icons/fa6";
import { FaCaretRight } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ListOrdersAdmin = () => {
  const [listOrders, setListOrders] = useState([]);
  const navigate = useNavigate();
  const url = "http://localhost:5173";
  const query = "http://localhost:3000";
  const [dpInforOrder, setDpInforOder] = useState();

  const loadData = async () => {
    const res = await ApiService.ApiDataOrders();
    const { orders } = res.data;
    setListOrders(orders);
  };

  const handleClick = (i) => {
    setDpInforOder(i);
  };

  const handleClickCancel = async (id) => {
    const response = await axios.put(`${query}/orders/cancel/${id}`, {
      status: "cancelled",
    });

    if (response.status === 200) {
      location.reload();
    }
  };

  const handleClickInTransit = async (id) => {
    const response = await axios.put(`${query}/orders/in-transit/${id}`, {
      status: "in transit",
    });

    if (response.status === 200) {
      location.reload();
    }
  };

  const handleClickCompleted = async (id) => {
    const response = await axios.put(`${query}/orders/completed/${id}`, {
      status: "completed",
      unpaid: "paid",
    });

    if (response.status === 200) {
      location.reload();
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <p>Danh sách đơn hàng</p>

      <div className="content_list-table-orders mb-20 p-0">
        <table className="table_admin-list-order">
          <thead>
            <tr>
              <td>Mã đơn hàng</td>
              <td>Ngày tạo</td>
              <td>Khách hàng</td>
              <td>Thanh toán</td>
              <td>Giao hàng</td>
              <td>Tổng tiền</td>
            </tr>
          </thead>

          {listOrders.map((item, index) => (
            <tbody key={index}>
              <tr key={index} className="table_admin-list-order-td">
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

                <td>{item.customer_name}</td>
                <td>
                  <div
                    className={
                      item.unpaid === "unpaid"
                        ? "omni-badge order-status-badge-warning"
                        : "omni-badge order-status-badge-success"
                    }
                  >
                    {item.unpaid === "unpaid"
                      ? "Chưa thanh toán"
                      : "Đã thanh toán"}
                  </div>
                </td>
                <td>
                  <div
                    className={
                      item.status === "pending"
                        ? "omni-badge order-status-badge-info"
                        : item.status === "in transit"
                        ? "omni-badge order-status-badge-warning"
                        : item.status === "completed"
                        ? "omni-badge order-status-badge-success"
                        : "omni-badge order-status-badge-error"
                    }
                  >
                    {item.status === "pending"
                      ? "Đang xử lí"
                      : item.status === "in transit"
                      ? "Đang vận chuyển"
                      : item.status === "completed"
                      ? "Hoàn thành"
                      : "Đã huỷ"}
                  </div>
                </td>
                <td>{Intl.NumberFormat("en-US").format(item.total_price)} ₫</td>
              </tr>

              <tr className={dpInforOrder === index ? "" : "none"}>
                <td colSpan={10}>
                  <div className="flex">
                    <div className="list_myorders-infor-cus admin_infor-cus">
                      {item.oderItems?.map((element, index) => (
                        <div key={index} className=" wrap_list-infor-customer ">
                          <div className="list_myorders-infor-cus-img">
                            <img
                              src={`${query}/products/image/${element.images}`}
                              alt=""
                            />
                          </div>
                          <div>
                            <div className="wrap_table-break-word admin_table-break-word">
                              <p className="table-break-word">
                                <a>{element.name}</a>
                              </p>

                              <p>x {element.stock}</p>
                            </div>
                            <p className="text-end ">
                              {Intl.NumberFormat("en-US").format(element.price)}{" "}
                              ₫
                            </p>
                          </div>
                        </div>
                      ))}
                      <p className="text-end mt-2 font-semibold">
                        Tổng cộng :{" "}
                        {Intl.NumberFormat("en-US").format(item.total_price)} ₫
                      </p>
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">Thông tin giao hàng</p>
                      <div>
                        <p className="text-blue-600 font-bold">
                          <a href="">{item.customer_name}</a>
                        </p>
                        <p>{item.address}</p>
                        <p>{item.phone}</p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>

              <tr className={dpInforOrder === index ? "" : "none"}>
                <td colSpan={10}>
                  <div className="text-end mt-2 mb-2">
                    <button
                      className={
                        item.status === "cancelled" ||
                        item.status === "in transit" ||
                        item.status === "completed"
                          ? "none"
                          : "myorder_btn myorder_btn-detail"
                      }
                      onClick={() => {
                        handleClickInTransit(item.id);
                      }}
                    >
                      Xác thực đơn hàng
                    </button>
                    <button
                      className="myorder_btn myorder_btn-detail"
                      onClick={() => {
                        navigate(`/admin/orders/${item.id}`);
                      }}
                    >
                      Chi tiết đơn hàng
                    </button>
                    <button
                      className={
                        Number(item.payable) === 0 ||
                        item.status === "cancelled" ||
                        item.unpaid === "paid" ||
                        item.status === "completed"
                          ? "none"
                          : "myorder_btn myorder_btn-detail"
                      }
                      onClick={() => handleClickCompleted(item.id)}
                    >
                      Xác nhận đã thanh toán{" "}
                      {Intl.NumberFormat("en-US").format(item.payable)} ₫
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
        </table>
      </div>
    </div>
  );
};
