import React, { useState, useEffect } from "react";

import { Snackbar } from "@mui/material";

const FailedAlert = ({ message }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }, []);

  return (
    <div>
      <Snackbar
        ContentProps={{
          sx: {
            background: "red",
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        message={message}
        key={"top" + "center"}
      />
    </div>
  );
};

export default FailedAlert;
