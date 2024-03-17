import React from "react";
import { TableCell, Button, TableRow } from "@mui/material";

function CartList({ carts, onAddQuantity, onSubtractQuantity }) {
  const mapCarts = () => {
    return carts.map((value) => {
      return (
        <TableRow
          key={value.productId}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell align="left">
            <div className="product-row">
              <div className="product-image-container">
                <img className="product-image" src={value.image} alt="" />
              </div>

              <div className="product-description-container">
                <h5>{value.productName}</h5>
                <p> Variant : {value.variant}</p>
                <p>Size:{value.size}</p>
              </div>
            </div>
          </TableCell>
          <TableCell align="center" sx={{ width: "200px" }}>
            {Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(value.price)}
          </TableCell>
          <TableCell sx={{ width: "200px" }}>
            <div className="quantity-row">
              <Button
                variant="text"
                sx={{ color: "black" }}
                onClick={() => {
                  onSubtractQuantity(value.cartId, value.productQuantity);
                }}
              >
                <h5>-</h5>
              </Button>
              <p className="button-quantity-amount">{value.productQuantity}</p>
              <Button
                variant="text"
                sx={{ color: "black" }}
                onClick={() => {
                  onAddQuantity(value.cartId);
                }}
              >
                <h5>+</h5>
              </Button>
            </div>
          </TableCell>
          <TableCell align="right" sx={{ width: "200px" }}>
            {Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(value.total)}
          </TableCell>
        </TableRow>
      );
    });
  };
  return mapCarts();
}

export default CartList;
