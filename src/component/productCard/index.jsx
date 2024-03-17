import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.css";
import FormatIdr from "../formatCurrency";
function Index(props) {
  const navigate = useNavigate();
  const { productName, productId, qtyAvailable, price, image } = props.product;

  return (
    <div
      className="card"
      style={{ width: "400px" }}
      onClick={() => {
        navigate(`/product-detail/${productId}`);
      }}
    >
      <Card>
        <div style={{ padding: "20px" }}>
          <Card.Img
            style={{ width: "350px" }}
            variant="top"
            src={image}
            className="image"
          />
        </div>
        <Card.Body>
          <Card.Text>{productName}</Card.Text>

          <Card.Text>{FormatIdr(price)}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Index;
