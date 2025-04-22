import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

export const DetailMyOrders = (props) => {
  const query = "http://localhost:3000";

  const [dpItem, setDpItem] = useState();
  const [dataOrder, setDataOrder] = useState([]);
  const { data, dp, onData, id } = props;

  const loadData = () => {
    if (id) {
      const listData = data?.filter((i) => i.id === id);
      setDataOrder(listData);
    }
    setDpItem(dp);
  };

  console.log(dataOrder);

  const handleClickCancel = async (id) => {
    const response = await axios.put(`${query}/orders/cancel/${id}`, {
      status: "cancelled",
    });

    if (response.status === 200) {
      location.reload();
    }
  };

  useEffect(() => {
    loadData();
  }, [dp]);
  return (
    <div className={dpItem === true ? "model_detail-myorder" : "none"}>
      <div className="wrap_detail_myorder">
        <div
          className="icon_close"
          onClick={() => {
            setDpItem(false);
            onData(false);
          }}
        >
          <IoMdClose />
        </div>
        {dataOrder?.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-lg">
                Chi tiết đơn hàng #{item.id}
              </h1>
              <p className="text-sm">
                Ngày tạo:{" "}
                {new Date(item.createdAt).toLocaleString("vi-VN", {
                  timeZone: "Asia/Ho_Chi_Minh",
                })}
              </p>
            </div>

            <div>
              <div className="flex text-sm mt-2">
                <p className="mr-4">
                  Trạng thái đơn hàng:{" "}
                  <span className="text-red-500 font-semibold">
                    {item.unpaid === "unpaid"
                      ? "Chưa thanh toán"
                      : "Đã thanh toán"}
                  </span>
                </p>

                <p className="mr-4">
                  Trạng thái vận chuyển:{" "}
                  <span className="text-red-500 font-semibold">
                    {item.status === "pending"
                      ? "Đang xử lý"
                      : item.status === "in transit"
                      ? "Đang vận chuyển"
                      : item.status === "completed"
                      ? "Hoàn thành"
                      : "Đã huỷ đơn"}
                  </span>
                </p>
              </div>

              <div className="flex items-start  mt-2">
                <div className="wrap_list-delivery-information mr-10">
                  <h1 className="font-semibold">Thông tin giao hàng</h1>

                  <div>
                    <p className="text-base">{item.customer_name}</p>
                    <p className="text-sm">Địa chỉ: {item.address}</p>
                    <p className="text-sm">Số điện thoại: {item.phone}</p>
                  </div>
                </div>

                <div className="wrap_list-delivery-information">
                  <h1 className="font-semibold">Thanh toán</h1>
                  <div>
                    <p className="text-sm">
                      {item.pay === "COD"
                        ? "Thanh toán khi nhận hàng (COD)"
                        : "Thanh toán qua ATM"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="wrap_list-delivery-information mt-4">
                <table className="list-delivery-information-table">
                  <thead>
                    <tr>
                      <td>Sản phẩm</td>
                      <td>Đơn giá</td>
                      <td>Số lượng</td>
                      <td>Tổng</td>
                    </tr>
                  </thead>

                  <tbody>
                    {item.oderItems?.map((element, index) => (
                      <tr key={index}>
                        <td className="wrap_delivery-information-title">
                          <div className="flex items-start">
                            <div className="w-10">
                              <img
                                src={`${query}/products/image/${element.images}`}
                                alt=""
                              />
                            </div>
                            <p className="table-item-name">
                              <a href="">{element.name}</a>
                            </p>
                          </div>
                        </td>

                        <td>
                          {Intl.NumberFormat("en-US").format(element.price)} ₫
                        </td>
                        <td>{element.stock}</td>
                        <td>
                          {Intl.NumberFormat("en-US").format(
                            element.price * element.stock
                          )}{" "}
                          ₫
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-end">
                <p className="mt-3 text-sm">Khuyến mãi : 0đ</p>
                <p className="mt-3 text-sm">
                  Phí vận chuyển: 0đ
                  <span className="ml-1 italic">
                    (
                    {item.delivery === "home delivery"
                      ? "Giao tận nơi"
                      : "Nhận tại cửa hàng"}
                    )
                  </span>
                </p>

                <p className="mt-3 text-sm">
                  Tổng tiền:{" "}
                  <span className="text-red-500 font-semibold">
                    {item.unpaid === "paid"
                      ? "0đ"
                      : `${Intl.NumberFormat("en-US").format(
                          item.total_price
                        )} ₫`}
                  </span>
                </p>
              </div>
            </div>

            <div className="text-end mt-4">
              <button
                onClick={() => handleClickCancel(item.id)}
                className={
                  item.status === "cancelled" ||
                  item.status === "in transit" ||
                  item.status === "completed"
                    ? "none"
                    : "myorder_btn myorder_btn-canel"
                }
              >
                Huỷ đơn
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
