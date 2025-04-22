import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import uploadImg from "../../assets/images/upload_img.png";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { Notice } from "./Notice";

const AddNewProducts = () => {
  const url = "http://localhost:3000/products";
  const editorRef = useRef(null);
  const [message, setMessage] = useState({
    title: "",
    message: "",
  });
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    price: "",
    cost_price: "",
    compare_price: "",
    image: null,
    stock_quantity: "",
    category_id: "",
    supplier_id: "",
  });

  const listCategory = useSelector((state) => state.ProductSlice.category);
  const listSupplier = useSelector((state) => state.ProductSlice.supplier);

  const handleChange = (e) => {
    const { name, files, type, value } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({
        ...formData,
        [name]: value,
        description: editorRef.current.getContent(),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, image } = formData;
    if (!title && image === null) {
      setMessage({
        title: "error",
        message: "Vui lòng nhập đủ thông tin",
      });
      window.scrollTo(0, 0);

      return;
    }

    try {
      const response = await axios.post(`${url}/uploads`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setMessage({
          title: "success",
          message: "Dữ liệu đã được gửi thành công!",
        });

        window.scrollTo(0, 0);

        setTimeout(() => {
          navigate("/admin/products");
        }, 2000);
      }
    } catch (error) {}
  };

  const handleDeleteImg = () => {
    setFormData({ ...formData, image: "" });
  };

  return (
    <>
      <div className="admin_notice">
        <Notice data={message} />
      </div>
      <div>
        <div className="admin_content-title">
          <p>Tạo sản phẩm</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="content_list">
            <ul className="wrap_content_list-header">
              <li>
                <a className="content_list-header">Thông tin chung</a>
              </li>
            </ul>

            <div>
              <div className="wrap_content_list-name">
                <p>Tên sản phẩm</p>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Nhập tên sản phẩm"
                  onChange={handleChange}
                />
              </div>
              <div className="wrap_content_list-select">
                <div className="content_list-select">
                  <p>Nhà cung cấp</p>
                  <select
                    id="supplier_id"
                    name="supplier_id"
                    onChange={handleChange}
                  >
                    {listSupplier?.map((item, index) => (
                      <option key={index} value={index + 1}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="content_list-select">
                  <p>Loại</p>
                  <select
                    id="category_id"
                    name="category_id"
                    onChange={handleChange}
                  >
                    {listCategory.map((i, index) => (
                      <option key={index} value={index + 1}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="wrap_content_list-describe">
                <p className="mb-4">Mô tả sản phẩm</p>

                <Editor
                  id="description"
                  name="description"
                  textareaName="description"
                  apiKey="kw7wvbtuq1uylgzz0s6zp9fgsflzvjwpnlgye9we6dl3lh06"
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  onChange={handleChange}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="content_list">
            <div className="wrap_content_list-image">
              <p>Hình ảnh sản phẩm</p>
              <div
                className={
                  formData.image
                    ? "wrap_img-true-data  wrap_img mt-3"
                    : " wrap_img mt-3"
                }
              >
                <div
                  className={
                    formData.image ? "wrap_img-file-block" : "wrap_img-file"
                  }
                >
                  {formData.image && (
                    <img
                      className="img_file"
                      src={URL.createObjectURL(formData.image)}
                    />
                  )}

                  <div className="delete_img" onClick={handleDeleteImg}>
                    <i>
                      <MdOutlineDelete />
                    </i>
                  </div>
                </div>
                <div className="text-center ">
                  <div
                    className={
                      formData.image ? "wrap_uploadImg-file" : "wrap_uploadImg"
                    }
                  >
                    <img className="uploadImg" src={uploadImg} alt="" />
                    <label htmlFor="image" className="link">
                      Thêm ảnh
                    </label>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    tabIndex={-1}
                    className="none"
                    id="image"
                    name="image"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="content_list">
            <p className="font-semibold">Thêm ảnh từ url</p>
            <input
              type="text"
              placeholder="Nhập url"
              className="input_url"
              id="url"
              name="url"
              onChange={handleChange}
            />
          </div>

          <div className="content_list">
            <p className="font-semibold">Giá sản phẩm</p>

            <div className="wrap_content_list-price">
              <div className="list_price">
                <p>Giá bán</p>
                <input
                  type="text"
                  placeholder="0"
                  id="cost_price"
                  name="cost_price"
                  onChange={handleChange}
                />
              </div>

              <div className="list_price">
                <p>Giá so sánh</p>
                <input
                  type="text"
                  placeholder="0"
                  id="compare_price"
                  onChange={handleChange}
                  name="compare_price"
                />
              </div>
            </div>
          </div>

          <div className="content_list">
            <p className="font-semibold">Giá sản phẩm</p>

            <div className="wrap_content_list-inventory">
              <div className="list_quantity-inventory">
                <p>Số lượng</p>
                <input
                  type="text"
                  placeholder="0"
                  id="stock_quantity"
                  name="stock_quantity"
                  onChange={handleChange}
                />
              </div>

              <div className="list_price-inventory">
                <p>Giá nhập</p>
                <input
                  type="text"
                  placeholder="0"
                  id="price"
                  name="price"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="wrap_btn-save">
            <input className="btn_save-data" type="submit" value="Lưu" />

            <button className="btn_save-data cancel_data ">
              <a href="http://localhost:5173/admin/products">Huỷ</a>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewProducts;
