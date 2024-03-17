import React, { useEffect, useState } from "react";
import axios from "../../../../utils/axios";
import { Button } from "@mui/material";
import { width } from "@mui/system";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";

function Index(props) {
  const userId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { variants, setSelectedVariant, selectedVariant, setSelectedSize } =
    props;
  const {
    productId,
    size,
    image,
    price,
    productName,
    variant,
    qtyAvailable,
    variantId,
  } = props.slicedProducts;

  const variantSelection = (e) => {
    setSelectedVariant(e.target.value);
  };

  const sizeSelection = (e) => {
    setSelectedSize(e.target.value);
  };

  const onQuantityIncrement = (e) => {
    if (quantity < qtyAvailable) {
      setQuantity(quantity + 1);
    }
  };

  const onQuantityDecrement = (e) => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const onAddToChart = async () => {
    try {
      const res = await axios.post(
        "/carts",
        {
          userId: userId,
          variantId,
          productId,
          productQuantity: quantity,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/carts");
    } catch (error) {
      throw error;
    }
  };

  const imageButtonMapping = () => {
    return variants.map((value) => {
      const colorLowerCased = value.variant.toLowerCase();

      return (
        <button
          className="roundButton"
          value={value.variant}
          onClick={variantSelection}
          style={{ backgroundColor: colorLowerCased }}
        ></button>
      );
    });
  };

  const sizeButtonMapping = () => {
    return variants.map((value) => {
      if (value.variant === selectedVariant)
        return value.size.map((value) => {
          return (
            <button
              value={value}
              onClick={sizeSelection}
              style={{ backgroundColor: "white", marginRight: "5px" }}
            >
              {value}
            </button>
          );
        });
    });
  };

  return (
    <div>
      <div className="container">
        <div className="row mt-3">
          <div className="col-6">
            <img className="image" src={image} alt="" />
          </div>
          <div className="col-6 d-flex flex-column justify-content-center">
            <h4>{productName}</h4>
            <h5>Rp {price}</h5>

            <div className="d-flex flex-row align-items-center">
              <button
                onClick={onQuantityDecrement}
                className="btn btn-primary "
              >
                -
              </button>
              <strong className="text-center mx-4">{quantity}</strong>
              <button
                onClick={onQuantityIncrement}
                className="btn btn-primary "
              >
                +
              </button>
            </div>
            <h6>quantity available : {qtyAvailable}</h6>
            <h6>selected color : {variant} </h6>

            <h6>selected size : {size}</h6>
            <div className="d-flex flex-row">{imageButtonMapping()}</div>

            <div className="d-flex flex-row" style={{ marginBlock: "10px" }}>
              {sizeButtonMapping()}
            </div>
            <button onClick={onAddToChart} className="btn btn-success mt-3">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
