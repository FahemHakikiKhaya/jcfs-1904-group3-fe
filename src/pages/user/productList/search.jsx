import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  Select,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import axios from "../../../utils/axios";
import ListingProducts from "./components/listingProducts";

function Index() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [sortMethod, setSortMethod] = useState({
    sortBy: "",
    order: "",
  });
  const [paginationState, setPaginationState] = useState({
    page: 1,
    maxPage: 0,
    itemsPerPage: 9,
  });
  const { page, maxPage, itemsPerPage } = paginationState;
  const keyWordModify = () => {
    const copy = [params.keyWord];
    const result = [];

    copy.map((value, index) => {
      if (index === 0) {
        result.push("%");
      }
      if (index === copy.length - 1) {
        result.push(value, "%");
      } else {
        result.push(value);
      }
    });
    return result.join("");
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products", {
        params: {
          search: keyWordModify(),
          page: page,
          itemsPerPage: itemsPerPage,
          sortBy: sortMethod.sortBy,
          order: sortMethod.order,
        },
      });
      const { result, dataCount } = res.data;
      setProducts(result);
      setPaginationState({
        ...paginationState,
        maxPage: Math.ceil(dataCount[0].total / paginationState.itemsPerPage),
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const sortProducts = (e) => {
    const sortValue = e.target.value;

    switch (sortValue) {
      case "":
        break;
      case "default":
        setSortMethod({ sortBy: "", order: "" });
        break;
      case "lowPrice":
        setSortMethod({ sortBy: "price", order: "asc" });
        break;
      case "highPrice":
        setSortMethod({ sortBy: "price", order: "desc" });
        break;
      case "az":
        setSortMethod({ sortBy: "productName", order: "asc" });
        break;
      case "za":
        setSortMethod({ sortBy: "productName", order: "desc" });
        break;
    }
  };

  const btnPrevPageHandler = () => {
    setPaginationState({ ...paginationState, page: page - 1 });
  };
  const btnNextPageHandler = () => {
    setPaginationState({ ...paginationState, page: page + 1 });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [params, page, sortMethod]);

  return (
    <div
      style={{
        paddingInline: 50,
        paddingTop: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>{params.keyWord}</h1>
      <div>
        <FormControl style={{ width: 220 }}>
          <InputLabel id="demo-simple-select-label">SortBy</InputLabel>
          <Select label="SortBy" onChange={sortProducts}>
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="lowPrice">Lowest Price</MenuItem>
            <MenuItem value="highPrice">Highest Price</MenuItem>
            <MenuItem value="az">A-Z</MenuItem>
            <MenuItem value="za">Z-A</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        {products.length ? (
          <ListingProducts
            products={products}
            paginationState={paginationState}
          />
        ) : (
          <h1>Loading......</h1>
        )}
      </div>
      <div style={{ marginTop: 50 }}>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <Button
            onClick={btnPrevPageHandler}
            variant="contained"
            sx={{ backgroundColor: "black" }}
            disabled={page === 1 && true}
          >
            {"<"}
          </Button>
          <div className="text-center">
            Page {page} of {maxPage}
          </div>
          <Button
            onClick={btnNextPageHandler}
            variant="contained"
            sx={{ backgroundColor: "black" }}
            disabled={page === maxPage && true}
          >
            {">"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Index;
