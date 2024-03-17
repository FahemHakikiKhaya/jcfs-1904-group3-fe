import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../utils/axios";
import ProductDetailCard from "./components";

function Index() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [slicedProducts, setSlicedProducts] = useState({});
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products/productDetail", {
        params: { id: params.id },
      });
      const { data } = res;
      setProducts(data.result);

      var variantMap = [];
      data.result.map((value, index) => {
        if (index == 0) {
          variantMap = [
            ...variantMap,
            { variant: value.variant, size: [value.size] },
          ];
        
        }

        if (index > 0) {
          variantMap.map((vM, i) => {
            if (vM.variant === value.variant) {
            
              variantMap[i].size = [...variantMap[i].size, value.size];
            }
            if (variantMap[variantMap.length - 1].variant != value.variant) {
           
              variantMap = [
                ...variantMap,
                { variant: value.variant, size: [value.size] },
              ];
            }
          });
        }
      });

      setVariants(variantMap);
      setSelectedVariant(variantMap[0].variant);
      setSelectedSize(variantMap[0].size[0]);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    sliceData();
  }, [selectedVariant, selectedSize]);

  const sliceData = () => {
    products.forEach((value) => {
      if (value.variant === selectedVariant) {
        if (value.size) {
          if (value.size === selectedSize) {
            setSlicedProducts(value);
          }
        } else {
          setSlicedProducts(value);
        }
      }
    });
  };

  return (
    <div style={{ paddingTop: 200 }}>
      {slicedProducts && (
        <ProductDetailCard
          variants={variants}
          slicedProducts={slicedProducts}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          setSelectedSize={setSelectedSize}
        />
      )}
    </div>
  );
}

export default Index;
