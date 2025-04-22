import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FcStatistics } from "react-icons/fc";
import "./ListCustomerAdmin.css";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

export const DetailCustomerAdmin = () => {
  const { id } = useParams();

  const data = useSelector((state) => state.ProductSlice.userClient);

  const listDetail = useSelector((state) => state.ProductSlice.listOrders);
  const listData = data?.filter((i) => i.user_id == id);

  const commonIds = listDetail.filter((item1) =>
    listData.some((item2) => item1.user_id === item2.user_id)
  );

  const [list, setList] = useState({
    total: 0,
    total_price: 0,
  });

  const loadData = () => {
    commonIds?.map((item) => {
      item.oderItems?.map((e) => {
        setList({
          ...list,
          total: (list.total += e.stock),
          total_price: (list.total_price += Number(item.total_price)),
        });
      });
    });
  };

  console.log(listData);
  let sum = 0;

  useEffect(() => {
    loadData();
  }, [data]);

  return (
    <>
      {listData?.map((e, index) => (
        <div key={index} className="content_customer-detail pb-14">
          <div>
            <div className="detail_customer-left">
              <div className="flex items-center">
                <span className="hrv-avatar undefined  hrv-avatar-circle">
                  <span>H</span>
                </span>
                <p className=" ml-2 font-semibold text-lg">{e.fullName}</p>
              </div>

              <div className="flex mt-3 ">
                <div className="mr-5">
                  <div className="list_detail-customer-order">
                    <div className="flex items-center">
                      <FaRegHeart size={20} />
                      <p className="text-base italic ml-3">
                        Đã gắn bó với cửa hàng
                      </p>
                    </div>
                    <p className="text-sm font-semibold italic mt-4">
                      100 ngày
                    </p>
                  </div>

                  <div className="list_detail-customer-order">
                    <div className="flex items-center">
                      <FiShoppingBag size={20} />
                      <p className="text-base italic ml-3">Tổng số đơn hàng</p>
                    </div>
                    <p className="text-sm font-semibold italic mt-4">
                      {commonIds?.length} đơn
                    </p>
                  </div>

                  <div className="list_detail-customer-order">
                    <div className="flex items-center">
                      <RiMoneyDollarCircleLine size={20} />
                      <p className="text-base italic ml-3">Tổng chi tiêu</p>
                    </div>
                    <p className="text-sm font-semibold italic mt-4">
                      {Intl.NumberFormat("en-US").format(list.total_price)} ₫
                    </p>
                  </div>
                </div>

                <div>
                  <div className="list_detail-customer-statistics">
                    <div className="flex items-center justify-center">
                      <FcStatistics size={20} />
                      <p className="text-sm italic ml-3">Thống kê chi tiêu</p>
                    </div>

                    <p className="text-base text-center mt-10 italic ml-3">
                      Chưa có thông kê
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="detai_customer-list-myorder">
              <div className="detail_customer-list-myorder-title">
                <p className="text-base font-semibold">Đơn hàng</p>
              </div>

              {commonIds.length > 0 ? (
                commonIds?.map((item, index) => (
                  <div
                    key={index}
                    className={
                      item.status === "cancelled"
                        ? "detail_customer-list-myorder-ordes text-red-500"
                        : "detail_customer-list-myorder-ordes text-blue-500"
                    }
                  >
                    <div>
                      <p className="text-sm ">
                        <NavLink to={`/admin/orders/${item.id}`}>
                          Mã đơn hàng #{item.id}
                        </NavLink>
                      </p>
                      <p className="text-sm  italic">
                        {Intl.NumberFormat("en-US").format(item.total_price)} ₫
                      </p>
                    </div>

                    <p className="text-sm ">
                      {" "}
                      {new Date(item.createdAt).toLocaleString("vi-VN", {
                        timeZone: "Asia/Ho_Chi_Minh",
                      })}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center italic text-sm">
                  Không có đơn hàng nào
                </p>
              )}
            </div>
          </div>
          <div className="detail_customer-right">
            <div className="customer_detail-infor">
              <p className="font-semibold text-base ">Thông tin liên hệ</p>
              <p className="text-sm text-blue-500 italic font-semibold mt-2">
                {e.email}
              </p>
              <p className="text-sm text-blue-500 italic font-semibold mt-2">
                {e.phone}
              </p>
            </div>

            <div className="customer_detail-infor mt-2">
              <p className="font-semibold text-base">Địa chỉ giao hàng</p>
              <p className="text-sm text-blue-500 italic font-semibold mt-2">
                {e.fullName}
              </p>
              <p className="text-sm text-blue-500 italic font-semibold mt-2">
                {e.address}
              </p>
              <p className="text-sm text-blue-500 italic font-semibold mt-2">
                {e.phone}
              </p>
            </div>

            <div className="customer_detail-infor mt-2">
              <p className="font-semibold text-base">Thông tin hoá đơn</p>
              <p className="text-sm italic  mt-2">Chưa có</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
