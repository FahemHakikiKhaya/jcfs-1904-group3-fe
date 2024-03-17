import React, { useState, useEffect } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import axios from "../../../../../../utils/axios";
import AddCategoryModal from "./addCategory";
import AddVariantModal from "./addVariant/addVariant";

import "./style.css";

function Index(props) {
  const { selectedProduct, onHide } = props;
  const [product, setProducts] = useState({});
  const [allCategoryList, setAllCategoryList] = useState([]);
  const [selectedProductCategory, setSelectedProductCategory] = useState([]);
  const [newCategory, setNewCategory] = useState([]);
  const [deleteCategory, setDeleteCategory] = useState([]);
  const [newImage, setNewImage] = useState("");
  const [modalShowAddCategory, setModalShowAddCategory] = useState(false);
  const [modalShowAddVariant, setModalShowAddVariant] = useState(false);
  const [paginationState, setPaginationState] = useState({
    page: 1,
    maxPage: 0,
    itemsPerPage: 1,
  });
  const {
    productName,
    productId,
    price,
    image,
    variant,
    qtyTotal,
    qtyAvailable,
    size,
    variantId,
  } = product;
  const { page, itemsPerPage, maxPage } = paginationState;

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories");
      const { result } = res.data;
      setAllCategoryList(result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const resGetProducts = await axios.get("/products/productDetail", {
        params: {
          id: selectedProduct,
          page: page,
          itemsPerPage: itemsPerPage,
        },
      });
      const resGetCategory = await axios.get("/products/category", {
        params: {
          id: selectedProduct,
        },
      });
      setSelectedProductCategory(resGetCategory.data.result);
      const { result, dataCount } = resGetProducts.data;

      setProducts(result[0]);
      setPaginationState({
        ...paginationState,
        maxPage: Math.ceil(dataCount[0].total / paginationState.itemsPerPage),
      });
    } catch (error) {
      console.log({ error });
    }
  };
  const onSaveProduct = async () => {
    try {
      const res = await axios.put("/products", {
        productData: {
          productName,
          color: variant,
          price,
          qtyTotal,
          qtyAvailable,
        },
        productId,
        variantId,
      });
      if (newCategory.length) {
        newCategory.map(async (value) => {
          const res = await axios.post("/products/category", {
            productId: value.productId,
            categoryId: value.categoryId,
          });
        });
        setNewCategory([]);
      }
      if (deleteCategory.length) {
        deleteCategory.map(async (value) => {
          const res = await axios.delete("/products/category", {
            headers: {},
            data: {
              productId: value.productId,
              categoryId: value.categoryId,
            },
          });
        });
        setDeleteCategory([]);
      }
      if (newImage) {
        const variantImage = new FormData();
        variantImage.append("image", newImage);
        variantImage.append("id", variantId);

        const resImage = await axios.post(
          "/products/variant/image",
          variantImage
        );
      }
      alert(res.data.message);
      onHide();
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteButton = (e) => {
    const categoryId = e.target.value;
    const deleteData = { productId: productId, categoryId: categoryId };
    setDeleteCategory([...deleteCategory, deleteData]);
    const removeDeletedData = [];
    selectedProductCategory.filter((value) => {
      if (value.categoryId != categoryId) {
        removeDeletedData.push(value);
      }
    });
    setSelectedProductCategory(removeDeletedData);
  };
  const showSelectedProductCategory = () => {
    return selectedProductCategory.map((value) => {
      var colors = [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "dark",
      ];
      var color = colors[Math.floor(Math.random() * colors.length)];

      return (
        <Badge bg={color} style={{ color: "white", margin: "3px" }}>
          {value.categoryName}
          <button
            value={value.categoryId}
            onClick={onDeleteButton}
            style={{ backgroundColor: "inherit", border: 0, color: "white" }}
          >
            ⤬
          </button>
        </Badge>
      );
    });
  };
  const btnPrevPageHandler = () => {
    setPaginationState({ ...paginationState, page: page - 1 });
  };
  const btnNextPageHandler = () => {
    setPaginationState({ ...paginationState, page: page + 1 });
  };

  const handleChange = (e) => {
    setProducts({ ...product, [e.target.name]: e.target.value });
  };

  const handleQuantityDecrement = () => {
    setProducts({
      ...product,
      qtyAvailable: qtyAvailable - 1,
      qtyTotal: qtyTotal - 1,
    });
  };

  const handleQuantityIncrement = () => {
    setProducts({
      ...product,
      qtyAvailable: qtyAvailable + 1,
      qtyTotal: qtyTotal + 1,
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [selectedProduct]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ backgroundColor: "grey" }}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <div>
            <p> Product Name : {productName}</p>
            <h5> Variant : {variant}</h5>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="editor-form-content">
          <div className="editor-form-content-one">
            <label>Product Name</label>
            <input
              name="productName"
              value={productName}
              onChange={handleChange}
              type="text"
              placeholder="Enter Product Name"
              className="Input"
            />
            <label>Product Color</label>
            <input
              name="variant"
              type="text"
              value={variant}
              onChange={handleChange}
              placeholder="Enter Product Name"
              className="Input"
            />
            <label>Product Price</label>
            <input
              value={price}
              onChange={handleChange}
              name="price"
              type="text"
              placeholder="Enter Product Name"
              className="Input"
            />

            <label>Product Quantity</label>
            <div className="quantity-row">
              <Button
                variant="text"
                sx={{ color: "black" }}
                onClick={handleQuantityDecrement}
              >
                <h5>-</h5>
              </Button>
              <p className="button-quantity-amount">{qtyTotal}</p>
              <Button
                variant="text"
                sx={{ color: "black" }}
                onClick={handleQuantityIncrement}
              >
                <h5>+</h5>
              </Button>
            </div>
          </div>
          <div className="editor-form-content-two">
            <label>Category List</label>
            <div className="show-selected-category">
              {showSelectedProductCategory()}
            </div>
            <label>Product size</label>
            <select
              name="warehouseId"
              disabled={size === null ? "true" : "false"}
              className="form-control"
            >
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="XL">L</option>
            </select>
            <label>Product Warehouse</label>
            <select name="warehouseId" className="form-control">
              <option value="1">1</option>
            </select>
            <label>Product Image</label>
            <div className="input-image">
              <input
                onChange={(event) => {
                  setNewImage(event.target.files[0]);
                }}
                type="file"
                className="input-image-button"
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={btnPrevPageHandler}
          variant="contained"
          disabled={page === 1 && true}
        >
          {"<"}
        </Button>
        <div className="text-center ml-3 mr-3">
          Page {page} of {maxPage}
        </div>
        <Button
          onClick={btnNextPageHandler}
          variant="contained"
          style={{ marginRight: "12%" }}
          disabled={page === maxPage && true}
        >
          {">"}
        </Button>
        <Button variant="success" onClick={() => setModalShowAddVariant(true)}>
          Add variant
        </Button>
        <AddVariantModal
          show={modalShowAddVariant}
          onHide={() => setModalShowAddVariant(false)}
          productId={productId}
        />
        <Button variant="success" onClick={() => setModalShowAddCategory(true)}>
          Add category
        </Button>
        {productId ? (
          <AddCategoryModal
            show={modalShowAddCategory}
            onHide={() => setModalShowAddCategory(false)}
            categoryList={allCategoryList}
            productId={productId}
            setSelectedProductCategory={setSelectedProductCategory}
            selectedProductCategory={selectedProductCategory}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
          />
        ) : (
          <p>....loading</p>
        )}

        <Button onClick={onSaveProduct} variant="danger">
          Save
        </Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Index;
