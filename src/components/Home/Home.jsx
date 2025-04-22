import React, { useEffect } from "react";
import ApiService from "../Api/ApiService";

export const Home = () => {
  const loadDataCategory = async () => {
    const res = await ApiService.ApiCategory();
    console.log(res.data);
  };

  useEffect(() => {
    loadDataCategory();
  }, []);
};
