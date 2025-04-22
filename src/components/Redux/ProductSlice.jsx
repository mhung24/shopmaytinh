import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const savedCart = Cookies.get("cart");

const initialState = {
  category: [],
  supplier: [],
  products: [],
  detailProduct: [],
  userAdmin: [],
  listCart: [],
  carts: savedCart ? JSON.parse(savedCart) : [],
  listOrders: [],
  userClient: [],
};

const saveCartToCookies = (carts) => {
  Cookies.set("cart", JSON.stringify(carts), { expires: 7 }); // Lưu cookies trong 7 ngày
};

export const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {
    ListCategory: (state, action) => {
      return { ...state, category: action.payload };
    },

    ListSupplier: (state, action) => {
      return { ...state, supplier: action.payload };
    },

    ListProducts: (state, action) => {
      return { ...state, products: action.payload };
    },

    ListDetailProduct: (state, action) => {
      return { ...state, detailProduct: action.payload };
    },
    ListUserAdmin: (state, action) => {
      return { ...state, userAdmin: action.payload };
    },

    addToCart: (state, action) => {
      const item = state.carts.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.carts.push({ ...action.payload });
      }
      saveCartToCookies(state.carts);
    },
    removeFromCart: (state, action) => {
      state.carts = state.carts.filter((item) => item.id !== action.payload);
      saveCartToCookies(state.carts);
    },

    updateQuantity: (state, action) => {
      const item = state.carts.find((i) => i.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
      saveCartToCookies(state.carts);
    },
    clearCart: (state) => {
      state.carts = [];
      Cookies.remove("cart");
    },

    ListOrdersDetailsAdmin: (state, action) => {
      return { ...state, listOrders: action.payload };
    },

    ListUserDetails: (state, action) => {
      return { ...state, userClient: action.payload };
    },
  },
});

export const {
  ListCategory,
  ListSupplier,
  ListProducts,
  ListDetailProduct,
  ListUserAdmin,
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
  ListOrdersDetailsAdmin,
  ListUserDetails,
} = ProductSlice.actions;

export default ProductSlice.reducer;
