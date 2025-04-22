import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export const Register = () => {
  const url = "http://localhost:3000";
  const [errMail, setErrMail] = useState();
  const [errUser, setErrUser] = useState();
  const [errPass, setErrPass] = useState();
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordValid, setPasswordValid] = useState({
    length: false,
    specialChar: false,
    uppercase: false,
    number: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
    if (name === "password") {
      validatePassword(value);
    }
  };

  const token = Cookies.get("client");
  if (token !== undefined) {
    navigate("/");
  }

  const [visibleConditions, setVisibleConditions] = useState([]);

  // Kiểm tra và hiển thị điều kiện mật khẩu
  const validatePassword = (password) => {
    const conditions = {
      length: password.length > 8,
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
    };

    setPasswordValid(conditions);

    // Hiển thị từng điều kiện khi nó đạt được
    const newVisibleConditions = [];
    if (password.length > 0) newVisibleConditions.push("length");
    if (conditions.length) newVisibleConditions.push("specialChar");
    if (conditions.specialChar) newVisibleConditions.push("uppercase");
    if (conditions.uppercase) newVisibleConditions.push("number");

    setVisibleConditions(newVisibleConditions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = Object.values(passwordValid).every((valid) => valid);

    try {
      const passwordValidation = validatePassword(account.password);
      setErrPass(passwordValidation);
      if (isValid && account.password === account.confirmPassword) {
        const response = await axios.post(`${url}/users/create`, account);
        if (response.status === 201) {
          toast.success("Đăng ký thành công");
          setPasswordValid({
            length: false,
            specialChar: false,
            uppercase: false,
            number: false,
          });
          setTimeout(() => {
            navigate("/account/login");
          }, 2000);
        }
      }
    } catch (error) {
      if (error.status === 404) {
        const { text_user, text_mail } = error.response.data;
        setErrMail(text_mail);
        setErrUser(text_user);
      }
    }
  };

  return (
    <div>
      <div className="mt-4 mb-4 text-sm flex">
        <NavLink to={"/"}>Trang chủ </NavLink>

        <p className="ml-1">
          / Tài khoản / <span className="about_title"> Đăng ký </span>
        </p>
      </div>

      <div className="wrap_login">
        <h1 className="font-semibold uppercase text-xl text-center">
          Đăng ký tài khoản
        </h1>
        <p className="text-sm text-center">
          Bạn đã có tài khoản ?{" "}
          <span>
            <a href="/account/login">Đăng nhập tại đây</a>
          </span>
        </p>

        <div>
          <form className="form_client-login" onSubmit={handleSubmit}>
            <div className="form_client-login-input mb-2">
              <p className="font-semibold">Họ tên</p>
              <input
                type="text"
                placeholder="Họ tên"
                onChange={handleChange}
                name="fullname"
                required
              />
            </div>
            <div className="form_client-login-input mb-2">
              <p className="font-semibold">Tên đăng nhập</p>
              <input
                className={errUser ? "err_account_input" : ""}
                type="text"
                placeholder="Tên đăng nhập"
                onChange={handleChange}
                name="username"
                required
              />
              <p className={errUser ? "err_account" : "none"}>{errUser}</p>
            </div>

            <div className="form_client-login-input mb-2">
              <p className="font-semibold">Email</p>
              <input
                className={errUser ? "err_account_input" : ""}
                type="email"
                placeholder="Email"
                onChange={handleChange}
                name="email"
                required
              />
              <p className={errMail ? "err_account" : "none"}>{errMail}</p>
            </div>

            <div className="form_client-login-input mb-2">
              <p className="font-semibold">Số điện thoại</p>
              <input
                type="text"
                placeholder="Số điện thoại"
                onChange={handleChange}
                name="phone"
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
              <p className={errPass === true ? "none" : "err_account"}>
                {errPass}
              </p>

              <div className={account.password ? "text-sm space-y-1" : "none"}>
                <p
                  className={
                    passwordValid.length ? "text-green-500" : "text-red-500"
                  }
                >
                  {passwordValid.length}Nhiều hơn 8 ký tự
                </p>
                <p
                  className={
                    passwordValid.specialChar
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {passwordValid.specialChar}Có ít nhất 1 ký tự đặc biệt
                </p>
                <p
                  className={
                    passwordValid.uppercase ? "text-green-500" : "text-red-500"
                  }
                >
                  {passwordValid.uppercase}Có ít nhất 1 chữ hoa
                </p>
                <p
                  className={
                    passwordValid.number ? "text-green-500" : "text-red-500"
                  }
                >
                  {passwordValid.number} Có ít nhất 1 số
                </p>
              </div>
            </div>

            <div className="form_client-login-input mb-2">
              <p className="font-semibold">Nhập lại mật khẩu</p>
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                onChange={handleChange}
                name="confirmPassword"
                required
              />
              <p
                className={
                  account.confirmPassword === account.password
                    ? "none"
                    : "err_account"
                }
              >
                Mật khẩu nhập lại không trùng khớp
              </p>
            </div>

            <button className="btn_client-login">Đăng ký</button>
          </form>
        </div>
      </div>
    </div>
  );
};
