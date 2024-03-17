import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import TransactionList from "./component/TransactionList";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function TabWaitingPayment({
  fetchTransactionHistory,
  completedData,
  completedPagination,
  setCompletedPagination,
}) {
  const { page, maxPage, itemsPerPage } = completedPagination;

  const btnPrevPageHandler = () => {
    setCompletedPagination({
      ...completedPagination,
      page: page - 1,
    });
  };
  const btnNextPageHandler = () => {
    setCompletedPagination({
      ...completedPagination,
      page: page + 1,
    });
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, [page]);

  return (
    <div>
      <TableContainer
        component={Paper}
        className="shoppingCart-table"
        sx={{ marginTop: "50px", width: "100%", marginInline: "auto" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ width: "5%" }}>
                <p>UserId</p>
              </TableCell>
              <TableCell align="center" sx={{ width: "5%" }}>
                <p>TransactionId</p>
              </TableCell>
              <TableCell align="center" sx={{ width: "5%" }}>
                <p>Username</p>
              </TableCell>
              <TableCell align="center" sx={{ width: "14%" }}>
                <p>Email</p>
              </TableCell>
              <TableCell align="center" sx={{ width: "14%" }}>
                <p>Products</p>
              </TableCell>
              <TableCell align="center" sx={{ width: "14%" }}>
                <p>Total amount</p>
              </TableCell>
              <TableCell align="center" sx={{ width: "14%" }}>
                <p>Address</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {TransactionList(completedData, fetchTransactionHistory)}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <Button
          sx={{ color: "black" }}
          onClick={btnPrevPageHandler}
          disabled={(page == 1) & true}
        >
          <ArrowBackIosIcon fontSize="small" />
        </Button>
        <strong style={{ paddingTop: "2px" }}>{page}</strong>
        <Button
          sx={{ color: "black" }}
          onClick={btnNextPageHandler}
          disabled={(page == maxPage) & true}
        >
          <ArrowForwardIosIcon />
        </Button>
      </div>
    </div>
  );
}

export default TabWaitingPayment;
