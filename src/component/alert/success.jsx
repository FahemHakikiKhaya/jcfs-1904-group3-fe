import React, { useState, useEffect } from "react";

import { Snackbar } from "@mui/material";

const SuccessAlert = () => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }, []);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        message="Success"
        key={"top" + "center"}
      />
    </div>
  );
};

export default SuccessAlert;
