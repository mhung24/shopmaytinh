import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import ApiService from "../Api/ApiService";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { addToCart } from "../Redux/ProductSlice";

export const RelatedProducts = (props) => {
  const navigate = useNavigate();

  const { data } = props;
  const url = "http://localhost:3000";
  const url1 = "http://localhost:5173";

  const token = Cookies.get("client");

  const handleClick = (item) => {
    if (token) {
      toast.success("Thêm sản phẩm thành công");
      dispatch(
        addToCart({
          id: item.product_id,
          title: item.name,
          price: item.cost_price,
          image: item.image,
          quantity: 1,
        })
      );
    } else {
      navigate("/account/login");
    }
  };
  const products = [
    {
      id: 1,
      name: "Màn hình Gaming Extra EGM22C24S",
      price: "3,549,000 VNĐ",
      discount: "-10%",
      status: "Hết hàng",
      img: "monitor.jpg",
    },
    {
      id: 2,
      name: "Màn hình Gaming Extra EGM27D100R",
      price: "3,549,000 VNĐ",
      discount: "-14%",
      img: "monitor.jpg",
    },
    {
      id: 3,
      name: "Laptop Dell Latitude E5400",
      price: "3,500,000 VNĐ",
      img: "laptop.jpg",
    },
    {
      id: 4,
      name: "Combo phím chuột",
      price: "3,999,000 VNĐ",
      discount: "-20%",
      img: "combo.jpg",
    },
    {
      id: 5,
      name: "Màn hình Gaming HHC-M27G4F",
      price: "3,650,000 VNĐ",
      discount: "-23%",
      img: "gaming.jpg",
    },
    {
      id: 6,
      name: "Laptop Acer Aspire 5",
      price: "15,000,000 VNĐ",
      img: "laptop2.jpg",
    },
    {
      id: 7,
      name: "Màn hình LG 27UK850",
      price: "9,000,000 VNĐ",
      discount: "-5%",
      img: "monitor2.jpg",
    },
  ];

  const [listData, setListData] = useState([]);

  const loadData = async () => {
    const res = await ApiService.ApiRelatedProducts(data);

    if (res.status === 200) {
      setListData(res.data);
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex + 5 < products.length) {
      setCurrentIndex(currentIndex + 5);
    }
  };

  const handleBack = () => {
    if (currentIndex - 5 >= 0) {
      setCurrentIndex(currentIndex - 5);
    }
  };

  useEffect(() => {
    loadData();
  }, [data]);
  return (
    <>
      <div className="container_related">
        <h1>Sản Phẩm Mới</h1>
        <div
          className="products_related"
          style={{ transform: `translateX(-${(currentIndex / 5) * 100}%)` }}
        >
          {listData
            ? listData.map((item, index) => (
                <div key={index} className="list_products">
                  <div className="text-center ">
                    <a href={`${url1}/products/${item.product_id}`}>
                      <img
                        src={
                          item.image
                            ? `${url}/products/image/${item.image}`
                            : `${url}/products/image/1741338590275_no_img.jpg`
                        }
                        alt=""
                        className="list_product-images"
                      />
                    </a>
                  </div>
                  <p className="list_product-name">
                    <a href={`${url1}/products/${item.product_id}`}>
                      {item.name}
                    </a>
                  </p>
                  <div className="flex ml-2">
                    <p
                      className={
                        item.compare_price === item.cost_price
                          ? "none"
                          : "list_product-compare_price"
                      }
                    >
                      {Intl.NumberFormat("en-US").format(item.compare_price)}₫
                    </p>
                    <p
                      className={
                        item.cost_price - item.compare_price !== 0
                          ? "list_product-percent"
                          : "none"
                      }
                    >
                      ( Tiết kiệm:{" "}
                      {100 -
                        Math.round(
                          (item.cost_price / item.compare_price) * 100
                        )}
                      %)
                    </p>
                  </div>
                  <p className="list_product-price">
                    {Intl.NumberFormat("en-US").format(item.cost_price)}₫
                  </p>
                  <div className="flex mr-2 ml-2 justify-end mb-3">
                    <div className="list_product-add_cart">
                      <button
                        onClick={() => {
                          handleClick(item);
                        }}
                      >
                        <MdOutlineShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
        <div className="button-container">
          <button
            className="back-button"
            onClick={handleBack}
            disabled={currentIndex === 0}
          >
            <MdArrowBackIos size={12} />
          </button>
          <button
            className="next-button"
            onClick={handleNext}
            disabled={currentIndex + 5 >= products.length}
          >
            <MdOutlineNavigateNext size={20} />
          </button>
        </div>
      </div>
    </>
  );
};
