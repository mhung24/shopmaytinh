import React from "react";
import "./ProductPolicises.css";

export const ProductPolicises = () => {
  const list = [
    {
      title: "Giao hàng miễn phí trong 24h (chỉ áp dụng khu vực nội thành)",
      icon: "https://theme.hstatic.net/1000370192/1001217758/14/policy_product_image_1.png?v=136",
    },

    {
      title: "Giảm 50.000 VNĐ nếu khách hàng check-in tại cửa hàng",
      icon: "https://theme.hstatic.net/1000370192/1001217758/14/policy_product_image_2.png?v=136",
    },

    {
      title: "Trả góp lãi suất 0% qua thẻ tín dụng Visa, Master, JCB",
      icon: "https://theme.hstatic.net/1000370192/1001217758/14/policy_product_image_3.png?v=136",
    },

    {
      title: "Đổi trả miễn phí trong 30 ngày",
      icon: "https://theme.hstatic.net/1000370192/1001217758/14/policy_product_image_4.png?v=136",
    },
  ];
  return (
    <>
      <ul className="product-policises ">
        {list.map((item, index) => (
          <li key={index} className="media">
            <div className="mr-2 media_icon">
              <img className="img-fluid " src={item.icon} alt="" />
            </div>
            <div className="media_body">
              <p>{item.title}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
