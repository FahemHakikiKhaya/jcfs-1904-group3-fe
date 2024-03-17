import React, { useEffect, useState } from "react";
import axios from "../../../../utils/axios";
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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ProductList from "./component/productList";
import EditProductModal from "./modal/editProduct";
import AddProductModal from "./modal/addProduct/stepOne";
import ConfirmDeleteModal from "./modal/deleteProduct/Confirmation";
import Sidebar from "../../../../component/navigation/admin";
import "./style.css";
import "../style.css";

function Index(props) {
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [modalShowDeleteProduct, setModalShowDeleteProduct] = useState(false);
  const [modalShowEditProduct, setModalShowEditProduct] = useState(false);
  const [modalShowAddProduct, setModalShowAddProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [paginationState, setPaginationState] = useState({
    page: 1,
    maxPage: 0,
    itemsPerPage: 7,
  });
  const { page, itemsPerPage, maxPage } = paginationState;
  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products/filtered", {
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
  const deleteProducts = async (e) => {
    try {
      const res = await axios.delete("/products", {
        headers: {},
        data: {
          productId: e,
        },
      });
      return true;
    } catch (error) {
      throw error;
    }
  };
  const btnPrevPageHandler = () => {
    setPaginationState({ ...paginationState, page: page - 1 });
  };
  const btnNextPageHandler = () => {
    setPaginationState({ ...paginationState, page: page + 1 });
  };
  const onClickModalEditProducts = (e) => {
    setModalShowEditProduct(true);
  };
  const renderProducts = () => {
    return products.map((value) => {
      return (
        <ProductList
          products={value}
          onClickModalEditProducts={onClickModalEditProducts}
          setSelectedProduct={setSelectedProduct}
          deleteProducts={deleteProducts}
          onClickModalDeleteProducts={(e) => {
            setModalShowDeleteProduct(true);
            setSelectedDeleteProduct(e);
          }}
        />
      );
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className="navigation-wrapper">
      <Sidebar />
      <div className="page-container">
        <AddProductModal
          show={modalShowAddProduct}
          onHide={() => {
            setModalShowAddProduct(false);
            fetchProducts();
          }}
        />
        {selectedDeleteProduct ? (
          <ConfirmDeleteModal
            axiosFunction={deleteProducts}
            show={modalShowDeleteProduct}
            onHide={() => setModalShowDeleteProduct(false)}
            selectedDeleteProduct={selectedDeleteProduct}
          />
        ) : (
          " "
        )}

        {selectedProduct ? (
          <EditProductModal
            show={modalShowEditProduct}
            onHide={() => {
              setModalShowEditProduct(false);
              setSelectedProduct("");
            }}
            selectedProduct={selectedProduct}
          />
        ) : (
          <></>
        )}
        <TableContainer
          component={Paper}
          className="shoppingCart-table"
          sx={{
            marginTop: "50px",
            width: "100%",
            marginInline: "auto",
          }}
        >
          <Table>
            <TableRow>
              <TableCell className="row-1">id</TableCell>
              <TableCell className="row-2">Products Name</TableCell>
              <TableCell className="row-3">inspect</TableCell>
              <TableCell className="row-4">Manage</TableCell>
            </TableRow>
            <TableBody>
              {products.length ? renderProducts() : <h1>..Loading</h1>}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="button-container">
          <Button
            style={{
              width: "200px",
              backgroundColor: "lightgrey",
              color: "black",
            }}
            variant="contained"
            onClick={() => {
              setModalShowAddProduct(true);
            }}
          >
            <span>Add Products</span>
            <AddCircleIcon sx={{ marginLeft: "5px" }} />
          </Button>

          <Button
            onClick={btnPrevPageHandler}
            variant="text"
            sx={{ color: "black" }}
            disabled={page == 1 && true}
          >
            <h5>{"<"}</h5>
          </Button>
          <div className="text-center ml-3 mr-3">
            Page {page} of {maxPage}
          </div>
          <Button
            onClick={btnNextPageHandler}
            variant="text"
            sx={{ color: "black" }}
            disabled={page === maxPage && true}
          >
            <h5>{">"}</h5>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Index;
