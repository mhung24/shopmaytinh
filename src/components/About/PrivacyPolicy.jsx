import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./About.css";

export const PrivacyPolicy = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollToTop();
  });
  const list = [
    {
      title:
        "Chính sách bảo mật này nhằm giúp Quý khách hiểu về cách website thu thập và sử dụng thông tin cá nhân của mình thông qua việc sử dụng trang web, bao gồm mọi thông tin có thể cung cấp thông qua trang web khi Quý khách đăng ký tài khoản, đăng ký nhận thông tin liên lạc từ chúng tôi, hoặc khi Quý khách mua sản phẩm, dịch vụ, yêu cầu thêm thông tin dịch vụ từ chúng tôi.",
    },

    {
      title:
        "Chúng tôi sử dụng thông tin cá nhân của Quý khách để liên lạc khi cần thiết liên quan đến việc Quý khách sử dụng website của chúng tôi, để trả lời các câu hỏi hoặc gửi tài liệu và thông tin Quý khách yêu cầu.",
    },

    {
      title:
        "Trang web của chúng tôi coi trọng việc bảo mật thông tin và sử dụng các biện pháp tốt nhất để bảo vệ thông tin cũng như việc thanh toán của khách hàng. ",
    },

    {
      title:
        "Mọi thông tin giao dịch sẽ được bảo mật ngoại trừ trong trường hợp cơ quan pháp luật yêu cầu.",
    },
  ];
  return (
    <>
      <div className="mt-4 mb-4 text-sm">
        <NavLink to={"/"}>Trang chủ</NavLink>{" "}
        <span className="about_title">/ Chính sách bảo mật/</span>
      </div>

      <h1 className="mb-6 text-xl font-medium">Chính sách bảo mật</h1>

      <div>
        <ul>
          {list.map((item, index) => (
            <li key={index} className="mt-1 mb-1 text-sm">
              <p>{item.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
