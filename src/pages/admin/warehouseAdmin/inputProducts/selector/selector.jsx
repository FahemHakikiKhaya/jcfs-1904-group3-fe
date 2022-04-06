import React, { useEffect, useState } from "react";
import axios from "../../../../../utils/axios";
import { Table } from "react-bootstrap";
import { Button } from "@mui/material";
import ProductList from "../component/productList";
import "./style.css";
function Index(props) {
  const { setSelectedProductId } = props;
  const [products, setProducts] = useState([]);
  const [paginationState, setPaginationState] = useState({
    page: 1,
    maxPage: 0,
    itemsPerPage: 7,
  });
  const { page, itemsPerPage, maxPage } = paginationState;
  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products", {
        params: {
          page: page,
          itemsPerPage: itemsPerPage,
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
  const btnPrevPageHandler = () => {
    setPaginationState({ ...paginationState, page: page - 1 });
  };
  const btnNextPageHandler = () => {
    setPaginationState({ ...paginationState, page: page + 1 });
  };
  const renderProducts = () => {
    return products.map((value) => {
      return (
        <ProductList
          products={value}
          selectProductToEdit={selectProductToEdit}
        />
      );
    });
  };
  const selectProductToEdit = (e) => {
    setSelectedProductId(e.target.value);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page]);
  return (
    <div>
      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Products Name</th>
              <th>inspect</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {products.length ? renderProducts() : <h1>..Loading</h1>}
          </tbody>
        </Table>
      </div>
      <div className="d-flex flex-row justify-content-center button-container">
        <Button
          onClick={btnPrevPageHandler}
          variant="contained"
          sx={{ backgroundColor: "black" }}
          disabled={page == 1 && true}
        >
          {"<"}
        </Button>
        <div className="text-center ml-3 mr-3">
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
  );
}

export default Index;
