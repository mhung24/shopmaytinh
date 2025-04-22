import React, { useEffect } from "react";
import { Header } from "./Header";
import ApiService from "../Api/ApiService";
import { useDispatch } from "react-redux";
import {
  ListCategory,
  ListOrdersDetailsAdmin,
  ListSupplier,
  ListUserDetails,
} from "../Redux/ProductSlice";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadDataCategory = async () => {
    const res = await ApiService.ApiCategory();
    dispatch(ListCategory(res.data));
  };

  const loadDataSupplier = async () => {
    const res = await ApiService.ApiSupplier();
    dispatch(ListSupplier(res.data));
  };

  const loadDataDetailOrders = async () => {
    const res = await ApiService.ApiDataOrders();
    const { orders } = res.data;
    dispatch(ListOrdersDetailsAdmin(orders));
  };

  const loadDataDetailUser = async () => {
    const res = await ApiService.ApiUser();
    const newData = res?.data.filter((i) => i.role !== 0);

    dispatch(ListUserDetails(newData));
  };

  const getToken = Cookies.get("token");
  const test = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    if (getToken !== undefined) {
      <Navigate to="/admin" />;
    } else {
      navigate("/admin/login");
    }
  }, [test]);
  useEffect(() => {
    loadDataCategory();
    loadDataSupplier();
    loadDataDetailOrders();
    loadDataDetailUser();
  }, []);
  return (
    <>
      <Header />
    </>
  );
};
