import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useFormik } from "formik";
import "./style.css";
import axios from "../../../../../../../utils/axios";

function Index(props) {
  const { onHide, setAddedVariants, addedVariants } = props;

  const validate = (values) => {
    const errors = {};

    if (!values.color) {
      errors.color = "Required";
    }
    if (!values.price) {
      errors.price = "Required";
    }
    if (!values.quantity) {
      errors.quantity = "Required";
    }
    if (!values.image) {
      errors.image = "Required";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      color: "",
      price: "",
      quantity: 0,
      size: "",
      warehouseId: "1",
      iamge: "",
    },
    validate,
    onSubmit: async (values) => {
      setAddedVariants([...addedVariants, values]);
      formik.resetForm();
      onHide();
    },
  });

  return (
    <Modal {...props} centered style={{ backgroundColor: "grey" }}>
      <Modal.Header closeButton>
        <Modal.Title>Add Variant To Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <label className="label"> Color</label>
          <input
            name="color"
            onChange={formik.handleChange}
            type="text"
            placeholder="Enter Product Color"
            className="input"
            value={formik.values.color}
            onBlur={formik.handleBlur}
          />
          {formik.touched.color && formik.errors.color ? (
            <div className="error">{formik.errors.color}</div>
          ) : null}
          <label className="label"> Price</label>
          <input
            name="price"
            onChange={formik.handleChange}
            type="number"
            placeholder="Enter Product Price"
            className="input"
            value={formik.values.price}
            onBlur={formik.handleBlur}
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="error">{formik.errors.price}</div>
          ) : null}

          <label className="label"> Quantity</label>
          <input
            name="quantity"
            onChange={formik.handleChange}
            type="number"
            placeholder="Enter Product Quantity"
            className="input"
            value={formik.values.quantity}
            onBlur={formik.handleBlur}
          />
          {formik.touched.quantity && formik.errors.quantity ? (
            <div className="error">{formik.errors.quantity}</div>
          ) : null}

          <label className="label">Variant Size (optional)</label>
          <select
            name="size"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.size}
          >
            <option value="">Select Size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
          <label className="label">Variant WarehouseId</label>
          <select
            name="warehouseId"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.warehouseId}
          >
            <option value="1">1</option>
          </select>

          <label className="label">Variant Image</label>
          <div>
            <input
              name="image"
              type="file"
              className="input-image-button"
              onChange={(event) =>
                formik.setFieldValue("image", event.target.files[0])
              }
            />
            {formik.errors.image ? (
              <div className="error">{formik.errors.image}</div>
            ) : null}
          </div>
          <div className="button-div">
            <Button type="submit">Save Changes</Button>
            <Button onClick={onHide} style={{ marginLeft: "10px" }}>
              Close
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default Index;
