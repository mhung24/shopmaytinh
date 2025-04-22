import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import "./ListCustomerAdmin.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const ListCustomerAdmin = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.ProductSlice.userClient);
  const listDetail = useSelector((state) => state.ProductSlice.listOrders);
  const commonIds = listDetail.filter((item1) =>
    data.some((item2) => item1.user_id === item2.user_id)
  );

  const [list, setList] = useState({
    user_id: "",
    total: 0,
    total_price: 0,
  });

  const loadData = () => {
    commonIds?.map((item) => {
      item.oderItems?.map((e) => {
        setList({
          ...list,
          user_id: item.user_id,
          total: (list.total += e.stock),
          total_price: (list.total_price += Number(item.total_price)),
        });
      });
    });
  };

  useEffect(() => {
    loadData();
  }, [data]);

  return (
    <div>
      <p>Danh sách khách hàng</p>
      <div className="content_list mb-20 content_admin-customer">
        <p className="p-4">Tất cả khách hàng</p>

        <form className="wrap_form-search-customer ml-4 mr-4">
          <IoSearch />
          <input type="text" name="search_customer" />
        </form>

        <p className="text-sm mt-2 ml-4 mr-4">Có 100 khách hàng</p>

        <table className="table_customer-admin">
          <thead>
            <tr>
              <th>Khách hàng</th>
              <th>Điện thoại</th>
              <th>Địa chỉ </th>
              <th>SL đơn hàng</th>
              <th>Nợ phải thu</th>
              <th>Tổng chi tiêu</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item, index) => (
              <tr
                key={index}
                onClick={() => {
                  navigate(`/admin/customer/${item.user_id}`);
                }}
                className="cursor-pointer"
              >
                <td>{item.fullName}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.user_id === list.user_id ? list.total : 0}</td>
                <td>0đ</td>
                <td>
                  {item.user_id === list.user_id
                    ? `${Intl.NumberFormat("en-US").format(list.total_price)} ₫`
                    : 0}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
