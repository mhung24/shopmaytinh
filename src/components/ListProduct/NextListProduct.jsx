import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export const NextListProduct = (props) => {
  const [renderPage, setRenderPage] = useState({
    limit: 1,
    total: 0,
  });

  const [page, setPage] = useState(1);

  const { data, dataNext } = props;

  const number = Math.ceil(renderPage?.total / renderPage?.limit);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setRenderPage({
      limit: dataNext.limit,
      total: dataNext.total,
    });
  }, [dataNext]);

  let array = [
    {
      number: 1,
      skip: 0,
    },
  ];

  let a = 0;

  for (let i = 2; i <= number; i++) {
    array = [...array, { number: i, skip: (a += 20) }];
  }

  const loadNumberPage = (i) => {
    array.forEach((item) => {
      if (item.number === i) {
        data("", "", "", item.skip);
      }
    });
  };

  useEffect(() => {
    loadNumberPage(page);
  }, [page]);

  return (
    <>
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
    </>
  );
};
