import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import no_avatar from "../../assets/images/no_avatar.png";
import Cookies from "js-cookie";
import "./Admin.css";
import "./Account.css";
import { data, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export const AccountAdmin = () => {
  const [ip, setIp] = useState("");
  const [listUser, setListUser] = useState({
    id: "",
    username: "",
    email: "",
    fullName: "",
    password: "",
    phone: "",
    role: "",
    login: [],
  });
  const navigate = useNavigate();
  const handleLogOut = async () => {
    const res = await axios.put(
      `http://localhost:3000/users/upload/history/${ip}`
    );

    if (res.status === 200) {
      Cookies.remove("data");
      Cookies.remove("token");
      navigate("/admin/login");
      window.location.reload();
    }
  };

  const loadData = async () => {
    const list = JSON.parse(localStorage.getItem("data"));

    if (list) {
      setListUser({
        username: list.username,
        id: list.id,
        email: list.email,
        fullName: list.fullName,
        password: list.password,
        phone: list.phone,
        role: list.role,
        login: list.login.reverse(),
      });
    }
  };

  console.log(listUser);

  const getToken = Cookies.get("token");
  const loadIp = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      setIp(response.data.ip);
    } catch (error) {
      console.error("Error fetching the IP address: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListUser({
      ...listUser,
      [name]: value,
    });
  };

  useEffect(() => {
    if (getToken !== undefined) {
      <Navigate to="/admin" />;
    } else {
      navigate("/admin/login");
    }
    loadIp();
    loadData();
  }, []);

  return (
    <>
      <div className="wrap_header justify-between">
        <div className="admin_logo">
          <img src={logo} alt="" />
        </div>

        <div className="wrap_infor_account">
          <div className="text-end">
            <p className="text-sm font-bold">{listUser?.username}</p>
            <p className="text-sm">{listUser?.fullName} </p>
          </div>

          <img src={no_avatar} alt="" />
          <div className="wrap_account">
            <img src={no_avatar} alt="" />
            <p>{listUser?.username}</p>
            <p>{listUser?.fullName}</p>
            <p>{listUser?.email}</p>

            <div className="wrap_account-logout">
              <button onClick={handleLogOut}>Đăng xuất khỏi tất cả</button>
            </div>
          </div>
        </div>
      </div>

      <div className="account_content">
        <div className="account_content-list">
          <h1>Tài khoản của tôi</h1>

          <h2>Thông tin tài khoản</h2>

          <div className=" mt-10 ">
            <div className="p-2 flex">
              <div className="wrap_account-list-title">
                <p className="font-bold">Chi tiết</p>
              </div>
              <div className="wrap_account-list">
                <div className="wrap_account-input-img">
                  <img src={no_avatar} alt="" />
                </div>

                <div className="wrap_account-input">
                  <div className="wrap_account-input-item">
                    <p>Tên tổ chức</p>
                    <input
                      type="text"
                      value={listUser?.username}
                      disabled
                      onChange={handleChange}
                      name="username"
                    />
                  </div>

                  <div className="wrap_account-input-item">
                    <p>Họ và tên</p>
                    <input
                      type="text"
                      value={listUser?.fullName}
                      onChange={handleChange}
                      name="fullName"
                    />
                  </div>
                </div>

                <div className="wrap_account-input">
                  <div className="wrap_account-input-item">
                    <p>Tên đăng nhập</p>
                    <input
                      type="text"
                      value={listUser?.email}
                      disabled
                      onChange={handleChange}
                      name="email"
                    />
                  </div>

                  <div className="wrap_account-input-item">
                    <p>Số điện thoại</p>
                    <input
                      type="text"
                      value={listUser?.phone}
                      onChange={handleChange}
                      name="phone"
                    />
                  </div>
                </div>

                <p className="pl-3">Quốc gia</p>
                <select className="wrap_account-select">
                  <option value="Việt Nam">Việt Nam</option>
                </select>

                <div className="flex justify-end">
                  <button className="btn_update-account">Cập nhật</button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="p-2 flex">
              <div className="wrap_account-list-title">
                <p className="font-bold">Đổi mật khẩu</p>
              </div>
              <div className="wrap_account-list">
                <div className="wrap_account-input">
                  <div className="wrap_account-input-item wrap_account-input-item_forget">
                    <p>Mật khẩu cũ</p>
                    <input
                      type="password"
                      onChange={handleChange}
                      name="old_password"
                    />
                  </div>
                </div>
                <div className="wrap_account-input">
                  <div className="wrap_account-input-item wrap_account-input-item_forget">
                    <p>Nhập lại mật khẩu</p>
                    <input
                      type="password"
                      onChange={handleChange}
                      name="new_password"
                    />
                  </div>
                </div>

                <div className="wrap_account-input">
                  <div className="wrap_account-input-item wrap_account-input-item_forget">
                    <p>Nhập lại mật khẩu</p>
                    <input
                      type="password"
                      onChange={handleChange}
                      name="new_password-re-enter"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="btn_update-account">Cập nhật</button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pb-14">
            <div className="p-2 flex">
              <div className="wrap_account-list-title">
                <p className="font-bold">Lịch sử đăng nhập</p>
              </div>
              <div className="wrap_account-list">
                <table>
                  <thead>
                    <tr>
                      <th>Ngày đăng nhập</th>
                      <th>IP</th>
                    </tr>
                  </thead>

                  <tbody>
                    {listUser?.login?.slice(-5).map((item, index) => (
                      <tr key={index}>
                        <td>{Date(item.createdAt).slice(0, 24)}</td>
                        <td>{item.ip_client}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
