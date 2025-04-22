import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import Cookies from "js-cookie";

export const Login = () => {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const url = "http://localhost:3000";

  const token = Cookies.get("client");
  if (token !== undefined) {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${url}/users/login`, account);
      const { token, role } = response.data;

      if (response.status === 200 && role !== 0) {
        Cookies.set("client", token, { expires: 7 });
        Cookies.set("_ad", JSON.stringify(response.data), { expires: 30 });
        navigate("/");

        location.reload();
      } else if (role === 0) {
        setError("Thông tin tài khoản hoặc mật khẩu không chính xác");
      }
    } catch (err) {
      if (err.status === 404) {
        setError("Thông tin tài khoản hoặc mật khẩu không chính xác");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAccount({
      ...account,
      [name]: value,
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <div>
        <div className="mt-4 mb-4 text-sm flex">
          <NavLink to={"/"}>Trang chủ </NavLink>

          <p className="ml-1">
            / Tài khoản / <span className="about_title"> Đăng nhập </span>
          </p>
        </div>

        <div className="wrap_login">
          <h1 className="font-semibold uppercase text-xl text-center">
            Đăng nhập tài khoản
          </h1>
          <p className="text-sm text-center">
            Bạn chưa có tài khoản ?{" "}
            <span>
              <a href="/account/register">Đăng ký tại đây</a>
            </span>
          </p>

          <div>
            <form className="form_client-login" onSubmit={handleSubmit}>
              <div className="form_client-login-input mb-2">
                <p className="font-semibold">Email</p>
                <input
                  type="text"
                  placeholder="Email"
                  onChange={handleChange}
                  name="username"
                  required
                />
              </div>

              <div className="form_client-login-input mb-2">
                <p className="font-semibold">Mật khẩu</p>
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  onChange={handleChange}
                  name="password"
                  required
                />
              </div>
              <span className={error ? "err_login" : "none"}>{error}</span>
              <p className="text-xs mb-3">
                Quên mật khẩu ? Nhấn vào{" "}
                <span>
                  <a className="text-blue-400" href="">
                    đây
                  </a>
                </span>
              </p>

              <button className="btn_client-login">Đăng nhập</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
