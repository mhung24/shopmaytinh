import React, { useEffect } from "react";
import "./About.css";
import { NavLink } from "react-router-dom";

export const TermsService = () => {
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
      title: "Giới thiệu",
      content: [
        {
          content_list: "Chào mừng quý khách hàng đến với website chúng tôi.",
        },

        {
          content_list:
            "Khi quý khách hàng truy cập vào trang website của chúng tôi có nghĩa là quý khách đồng ý với các điều khoản này. Trang web có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản mua bán hàng hóa này, vào bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên trang web mà không cần thông báo trước. Và khi quý khách tiếp tục sử dụng trang web, sau khi các thay đổi về Điều khoản này được đăng tải, có nghĩa là quý khách chấp nhận với những thay đổi đó.",
        },
        {
          content_list:
            "Quý khách hàng vui lòng kiểm tra thường xuyên để cập nhật những thay đổi của chúng tôi.",
        },
      ],
    },

    {
      title: "Hướng dẫn sử dụng website",
      content: [
        {
          content_list:
            "Khi vào web của chúng tôi, khách hàng phải đảm bảo đủ 18 tuổi, hoặc truy cập dưới sự giám sát của cha mẹ hay người giám hộ hợp pháp. Khách hàng đảm bảo có đầy đủ hành vi dân sự để thực hiện các giao dịch mua bán hàng hóa theo quy định hiện hành của pháp luật Việt Nam.",
        },

        {
          content_list:
            "Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng cáo từ website. Nếu không muốn tiếp tục nhận mail, quý khách có thể từ chối bằng cách nhấp vào đường link ở dưới cùng trong mọi email quảng cáo.",
        },
      ],
    },

    {
      title: "Thanh toán an toàn và tiện lợi",
      content: [
        {
          content_list:
            "Người mua có thể tham khảo các phương thức thanh toán sau đây và lựa chọn áp dụng phương thức phù hợp:",
        },

        {
          content_list:
            "Cách 1: Thanh toán trực tiếp (người mua nhận hàng tại địa chỉ người bán)",
        },
        {
          content_list:
            "Cách 2: Thanh toán sau (COD – giao hàng và thu tiền tận nơi)",
        },
        {
          content_list:
            "Cách 3: Thanh toán online qua thẻ tín dụng, chuyển khoản",
        },
      ],
    },
  ];
  return (
    <>
      <div className="mt-4 mb-4 text-sm">
        <NavLink to={"/"}>Trang chủ</NavLink>{" "}
        <span className="about_title">/ Điều khoản dịch vụ/</span>
      </div>

      <h1 className="mb-6 text-xl font-medium">Điều khoản dịch vụ</h1>

      <div>
        <ul>
          {list.map((item, index) => (
            <li key={index}>
              <h1 className="text-sm font-medium mt-2 mb-2">
                {index + 1}. {item.title}
              </h1>
              {item.content.map((item1, index1) => (
                <p className="mt-1 mb-1 text-sm" key={index1}>
                  {item1.content_list}
                </p>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
