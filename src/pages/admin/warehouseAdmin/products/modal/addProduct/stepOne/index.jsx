import React, { useState, useEffect } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import "./style.css";
import axios from "../../../../../../../utils/axios";
import StepTwo from "../stepTwo";

function Index(props) {
  const { onHide } = props;
  const [modalShowStepTwo, setModalShowStepTwo] = useState(false);
  const [fetchCategoryList, setFetchCategoryList] = useState([]);
  const [addedProductName, setAddedProductName] = useState("");
  const [addedCategories, setAddedCategories] = useState([]);
  const [addedVariants, setAddedVariants] = useState([]);
  const [categoryForm, setCategoryForm] = useState({
    categoryId: "",
    categoryName: "",
  });

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories");
      const { result } = res.data;
      setFetchCategoryList(result);
    } catch (error) {
      console.log(error);
    }
  };

  // Mapping all the available category
  const categoryMapping = () => {
    return fetchCategoryList.map((value, index) => {
      if (index === 0) {
        return (
          <>
            <option value={["", ""]}>Select More</option>
            <option value={[value.id, value.categoryName]}>
              {value.categoryName}
            </option>
          </>
        );
      } else {
        return (
          <option value={[value.id, value.categoryName]}>
            {value.categoryName}
          </option>
        );
      }
    });
  };

  const onAddCategory = () => {
    if (categoryForm.categoryId) {
      var isNotDuplicate;
      addedCategories.filter((value) => {
        if (value.categoryName != categoryForm.categoryName) {
          isNotDuplicate = true;
        } else {
          isNotDuplicate = false;
        }
      });
      if (!addedCategories.length) {
        setAddedCategories([...addedCategories, categoryForm]);
      }
      if (isNotDuplicate) {
        setAddedCategories([...addedCategories, categoryForm]);
      }
    }
  };

  // onChange selected category has a value of two string consisting of id and categoryName
  // example : ["1","Chair"]
  const onSelectedCategory = (e) => {
    const value = e.target.value.split(",");
    const id = parseInt(value[0]);
    const categoryName = value[1];
    setCategoryForm({
      categoryId: id,
      categoryName,
    });
  };

  const onAddedProductName = (e) => {
    setAddedProductName(e.target.value);
  };

  // Push everything except the selected category
  const onDeleteCategory = (e) => {
    const categoryId = e.target.value;
    const removeDeletedData = [];
    addedCategories.filter((value) => {
      if (value.categoryId != categoryId) {
        removeDeletedData.push(value);
      }
    });
    setAddedCategories(removeDeletedData);
  };

  // Mapping category form state in a badge with a delete button
  const showSelectedProductCategory = () => {
    return addedCategories.map((value) => {
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
            style={{ backgroundColor: "inherit", border: 0, color: "white" }}
            onClick={onDeleteCategory}
          >
            ⤬
          </button>
        </Badge>
      );
    });
  };

  // Show variant state in form of badge with delete button
  const showAddedVariants = () => {
    return addedVariants.map((value) => {
      const { color } = value;
      return (
        <Badge bg="primary" style={{ color: "white", margin: "3px" }}>
          {color}
          <button
            value={color}
            style={{ backgroundColor: "inherit", border: 0, color: "white" }}
            onClick={onDeleteVariantButton}
          >
            ⤬
          </button>
        </Badge>
      );
    });
  };

  // Submit product check if there is empty field
  // Submiting to product table first because it is the main table
  // Submiting categories and at last is variant
  // Posting variant give a respond of the new variant id to upload the image
  // to the specific id
  const submitNewProduct = async () => {
    try {
      if (addedProductName) {
        if (addedCategories.length) {
          if (addedVariants.length) {
            const postProduct = await axios.post("/products", {
              addedProductName,
            });
            const newProductId = postProduct.data.id;

            addedCategories.map(async (value) => {
              await axios.post("/products/category", {
                productId: newProductId,
                categoryId: value.categoryId,
              });
            });

            addedVariants.map(async (value) => {
              const variantData = {
                productId: newProductId,
                color: value.color,
                price: value.price,
                quantity: value.quantity,
                size: value.size,
                warehouseId: value.warehouseId,
              };
              const resData = await axios.post(
                "/products/variant",
                variantData
              );
              const { resultGet } = resData.data;
              const newVariantId = resultGet[0].id;
              const variantImage = new FormData();
              variantImage.append("image", value.image);
              variantImage.append("id", newVariantId);
              if (resData.data.message) {
                await axios.post("/products/variant/image", variantImage);
              }
            });
            setAddedProductName("");
            setAddedCategories([]);
            setAddedVariants([]);
            onHide();
            alert("Product berhasil di tambahkan");
          }
        }
      }
    } catch (error) {}
  };

  const onDeleteVariantButton = (e) => {
    const color = e.target.value;
    const removeDeletedData = [];
    addedVariants.filter((value) => {
      if (value.color !== color) {
        removeDeletedData.push(value);
      }
    });
    setAddedVariants(removeDeletedData);
  };
  const onCloseButton = () => {
    setAddedProductName("");
    setAddedCategories([]);
    setAddedVariants([]);
    onHide();
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Modal {...props} centered style={{ backgroundColor: "grey" }}>
      <Modal.Header>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <label className="label"> addedProductName</label>
          <input
            onChange={onAddedProductName}
            name="addedProductName"
            type="text"
            placeholder="Enter Product Name"
            className="input"
          />
          <label className="label">Category List</label>
          <div className="show-selected-category">
            {showSelectedProductCategory()}
          </div>
          <label className="label">Select Category</label>
          <select
            name="category"
            className="form-control"
            onChange={onSelectedCategory}
          >
            {categoryMapping()}
          </select>
          <label className="label">Added Variant</label>
          <div className="show-selected-category">{showAddedVariants()}</div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onAddCategory}>Add Category</Button>
        <Button onClick={() => setModalShowStepTwo(true)}>Add Variant</Button>
        <StepTwo
          show={modalShowStepTwo}
          onHide={() => setModalShowStepTwo(false)}
          setAddedVariants={setAddedVariants}
          addedVariants={addedVariants}
        />
        <Button onClick={submitNewProduct}>Submit</Button>
        <Button onClick={onCloseButton}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Index;
