import React, { useState } from "react";
import "./Describe.css";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiCircleMinus } from "react-icons/ci";

export const Describe = (props) => {
  const { data } = props;

  const [seeMore, setSeeMore] = useState(false);

  const handleClick = () => {
    if (seeMore === true) {
      setSeeMore(false);
    } else {
      setSeeMore(true);
    }
  };

  return (
    <div className="wrap_list-detail-des">
      <div
        className={
          seeMore === false
            ? "detail_des no_seemore"
            : "detail_des true_seemore"
        }
      >
        <h1 className="des_title">Thông tin sản phẩm</h1>
        <div
          className={
            seeMore === false
              ? "destail_des-item no_seemore-item"
              : "destail_des-item true_seemore-item"
          }
        >
          {<div dangerouslySetInnerHTML={{ __html: data }} />}
        </div>
        <div className="seemore">
          <button onClick={handleClick}>
            {seeMore === false ? (
              <IoAddCircleOutline size={20} />
            ) : (
              <CiCircleMinus size={20} />
            )}

            <p className="ml-2">{seeMore === false ? "Xem thêm" : "Thu gọn"}</p>
          </button>
        </div>
      </div>
    </div>
  );
};
