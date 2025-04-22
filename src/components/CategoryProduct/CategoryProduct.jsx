import React from "react";

export const CategoryProduct = () => {
  const listPrice = [
    {
      title: "Giá dưới 1,000,000₫",
    },

    {
      title: "1,000,000₫ - 2,000,000₫",
    },

    {
      title: "2,000,000₫ - 3,000,000₫",
    },

    {
      title: "3,000,000₫ - 5,000,000₫",
    },

    {
      title: "5,000,000₫ - 10,000,000₫",
    },

    {
      title: "Giá trên 10,000,000₫",
    },
  ];
  return (
    <>
      <div>
        <h1>Hãng sản xuất</h1>
      </div>

      <div>
        <h1>Giá</h1>
        <ul>
          {listPrice.map((item, index) => (
            <li key={index} className="flex align-center">
              <input className="mr-2" type="checkbox" name="" id="" />
              <p>{item.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
