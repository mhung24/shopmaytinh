import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./About.css";

export const ReturnPolicy = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollToTop();
  });
  return (
    <>
      <div className="mt-4 mb-4 text-sm">
        <NavLink to={"/"}>Trang chủ</NavLink>{" "}
        <span className="about_title">/ Chính sách đổi trả /</span>
      </div>

      <h1 className="mb-6 text-xl font-medium">Chính sách đổi trả</h1>

      <div>
        <h1 className="text-sm font-medium mt-2 mb-2">1.Điều kiện đổi trả</h1>
        <p className="text-sm">
          Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có thể đổi hàng/
          trả lại hàng ngay tại thời điểm giao/nhận hàng trong những trường hợp
          sau:
        </p>

        <ul className="text-sm list-disc ml-6 ">
          <li className="mb-1 mt-1">
            Hàng không đúng chủng loại, mẫu mã trong đơn hàng đã đặt hoặc như
            trên website tại thời điểm đặt hàng.
          </li>
          <li className="mb-1 mt-1">
            Không đủ số lượng, không đủ bộ như trong đơn hàng.
          </li>
          <li className="mb-1 mt-1">
            Tình trạng bên ngoài bị ảnh hưởng như rách bao bì, bong tróc, bể vỡ…
          </li>
        </ul>
        <p className="text-sm ">
          Khách hàng có trách nhiệm trình giấy tờ liên quan chứng minh sự thiếu
          sót trên để hoàn thành việc hoàn trả/đổi trả hàng hóa.
        </p>

        <h1 className="text-sm font-medium mt-2 mb-2">
          2. Quy định về thời gian thông báo và gửi sản phẩm đổi trả
        </h1>
        <ul className="text-sm list-disc ml-6 ">
          <li className="mb-1 mt-1">
            Thời gian thông báo đổi trả: trong vòng 48h kể từ khi nhận sản phẩm
            đối với trường hợp sản phẩm thiếu phụ kiện, quà tặng hoặc bể vỡ.
          </li>
          <li className="mb-1 mt-1">
            Thời gian gửi chuyển trả sản phẩm: trong vòng 14 ngày kể từ khi nhận
            sản phẩm.
          </li>
          <li className="mb-1 mt-1">
            Địa điểm đổi trả sản phẩm: Khách hàng có thể mang hàng trực tiếp đến
            văn phòng/ cửa hàng của chúng tôi hoặc chuyển qua đường bưu điện.
          </li>
        </ul>

        <p className="text-sm">
          Trong trường hợp Quý Khách hàng có ý kiến đóng góp/khiếu nại liên quan
          đến chất lượng sản phẩm, Quý Khách hàng vui lòng liên hệ đường dây
          chăm sóc khách hàng của chúng tôi.
        </p>
      </div>
    </>
  );
};
