import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const AdminLogin = () => {
  const [ip, setIp] = useState("");
  const url = "http://localhost:3000";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

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

    setAccount({
      ...account,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${url}/users/login`, account);

      const { token, role, id } = response.data;

      const resTest = await axios.get(`${url}/users/listhistory`);
      const checkIp = resTest?.data.filter((i) => i.ip_client === ip);

      if (response.status === 200 && checkIp) {
        const resLogin = await axios.get(`${url}/users/history/${id}`);
        localStorage.setItem("data", JSON.stringify(response.data));
        Cookies.set("token", token, { expires: 30 });
        // Cookies.set("_ad", JSON.stringify(response.data), { expires: 30 });

        navigate("/admin");
      } else {
        const res = await axios.post(`${url}/users/history/${id}`, {
          ip_client: ip,
          user_id: id,
          is_login: "true",
        });

        if (res.status === 201) {
          const resLogin = await axios.get(`${url}/users/history/${id}`);
          const isLogin = resLogin?.data.filter((i) => i.ip_client === ip);
          localStorage.setItem("data", JSON.stringify(response.data));
          // Cookies.set("_ad", JSON.stringify(response.data), { expires: 30 });
          Cookies.set("token", token, { expires: 7 });
          navigate("/admin");
        }
      }
    } catch (err) {
      if (err.status === 404) {
        setError("Thông tin tài khoản hoặc mật khẩu không chính xác");
      }
    }
  };

  useEffect(() => {
    loadIp();
  });

  return (
    <>
      <div className="wrap_admin-login">
        <div className="login_logo">
          <img src={logo} alt="" />
        </div>

        <div className="wrap_form">
          <div className="wrap_form-login">
            <h2 className="font-bold text-2xl uppercase text-center">
              Đăng nhập
            </h2>
            <p className="text-base text-center mt-2">
              Xin chào, vui lòng nhập thông tin đăng nhập
            </p>
            <form className="form_login" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Tên đăng nhập"
                required
                name="username"
                id="username"
                onChange={handleChange}
              />{" "}
              <br />
              <input
                type="password"
                placeholder="Mật khẩu"
                required
                name="password"
                id="password"
                onChange={handleChange}
              />
              <p>Quên mật khẩu</p>
              <button>Đăng nhập</button>
              <span className={error ? "err_login" : "none"}>{error}</span>
            </form>
            <p className="mt-3">Hoặc</p>
            <div className="flex items-center mt-3 border border-blue-400 border-solid p-3 rounded-sm">
              <FcGoogle />
              <p className="ml-2">Đăng nhập bằng Google</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
