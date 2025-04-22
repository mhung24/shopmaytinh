import axios from "axios";
const url = `http://localhost:3000`;
const api = "https://provinces.open-api.vn/api/p/";

const ApiService = {
  ApiProduct: async (skip) => {
    return await axios(`${url}/products?limit=50&skip=${skip}`);
  },

  ApiCategory: async () => {
    return await axios(`${url}/category`);
  },

  ApiSupplier: async () => {
    return await axios(`${url}/supplier`);
  },

  ApiUpload: async () => {
    return await axios(`${url}/products/uploads`);
  },

  ApiProductByID: async (id) => {
    return await axios(`${url}/products/details/${id}`);
  },

  ApiProductByCategoryID: async (id) => {
    return await axios(`${url}/products/category/${id}`);
  },

  ApiUser: async () => {
    return await axios(`${url}/users`);
  },

  ApiUserByID: async () => {
    return await axios(`${url}/users/login`);
  },
  ApiMyUserByID: async (id) => {
    return await axios(`${url}/users/account/${id}`);
  },

  ApiRating: async (id, skip) => {
    return await axios(`${url}/rating/${id}?limit=6&skip=${skip}`);
  },

  ApiRelatedProducts: async (price) => {
    return await axios(`${url}/products/price/min/${price}`);
  },

  ApiProvince: async () => {
    return await axios(`${api}`);
  },

  ApiDistrict: async (code) => {
    return await axios(`https://provinces.open-api.vn/api/p/${code}?depth=2`);
  },

  ApiCommune: async (code) => {
    return await axios(`https://provinces.open-api.vn/api/d/${code}?depth=2`);
  },

  ApiOrderById: async (id) => {
    return await axios(`${url}/orders/${id}`);
  },

  ApiDataOrders: async () => {
    return await axios(`${url}/orders`);
  },
};

export default ApiService;
