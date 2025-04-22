import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ApiService from "../Api/ApiService";
import "./AccountClient.css";
import toast from "react-hot-toast";
import axios from "axios";

export const AccountClient = () => {
  const navigate = useNavigate();
  const url = "http://localhost:3000";
  const [list, setList] = useState([]);
  const data = Cookies.get("_ad");
  const dataUser = data ? JSON.parse(data) : [];
  const [dataProvince, setDataProvince] = useState([]);
  const [dataDistric, setDataDistric] = useState([]);
  const [dataCommune, setDataCommune] = useState([]);
  const [fullAddress, setFullAddress] = useState(dataUser.address);
  const [listItem, setListItem] = useState({
    fullName: dataUser.fullName,
    province: dataUser.province,
    distric: dataUser.distric,
    commune: dataUser.commune,
  });
  const token = Cookies.get("client");

  if (token === undefined) {
    navigate("/");
  }
  const loadData = async () => {
    const res = await ApiService.ApiProvince();
    if (res.status === 200) {
      setDataProvince(res.data);
    }

    if (dataUser.length !== 0) {
      setList([dataUser]);
    }

    if (Number(listItem.province) !== 0) {
      const distric = await ApiService.ApiDistrict(listItem.province);
      setDataDistric(distric.data.districts);
    }

    if (Number(listItem.distric) !== 0) {
      const commune = await ApiService.ApiCommune(listItem.distric);
      setDataCommune(commune.data.wards);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setListItem({ ...listItem, [name]: value });
  };

  const setAddress = () => {
    const provinceName =
      dataProvince.find((p) => p.code === Number(listItem.province))?.name ||
      "";
    const districtName =
      dataDistric.find((d) => d.code === Number(listItem.distric))?.name || "";

    const communeName =
      dataCommune.find((d) => d.code === Number(listItem.commune))?.name || "";

    if (provinceName && districtName && communeName) {
      const address = `${communeName}, ${districtName}, ${provinceName}`;
      setFullAddress(address);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${url}/users/update/account/${list[0]?.id}`,
        {
          fullName: listItem.fullName,
          province: listItem.province,
          distric: listItem.distric,
          commune: listItem.commune,
          address: fullAddress,
        }
      );

      if (response.status === 200) {
        toast.success("Cập nhật thành công");
        const response = await ApiService.ApiMyUserByID(list[0].id);
        Cookies.set("_ad", JSON.stringify(response.data), { expires: 30 });
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
    setAddress();
  }, [listItem]);

  return (
    <>
      <div>
        <h2>Thông tin tài khoản</h2>
        {list?.map((item, index) => (
          <form
            key={index}
            className="form-account-client"
            onSubmit={handleSubmit}
          >
            <div className="wrap_form-account-client-input">
              <p>Họ tên</p>
              <input
                type="text"
                value={listItem.fullName}
                onChange={handleChange}
                name="fullName"
                id="fullName"
              />
            </div>

            <div className="wrap_form-account-client-input">
              <p>Số điện thoại</p>
              <input
                type="text"
                value={item.phone}
                disabled
                onChange={handleChange}
              />
            </div>

            <div className="wrap_form-account-client-input">
              <p>Email</p>
              <input
                type="text"
                value={item.email}
                disabled
                onChange={handleChange}
              />
            </div>

            <div className="wrap_form-account-client-input">
              <div className=" wrap_select-province">
                <p>Tỉnh/Thành phố</p>
                <select
                  name="province"
                  id="province"
                  value={listItem?.province}
                  onChange={handleChange}
                >
                  <option value="0">Tỉnh/Thành phố</option>
                  {dataProvince?.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="wrap_select-province">
                <p>Quận/Huyện</p>
                <select
                  name="distric"
                  id="distric"
                  onChange={handleChange}
                  value={listItem?.distric}
                >
                  <option value="0">Quận/Huyện</option>
                  {dataDistric?.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="wrap_select-province">
                <p>Xã/Phường</p>
                <select
                  name="commune"
                  id="commune"
                  onChange={handleChange}
                  value={listItem?.commune}
                >
                  <option value="0">Xã/Phường</option>
                  {dataCommune?.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="wrap_form-account-client-input">
              <p>Địa chỉ cụ thể</p>
              <input
                type="text"
                value={fullAddress}
                onChange={handleChange}
                name="address"
                disabled
              />
            </div>
            <button className="btn_update-client">Cập nhật</button>
          </form>
        ))}
      </div>
    </>
  );
};
