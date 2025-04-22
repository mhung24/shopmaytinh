import { toString } from "qrcode";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const DetailOrderAdmin = () => {
  const { id } = useParams();
  const query = "http://localhost:3000";

  const listDetail = useSelector((state) => state.ProductSlice.listOrders);

  const data = listDetail?.filter((i) => i.id == id);
  console.log(data);
  const total = data[0]?.oderItems.reduce((sum, num) => sum + num.stock, 0);

  const handleChange = () => {};
  return (
    <>
      {data?.map((item, index) => (
        <div key={index} className="content_detail_admin-order">
          <div className="flex justify-between">
            <div className="flex">
              <div className="mr-6">
                <p className="text-lg text-gray-500 font-semibold">Mã</p>
                <p className="text-lg font-bold">#{item.id}</p>
              </div>
              <div className="mr-6">
                <p className="text-lg text-gray-500 font-semibold">
                  Tình trạng đơn hàng
                </p>
                <div
                  className={
                    item.status === "pending"
                      ? "omni-badge order-status-badge-warning"
                      : item.status === "in transit"
                      ? "omni-badge order-status-badge-info"
                      : item.status === "completed"
                      ? "omni-badge order-status-badge-success"
                      : "omni-badge order-status-badge-error"
                  }
                >
                  <p>
                    {item.status === "pending"
                      ? "Đang xử lí"
                      : item.status === "in transit"
                      ? "Đang vận chuyển"
                      : item.status === "completed"
                      ? "Hoàn thành"
                      : "Đã huỷ"}
                  </p>
                </div>
              </div>
              <div className="mr-6">
                <p className="text-lg text-gray-500 font-semibold">
                  Tình trạng thanh toán
                </p>
                <div
                  className={
                    item.unpaid === "paid"
                      ? "omni-badge order-status-badge-success"
                      : "omni-badge order-status-badge-info"
                  }
                >
                  <p>
                    {item.unpaid === "paid"
                      ? "Đã thanh toán"
                      : "Chưa thanh toán"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <button className="btn_print">In</button>
            </div>
          </div>

          <div className="flex mt-8">
            <div className="content_detail_admin-order-item">
              <div className=" bg-white rounded-sm">
                <div
                  className={
                    item.status === "pending"
                      ? "omni-badge order-status-badge-warning mt-4 ml-4"
                      : item.status === "in transit"
                      ? "omni-badge order-status-badge-info mt-4 ml-4"
                      : item.status === "completed"
                      ? "omni-badge order-status-badge-success mt-4 ml-4"
                      : "omni-badge order-status-badge-error mt-4 ml-4"
                  }
                >
                  <p>
                    {item.status === "pending"
                      ? "Đang xử lí"
                      : item.status === "in transit"
                      ? "Đang vận chuyển"
                      : item.status === "completed"
                      ? "Hoàn thành"
                      : "Đã huỷ"}
                  </p>
                </div>

                <table className="table_detail-order-admin">
                  <thead>
                    <tr>
                      <td></td>
                      <td>Số lượng</td>
                      <td>Giá</td>
                      <td>Thành tiền</td>
                    </tr>
                  </thead>

                  <tbody>
                    {item.oderItems?.map((element, index) => (
                      <tr key={index}>
                        <td className="flex" width={636}>
                          <div className="table_detail-order-admin-img">
                            <img
                              src={`${query}/products/image/${element.images}`}
                              alt=""
                            />
                          </div>

                          <p className="table-break-word-admin">
                            {element.name}
                          </p>
                        </td>

                        <td>{element.stock}</td>
                        <td>
                          {Intl.NumberFormat("en-US").format(element.price)} ₫
                        </td>
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

              <div className="bg-white mt-6 rounded-sm">
                <div className="omni-badge order-status-badge-error mt-4 mb-4 ml-4">
                  <p>Đã huỷ</p>
                </div>

                <div className="flex omni-badge-border ">
                  <div className="omni-layout-card--section ">
                    <div className="omni-layout-card--section-input">
                      <p className="font-semibold text-base italic">Ghi chú</p>
                      <input
                        type="text"
                        placeholder="Thêm ghi chú cho đơn hàng"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="omni-layout-card--section-input">
                      <p className="font-semibold text-base italic">
                        Thời gian giao hàng
                      </p>
                      <input
                        type="text"
                        onChange={handleChange}
                        value={new Date(item.createdAt).toLocaleDateString(
                          "vi-VN",
                          {
                            timeZone: "Asia/Ho_Chi_Minh",
                          }
                        )}
                      />
                    </div>

                    <div className="omni-layout-card--section-input">
                      <p className="font-semibold text-base italic">
                        Xuất hoá đơn
                      </p>
                      <input
                        type="text"
                        value={"Không"}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="omni-layout-card--section">
                    <div className="flex justify-between text-base italic mt-2">
                      <p>Số lượng sản phẩm</p>
                      <p>{total}</p>
                    </div>

                    <div className="flex justify-between text-base italic mt-2">
                      <p>Tổng tiền hàng</p>
                      <p>
                        {" "}
                        {Intl.NumberFormat("en-US").format(item.total_price)} ₫
                      </p>
                    </div>

                    <div className="flex justify-between text-base italic mt-2">
                      <p>Giảm giá</p>
                      <p>0₫</p>
                    </div>

                    <div className="flex justify-between text-base font-bold italic mt-2">
                      <p>Tổng giá trị đơn hàng</p>
                      <p>
                        {" "}
                        {Intl.NumberFormat("en-US").format(item.total_price)} ₫
                      </p>
                    </div>
                    <p className="text-sm italic">
                      (
                      {item.delivery === "home delivery"
                        ? "Giao tận nơi"
                        : "Nhận tại cửa hàng"}
                      )
                    </p>

                    <div className="flex justify-between text-base font-bold italic mt-2">
                      <p>Đã thanh toán</p>
                      <p>
                        {item.payable === 0
                          ? `${Intl.NumberFormat("en-US").format(
                              item.total_price
                            )}₫`
                          : `0₫`}
                      </p>
                    </div>

                    <div className="flex justify-between text-base italic mt-2">
                      <p>Đã hoàn trả</p>
                      <p>0₫</p>
                    </div>

                    <div className="flex justify-between text-base italic mt-2">
                      <p>Thực nhận</p>

                      <p>
                        {item.payable !== 0
                          ? `${Intl.NumberFormat("en-US").format(
                              item.total_price
                            )}₫`
                          : `0₫`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content_detail_admin-order-infor-customer">
              <div className="detail_admin-order-infor-customer-title">
                <p className="font-semibold">Thông tin người mua</p>
              </div>

              <div className="detail_admin-order-infor-customer-title">
                <p className="mt-2 mb-2 text-sm">{item.customer_name}</p>
                <p className="mt-2 mb-2 text-sm">{item.customer_email}</p>
              </div>

              <div className="detail_admin-order-infor-customer-title">
                <p className="font-semibold">Thông tin giao hàng</p>
                <p className="mt-2 mb-2 text-sm">{item.customer_name}</p>
                <p className="mt-2 mb-2 text-sm">{item.customer_email}</p>
                <p className="font-semibold">Địa chỉ giao hàng</p>
                <p className="mt-2 mb-2 text-sm">{item.address}</p>
              </div>

              <div className="detail_admin-order-infor-customer-title">
                <p className="font-semibold">Ghi chú</p>
                <p className="mt-2 mb-2 text-sm italic text-gray-400">Không</p>
              </div>

              <div className="p-4">
                <p className="font-semibold">Nhân viên tạo</p>
                <p className="mt-2 mb-2 text-sm italic text-gray-400">ADMIN</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
