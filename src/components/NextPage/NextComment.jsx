import React, { useEffect, useState } from "react";
import ApiService from "../Api/ApiService";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export const NextComment = (props) => {
  const { onChoosenData } = props;

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const [renderPage, setRenderPage] = useState({
    limit: 1,
    total: 0,
  });

  const number = Math.ceil(renderPage?.total / renderPage?.limit);

  const loadData = async () => {
    const res = await ApiService.ApiRating();
    const { limit, total } = res.data;
    if (res.status === 200) {
      setRenderPage({
        limit,
        total,
      });
    }
  };

  let array = [
    {
      number: 1,
      skip: 0,
    },
  ];

  let a = 0;

  for (let i = 2; i <= number; i++) {
    array = [...array, { number: i, skip: (a += 6) }];
  }

  const loadNumberPage = (i) => {
    array.forEach((item) => {
      if (item.number === i) {
        onChoosenData(item.skip);
      }
    });
  };

  useEffect(() => {
    loadData();
    loadNumberPage(page);
  }, [page]);

  return (
    <>
      <Stack spacing={4}>
        <Pagination
          count={number}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </Stack>
    </>
  );
};
