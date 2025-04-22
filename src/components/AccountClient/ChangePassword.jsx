import React, { useState } from "react";
import "./AccountClient.css";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import ApiService from "../Api/ApiService";

export const ChangePassword = () => {
  const [err, setErr] = useState();
  const [dataPassword, setDataPassword] = useState({
    current_password: "",
    new_password: "",
    rq_new_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDataPassword({
      ...dataPassword,
      [name]: value,
    });

    if (name === "new_password") {
      validatePassword(value);
    }
  };

  const [passwordValid, setPasswordValid] = useState({
    length: false,
    specialChar: false,
    uppercase: false,
    number: false,
  });
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

  const dataCookies = Cookies.get("_ad");

  const listCookies = dataCookies ? JSON.parse(dataCookies) : [];

  if (listCookies.password === dataPassword.current_password) {
  }

  const url = "http://localhost:3000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = Object.values(passwordValid).every((valid) => valid);

    try {
      if (isValid === true) {
        if (listCookies.password === dataPassword.current_password) {
          const response = await axios.put(
            `${url}/users/update/password/${listCookies.id}`,
            {
              password: dataPassword.new_password,
            }
          );

          if (response.status === 200) {
            toast.success("Thay đổi mật khẩu thành công");
            const response = await ApiService.ApiMyUserByID(listCookies.id);
            Cookies.set("_ad", JSON.stringify(response.data), { expires: 30 });
            setTimeout(() => {
              location.reload();
            }, 2000);
          }
        } else {
          setErr(1);
        }
      }
    } catch (error) {}
  };
  return (
    <div>
      <h1 className="font-semibold text-xl">Thay đổi mật khẩu</h1>

      <form className="form_change-password" onSubmit={handleSubmit}>
        <div className="wrap_form_change-password">
          <p>Mật khẩu hiện tại</p>
          <input
            type="password"
            name="current_password"
            onChange={handleChange}
          />

          <p className={err === 1 ? "err_account" : "none"}>
            Mật khẩu không đúng
          </p>
        </div>

        <div className="wrap_form_change-password">
          <p>Mật khẩu mới</p>
          <input type="password" name="new_password" onChange={handleChange} />
          <div
            className={dataPassword.new_password ? "text-sm space-y-1" : "none"}
          >
            <p
              className={
                passwordValid.length ? "text-green-500" : "text-red-500"
              }
            >
              {passwordValid.length}Nhiều hơn 8 ký tự
            </p>
            <p
              className={
                passwordValid.specialChar ? "text-green-500" : "text-red-500"
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

        <div className="wrap_form_change-password">
          <p>Nhập lại mật khẩu mới</p>
          <input
            type="password"
            name="rq_new_password"
            onChange={handleChange}
          />
          <p
            className={
              dataPassword.new_password === dataPassword.rq_new_password
                ? "none"
                : "err_account"
            }
          >
            Mật khẩu nhập lại không trùng khớp
          </p>
        </div>

        <button className="btn_update-client">Cập nhật</button>
      </form>
    </div>
  );
};
