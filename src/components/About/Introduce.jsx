import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./About.css";

export const Introduce = () => {
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
      title: "Giới thiệu chung",
      content:
        " Chào mừng bạn đến với ManhHungComputer - địa chỉ tin cậy cho tất cả nhu cầu về máy tính và linh phụ kiện công nghệ!",
    },
    {
      title: "Bạn Là Ai",
      content:
        " Chúng tôi là một cửa hàng chuyên cung cấp các sản phẩm máy tính, linh kiện, và phụ kiện công nghệ. Với nhiều năm kinh nghiệm trong ngành, chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng nhất.",
    },

    {
      title: "Giá Trị Kinh Doanh Của Chúng Tôi",
      content:
        " Tại ManhHungComputer, chúng tôi luôn đặt khách hàng lên hàng đầu. Chúng tôi tin rằng sự hài lòng của khách hàng là thành công lớn nhất của chúng tôi. Chúng tôi cam kết cung cấp sản phẩm chất lượng với giá cả hợp lý, cùng dịch vụ tư vấn tận tình.",
    },
    {
      title: "Địa Chỉ Cửa Hàng",
      content: "Phù Nghĩa, Lộc Hạ, Nam Định, Việt Nam",
    },
    {
      title: "Thời Gian Kinh Doanh",
      content:
        "Chúng tôi đã hoạt động trong ngành máy tính hơn 10 năm và đã có bề dày kinh nghiệm trong việc phục vụ khách hàng. Với 5 năm kinh doanh online, chúng tôi đã tạo dựng được niềm tin vững chắc trong cộng đồng.",
    },
    {
      title: " Đội Ngũ Của Chúng Tôi",
      content:
        "Đội ngũ của chúng tôi bao gồm những chuyên gia công nghệ dày dạn kinh nghiệm và nhân viên tư vấn nhiệt tình. Chúng tôi luôn sẵn sàng giúp đỡ bạn tìm ra sản phẩm phù hợp nhất với nhu cầu của mình.",
    },
  ];
  return (
    <>
      <div className="mt-4 mb-4 text-sm">
        <NavLink to={"/"}>Trang chủ</NavLink>{" "}
        <span className="about_title">/ Giới thiệu /</span>
      </div>

      <h1 className="mb-6 text-xl font-medium">Giới thiệu</h1>
      <div>
        <ul>
          {list.map((item, index) => (
            <li key={index}>
              <h1 className="text-sm font-medium mt-2 mb-2">
                {index + 1}. {item.title}
              </h1>
              <p className="text-sm">{item.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
