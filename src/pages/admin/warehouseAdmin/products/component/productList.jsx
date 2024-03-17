import React from "react";
import { IconButton } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./style.css";

function Index(props) {
  const { productName, productId, image } = props.products;
  const {
    onClickModalEditProducts,
    setSelectedProduct,
    deleteProducts,
    onClickModalDeleteProducts,
  } = props;

  return (
    <TableRow
      key={productId}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>{productId}</TableCell>
      <TableCell>{productName}</TableCell>
      <TableCell>
        <img className="product-image " src={image} />
      </TableCell>
      <TableCell className="table-data">
        <IconButton
          className="button"
          onClick={(e) => {
            onClickModalEditProducts(e);
            setSelectedProduct(productId);
          }}
        >
          <ModeEditIcon />
        </IconButton>
        <IconButton
          className="button"
          onClick={() => {
            onClickModalDeleteProducts(productId);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default Index;
