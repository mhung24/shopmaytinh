import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ApiService from "../Api/ApiService";
import "./DetailProduct.css";
import { ProductPolicises } from "../ProductPolicises/ProductPolicises";
import { Describe } from "../Describe/Describe";
import { Comments } from "../Rating/Comments";
import { RelatedProducts } from "../RelatedProducts/RelatedProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/ProductSlice";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export const DetailProduct = () => {
  const url = "http://localhost:3000/products/image";
  const { id: idProduct } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const loadData = async () => {
    const res = await ApiService.ApiProductByID(idProduct);
    if (res.status === 200) {
      setData(res.data);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
  };

  const subtractionQuantity = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  };

  const additionQuantity = () => {
    setQuantity(quantity + 1);
  };

  const token = Cookies.get("client");

  const handleAddToCart = (item) => {
    if (token) {
      toast.success("Thêm sản phẩm thành công");
      dispatch(
        addToCart({
          id: item.id,
          title: item.title,
          price: item.costPrice,
          image: item.image,
          quantity: quantity,
        })
      );
    } else {
      navigate("/account/login");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="mt-4 mb-4 text-sm">
        <NavLink to={"/"}>Trang chủ</NavLink>{" "}
        <NavLink to={"/"}>/ Danh mục</NavLink>
        <span className="about_title"> / {data[0]?.title} </span>
      </div>

      <div className="wrap_list-detail-product mb-8">
        {data?.map((item, index) => (
          <div key={index} className="list_detail_product">
            <img src={`${url}/${item.image}`} alt="" />

            <div className="infor_product mb-5">
              <p className="font-bold text-lg">{item.title}</p>
              <div className="flex align-center flex-wrap w-full mt-2">
                <p className="mr-4">
                  Thương hiệu :{" "}
                  <span className="status_name"> {item.supplier}</span>
                </p>
                <p>
                  Mã sản phẩm :{" "}
                  <span className="status_name">Đang cập nhật</span>
                </p>
              </div>
              <div className="mt-4 mb-4">
                <div className="flex align-center">
                  <p className="price_product">
                    {Intl.NumberFormat("en-US").format(item.costPrice)}₫
                  </p>
                  <p
                    className={
                      item.comparePrice === 0 ||
                      item.comparePrice === item.costPrice
                        ? "none"
                        : "price_old_product"
                    }
                  >
                    {Intl.NumberFormat("en-US").format(item.comparePrice)}₫
                  </p>
                  <div
                    className={
                      item.comparePrice - item.costPrice === 0
                        ? "none"
                        : "label_product"
                    }
                  >
                    <p>
                      -
                      {100 -
                        Math.round((item.costPrice / item.comparePrice) * 100)}
                      %
                    </p>
                  </div>
                </div>
                <div className="save-price">
                  <p
                    className={
                      item.comparePrice - item.costPrice === 0 ? "none" : ""
                    }
                  >
                    (Tiết kiệm:{" "}
                    {Intl.NumberFormat("en-US").format(
                      item.comparePrice - item.costPrice
                    )}
                    ₫)
                  </p>
                </div>
              </div>

              <div className="form_product_content">
                <div className="quantity">
                  <p>Số lượng :</p>

                  <div className="input_number_product">
                    <button onClick={subtractionQuantity} className="num_1">
                      -
                    </button>
                    <input
                      name="quantity_cart"
                      type="text"
                      value={quantity}
                      onChange={handleChange}
                      disabled
                    />
                    <button onClick={additionQuantity} className="num_2">
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex align-center flex-wrap w-full  justify-between">
                <button
                  onClick={() => {
                    handleAddToCart(item);
                  }}
                  className="btn btn_add-to-cart"
                >
                  Thêm vào giỏ
                </button>
                <button className="btn btn-installment">Mua Trả góp</button>
              </div>

              <div className="">
                <div className="bk-btn-box">
                  <button className="btn bk-btn-paynow">
                    <p>Mua ngay</p>
                    <span className="bk-btn-paynow-sp">
                      ( giao tận nơi hoặc nhận tại cửa hàng )
                    </span>
                  </button>

                  <button className="btn bk-btn-installment">
                    <p>Trả góp qua thẻ</p>
                    <span className="bk-btn-paynow-sp">
                      ( Visa, Master, JCB )
                    </span>
                  </button>

                  <button className="btn bk-btn-installment-amigo">
                    <p>Mua ngay - trả sau</p>
                    <img
                      src="https://pc.baokim.vn/platform/img/home-paylater-ngang-small.svg"
                      alt=""
                    />
                  </button>

                  <div className="bk-promotion mt-3">
                    <div className="bk-promotion-title">
                      <div className="flex align-center justify-center">
                        <p className="baokim_text text-base">
                          Ưu đãi khi thanh toán
                        </p>
                        <a href="#">
                          <img
                            src="https://pc.baokim.vn/platform/img/home-paylater-ngang-small.svg"
                            alt=""
                            className="img_baokim"
                          />
                        </a>
                      </div>
                      <p className="baokim_text text-sm">
                        (Sử dụng khi XÁC NHẬN KHOẢN VAY trên trang của Tổ chức
                        Tài chính)
                      </p>
                    </div>

                    <div className="bk-promotion-content">
                      <ul>
                        <li>
                          <img
                            src="https://pc.baokim.vn/platform/img/home-paylater-ngang-small.svg"
                            alt=""
                          />

                          <div>
                            <p>
                              Giảm 5% cho đơn hàng từ 55K, tối đa 200K, sử dụng
                              2 lần/3 tháng. Áp dụng cho tất cả Khách hàng.
                            </p>
                          </div>
                        </li>
                        <li>
                          <img
                            src="https://pc.baokim.vn/platform/img/home-paylater-ngang-small.svg"
                            alt=""
                          />

                          <div>
                            <p>
                              Giảm 5% cho đơn hàng từ 52K, tối đa 400K, sử dụng
                              1 lần/3 tháng. Chỉ áp dụng cho Khách hàng mới.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="detail_product-policises">
          <ProductPolicises />
        </div>
      </div>

      <div className="mb-5">
        <Describe data={data[0]?.description} />
      </div>

      <div className="detail_comments">
        <Comments data={data[0]?.id} />
      </div>

      <div className="related_products">
        <RelatedProducts data={data[0]?.costPrice} />
      </div>
    </>
  );
};
