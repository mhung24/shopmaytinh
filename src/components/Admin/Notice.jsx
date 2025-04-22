import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

export const Notice = (props) => {
  const { data } = props;
  return (
    <>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert variant="outlined" severity={data.title}>
          {data.message}
        </Alert>
      </Stack>
    </>
  );
};
