import React, { useState, useEffect } from "react";
import ChartProduct from "./components/chart/products";
import Sidebar from "../../../../component/navigation/admin";
import ChartRevenue from "./components/chart/totalRevenue";
import "../style.css";

function SalesReport() {
  return (
    <div className="navigation-wrapper">
      <Sidebar />
      <div className="page-container">
        <ChartRevenue />
        <ChartProduct />
      </div>
    </div>
  );
}

export default SalesReport;
