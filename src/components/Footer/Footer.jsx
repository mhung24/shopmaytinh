import React from "react";
import logo from "../../assets/images/logo.png";
import { RiMapPinLine } from "react-icons/ri";
import { MdOutlineSmartphone } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import "./Footer.css";
import { NavLink } from "react-router-dom";
export const Footer = () => {
  return (
    <div className="wrap_content">
      <div className="wrap_content-item">
        <a href="/">
          <img src={logo} alt="" width={200} />
        </a>
        <div className="flex items-center">
          <RiMapPinLine />
          <h2 className="ml-2">
            Địa chỉ : <span>Phù Nghĩa, Lộc Hạ, Nam Định, Việt Nam</span>
          </h2>
        </div>

        <div className="flex items-center">
          <MdOutlineSmartphone />
          <h2 className="ml-2">
            Điện thoại: <span>0862822098</span>
          </h2>
        </div>

        <div className="flex items-center">
          <CiMail />
          <h2 className="ml-2">
            Email: <span>hung123mqtb@gmail.com</span>
          </h2>
        </div>

        <p>Đây là demo kiến thức đã học không mạo danh bất kì trang web nào</p>
      </div>

      <div className="wrap_content-item">
        <h1 className="font-bold">Hỗ trợ khách hàng</h1>

        <p>
          <NavLink to={"/pages/about-us"}>Giới thiệu</NavLink>
        </p>
        <p>
          <NavLink to={"/pages/chinh-sach-doi-tra"}>Chính sách đổi trả</NavLink>
        </p>
        <p>
          <NavLink to={"/pages/chinh-sach-bao-mat"}>Chính sách bảo mật</NavLink>
        </p>

        <p>
          <NavLink to={"/pages/dieu-khoan-dich-vu"}>Điều khoản dịch vụ</NavLink>
        </p>
      </div>

      <div className="wrap_content-item">
        <h1 className="font-bold">Chính sách</h1>
        <p>
          <NavLink to={"/collections/all"}>Tất cả sản phẩm</NavLink>
        </p>
        <p>
          <NavLink to={"/"}>Trang chủ</NavLink>
        </p>
        <p>
          <NavLink to={"/"}>Linh kiện</NavLink>
        </p>
        <p>
          <NavLink to={"/"}>Phụ kiện</NavLink>
        </p>
      </div>

      <div className="wrap_content-item">
        <h1 className="font-bold">Tổng đài hỗ trợ</h1>
        <p>
          Gọi mua hàng: <span>0862822098</span>
        </p>
        <p>
          Gọi bảo hành: <span>0862822098</span>
        </p>

        <p>
          Gọi khiếu nại: <span>0862822098</span>
        </p>

        <h1 className="font-bold mb-2">Phương thức thanh toán</h1>
        <img
          src="https://theme.hstatic.net/1000370192/1001217758/14/footer_trustbadge.jpg?v=136"
          alt=""
        />
      </div>
    </div>
  );
};
