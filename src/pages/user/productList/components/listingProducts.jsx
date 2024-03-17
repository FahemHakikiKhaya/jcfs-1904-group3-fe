import React from "react";
import ProductCard from "../../../../component/productCard";
import { Grid } from "@mui/material";
function listingProducts(props) {
  const { products, paginationState } = props;
  const { page, itemsPerPage } = paginationState;

  const renderProducts = () => {
    return products.map((product) => (
      <Grid item xs={3} style={{ paddingInline: "80px", paddingBlock: "20px" }}>
        <ProductCard product={product} />
      </Grid>
    ));
  };
  return (
    <Grid
      container
      sx={{ width: "100%", paddingRight: "100px", marginTop: "12px" }}
    >
      {renderProducts()}
    </Grid>
  );
}

export default listingProducts;
