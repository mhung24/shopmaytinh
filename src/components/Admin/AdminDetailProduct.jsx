import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import uploadImg from "../../assets/images/upload_img.png";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../Api/ApiService";
import axios from "axios";
import { Notice } from "./Notice";

const AdminDetailProduct = () => {
  const url = "http://localhost:3000/products";
  const [message, setMessage] = useState({
    title: "",
    message: "",
  });
  const navigate = useNavigate();

  const editorRef = useRef(null);
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };

  const { id: idProduct } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    price: "",
    cost_price: "",
    compare_price: "",
    image: "",
    img: "",
    stock_quantity: "",
    category_id: "",
    supplier_id: "",
    supplier: "",
    category: "",
  });

  const loadData = async () => {
    const dataProduct = await ApiService.ApiProductByID(idProduct);

    const {
      title,
      description,
      price,
      costPrice,
      comparePrice,
      image,
      quantity,
      category_id,
      supplier_id,
      supplier,
      category,
    } = dataProduct.data[0];

    if (dataProduct.status === 200) {
      setFormData({
        title,
        description,
        price,
        cost_price: costPrice,
        compare_price: comparePrice,
        image: "",
        img: image,
        stock_quantity: quantity,
        category_id,
        supplier_id,
        supplier,
        category,
      });
    }
  };

  useEffect(() => {
    if (idProduct) {
      loadData();
    }
  }, []);

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

    try {
      const response = await axios.put(`${url}/update/${idProduct}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setMessage({
          title: "success",
          message: "Dữ liệu đã được sửa thành công!",
        });

        window.scrollTo(0, 0);

        setTimeout(() => {
          navigate("/admin/products");
        }, 2000);
      }
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${url}/delete/${idProduct}`);
      if (response.status === 200) {
        navigate("/admin/products");
      }
    } catch (error) {
      alert("Error deleting file");
    }
  };

  return (
    <>
      <div className="admin_notice">
        <Notice data={message} />
      </div>
      <div className="admin_content-title">
        <p>Sửa sản phẩm</p>
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
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="wrap_content_list-select">
              <div className="content_list-select">
                <p>Nhà cung cấp</p>
                <select
                  id="supplier_id"
                  name="supplier_id"
                  value={formData.supplier_id}
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
                  value={formData.category_id}
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
                textareaName="description"
                apiKey="kw7wvbtuq1uylgzz0s6zp9fgsflzvjwpnlgye9we6dl3lh06"
                onInit={(_evt, editor) => (editorRef.current = editor)}
                onChange={handleChange}
                initialValue={formData.description}
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
                formData.image || formData.img
                  ? "wrap_img-true-data  wrap_img mt-3"
                  : " wrap_img mt-3"
              }
            >
              <div
                className={
                  formData.image || formData.img
                    ? "wrap_img-file-block"
                    : "wrap_img-file"
                }
              >
                {formData.image && (
                  <img
                    className="img_file"
                    src={URL.createObjectURL(formData.image)}
                  />
                )}
                <img
                  className={formData.image ? "none" : ""}
                  src={
                    formData.img
                      ? `${url}/image/${formData.img}`
                      : `${url}/image/1741338590275_no_img.jpg`
                  }
                  alt=""
                />
              </div>
              <div className="text-center ">
                <div
                  className={
                    formData.image || formData.img
                      ? "wrap_uploadImg-file"
                      : "wrap_uploadImg"
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
            onChange={handleChange}
            id="url"
            name="url"
            value={formData.url ? formData.url : ""}
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
                onChange={handleChange}
                id="cost_price"
                name="cost_price"
                value={formData.cost_price}
              />
            </div>

            <div className="list_price">
              <p>Giá so sánh</p>
              <input
                type="text"
                placeholder="0"
                id="compare_price"
                name="compare_price"
                onChange={handleChange}
                value={formData.compare_price}
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
                value={formData.stock_quantity}
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
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="wrap_btn-save">
          <input className="btn_save-data" type="submit" value="Sửa" />

          <button onClick={handleDelete} className="btn_save-data cancel_data ">
            Xoá
          </button>
        </div>
      </form>
    </>
  );
};

export default AdminDetailProduct;
