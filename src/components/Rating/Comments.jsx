import React, { useEffect, useState } from "react";
import ApiService from "../Api/ApiService";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import "./Comment.css";
import { NextComment } from "../NextPage/NextComment";
import img from "../../assets/images/no_avatar.png";
import { IoIosSend } from "react-icons/io";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";

export const Comments = (props) => {
  const litsUser = Cookies.get("_ad");
  const IdUser = litsUser ? JSON.parse(litsUser) : [];

  const { data } = props;
  const url = "http://localhost:3000/products/image";
  const url1 = "http://localhost:3000";

  const token = Cookies.get("client");

  const [list, setList] = useState([]);
  const [listRating, setListRating] = useState({
    user_id: IdUser?.id,
    half_rating: "",
    comment: "",
  });
  // const star = [
  //   {
  //     key: "all",
  //     title: "Tất cả",
  //   },

  //   {
  //     key: 5,
  //     title: "5 sao",
  //   },

  //   {
  //     key: 4,
  //     title: "4 sao",
  //   },

  //   {
  //     key: 3,
  //     title: "3 sao",
  //   },

  //   {
  //     key: 2,
  //     title: "2 sao",
  //   },
  //   {
  //     key: 1,
  //     title: "1 sao",
  //   },
  // ];

  const loadData = async (skip) => {
    const res = await ApiService.ApiRating(data, skip);
    if (res.status === 200) {
      const { rating, skip, limit } = res.data;

      setList(rating.reverse());
    }
  };

  console.log(list);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setListRating({
      ...listRating,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${url1}/rating/create`, {
        user_id: listRating.user_id,
        product_id: data,
        score: listRating.half_rating,
        comment: listRating.comment,
      });

      if (res.status === 200) {
        toast.success("Thành công");
        location.reload();
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadData();
  }, [data]);

  return (
    <>
      <div className="p-3 ">
        <h1 className="font-semibold text-base">Nhận xét và đánh giá</h1>

        <p className={list.length === 0 ? "no_list-comment" : "none"}>
          Không có bình luận nào
        </p>
        <div
          className={list.length !== 0 ? "wrap_detail_comment mt-4" : "none"}
        >
          {list?.map((item, index) => (
            <div className="wrap_content-comment" key={index}>
              <img
                className="wrap_content-comment-avatar"
                src={`${url}/${item.avatar}`}
                alt=""
              />

              <div className="list_content-comment">
                <p className="text-base font-semibold mt-1">{item.username}</p>
                <Stack spacing={1}>
                  <Rating
                    name="half-rating"
                    defaultValue={3.0}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                </Stack>
                <p className="text-xs mt-1">{item.time}</p>
                <p className="text-base mt-1 mb-5">{item.comment}</p>
              </div>
            </div>
          ))}

          <div className="wrap_nextdata-cmt">
            <NextComment onChoosenData={loadData} />
          </div>
        </div>
      </div>

      <div className={token ? "wrap_my-comment" : "none"}>
        <div className="my_comment">
          <img src={img} alt="" />
          <form className="wrap_form_comment" onSubmit={handleSubmit}>
            <div className="my_comment-star">
              <p>Đánh giá :</p>
              <Stack spacing={1}>
                <Rating
                  name="half_rating"
                  defaultValue={0}
                  precision={0.5}
                  onChange={handleChange}
                />
              </Stack>
            </div>
            <div className="form_comment">
              <textarea
                type="text"
                placeholder="Viết bình luận"
                onChange={handleChange}
                name="comment"
                required
              />
              <button>
                <IoIosSend
                  color="#000"
                  size={24}
                  className="mt-5 ml-2 cursor-pointer"
                />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className={token ? "none" : "no_login-cmt"}>
        <p>Đăng nhập để bình luận</p>
      </div>
    </>
  );
};
