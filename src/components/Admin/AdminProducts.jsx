import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoAddSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ApiService from "../Api/ApiService";
import { ListProducts } from "../Redux/ProductSlice";
import no_img from "../../assets/images/no_img.jpg";
import { NextDataProduct } from "./NextDataProduct";
import axios from "axios";

const AdminProducts = () => {
  const url = "http://localhost:3000";
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState();

  const loadDataProducts = async (skip) => {
    const res = await ApiService.ApiProduct(skip);

    dispatch(ListProducts(res.data));
    if (res.status === 200) {
      setResults(res.data.product);
    }
  };

  const listDataProduct = useSelector((state) => state.ProductSlice.products);
  const { total } = listDataProduct;

  useEffect(() => {
    loadDataProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form

    try {
      const response = await axios.get(
        `http://localhost:3000/products/search`,
        {
          params: {
            name: searchTerm,
          },
        }
      );

      setResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="admin_content-title ">
        <p>Danh sách sản phẩm</p>
        <NavLink to={"new"}>
          <button className="btn_add-new-product">
            <i>
              <IoAddSharp color="#fff" size={20} />
            </i>
            Tạo sản phẩm
          </button>
        </NavLink>
      </div>
      <div className="content_list mb-20">
        <ul className="wrap_content_list-header">
          <li>
            <a className="content_list-header">Tất cả sản phẩm</a>
          </li>
        </ul>

        <div>
          <form onSubmit={handleSubmit} className="content_list-input">
            <button className="btn_search_admin">
              <CiSearch size={20} />
            </button>
            <input
              type="text"
              placeholder="Tìm kiếm"
              name="name"
              id="name"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>

        <table>
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Khả dụng</th>

              <th>Loại</th>
              <th>Nhà cung cấp</th>
            </tr>
          </thead>

          <tbody>
            {results?.map((item, index) => (
              <tr key={index}>
                <td className="flex table_name">
                  <img
                    src={
                      item.image
                        ? `${url}/products/image/${item.image}`
                        : item.url
                        ? item.url
                        : no_img
                    }
                    alt=""
                    className="mr-3"
                  />

                  <NavLink to={{ pathname: `/admin/products/${item.id}` }}>
                    <p>{item.title}</p>
                  </NavLink>
                </td>
                <td>{item.quantity}</td>

                <td>{item.category}</td>
                <td>{item.supplier}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4 ">
          <div className="flex items-center">
            <p className="mr-3">
              Tổng: <span>{total}</span>
            </p>

            <NextDataProduct onChoosenData={loadDataProducts} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProducts;
