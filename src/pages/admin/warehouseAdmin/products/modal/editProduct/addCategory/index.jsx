import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function Index(props) {
  const {
    categoryList,
    productId,
    setSelectedProductCategory,
    selectedProductCategory,
    setNewCategory,
    newCategory,
    onHide,
  } = props;
  const [category, setCategory] = useState({
    productId: "",
    categoryId: "",
    categoryName: "",
  });

  const selectedCategory = (e) => {
    const value = e.target.value.split(",");
    const id = parseInt(value[0]);
    const categoryName = value[1];
    setCategory({
      ...category,
      productId: productId,
      categoryId: id,
      categoryName,
    });
  };
  const onAddButton = async () => {
    setSelectedProductCategory([...selectedProductCategory, category]);
    setNewCategory([...newCategory, category]);
    onHide();
  };
  const categoryMapping = () => {
    return categoryList.map((value) => {
      return (
        <option value={[value.id, value.categoryName]}>
          {value.categoryName}
        </option>
      );
    });
  };

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      style={{ backgroundColor: "grey" }}
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Category To Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <select
          name="category"
          className="form-control"
          onChange={selectedCategory}
        >
          {categoryMapping()}
        </select>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onAddButton}>Add</Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Index;
