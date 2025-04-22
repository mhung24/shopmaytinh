import React from "react";
import "./ListCart.css";
import no_cart from "../../assets/images/no_cart.png";

export const ListSearch = (props) => {
  const { data } = props;
  const url = "http://localhost:3000/products";
  const query = "http://localhost:5173";

  return (
    <>
      {data?.map((item, index) => (
        <div key={index} className="list_item-search">
          <div className="wrap_item-search-img">
            <a href={`${query}/products/${item.id}`}>
              <img src={`${url}/image/${item.image}`} alt="" />
            </a>
          </div>
          <div className="item-seacrh-details">
            <a href={`${query}/products/${item.id}`}>
              {" "}
              <p className="item-search-details-name">{item.title}</p>
            </a>
            <div className="flex items-start">
              <p className="item-cart-details-price">
                {Intl.NumberFormat("en-US").format(item.costPrice)}₫
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
