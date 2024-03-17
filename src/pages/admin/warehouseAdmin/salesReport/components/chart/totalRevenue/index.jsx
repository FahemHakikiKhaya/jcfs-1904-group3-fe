import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import axios from "../../../../../../../utils/axios";
import "./style.css";

function ChartRevenue() {
  const [sortMethod, setSortMethod] = useState("month");
  const [sortMethodValue, setSortMethodValue] = useState("2022");
  const [chartData, setChartData] = useState([]);

  const handleSortMethod = (e) => {
    setSortMethod(e.target.value);
  };
  const handleMethodValueChange = (e) => {
    setSortMethodValue(e.target.value);
  };

  const fetchChartData = async () => {
    try {
      const res = await axios.get("/transactions/total-revenue", {
        params: {
          year: sortMethodValue,
          method: sortMethod,
        },
      });
      const { result } = res.data;
      mappingChartData(result);
    } catch (error) {
      throw error;
    }
  };
  const mappingChartData = (e) => {
    const mappingResult = [];
    if (sortMethod === "month") {
      e.filter((value, index) => {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December ",
        ];
        const month = months[index];

        const Rupiah = parseInt(value.totalAmount);

        mappingResult.push({ month, Rupiah });
      });
    } else {
      e.filter((value) => {
        const year = value.Date.split("-")[0];
        const Rupiah = parseInt(value.totalAmount);

        mappingResult.push({ year, Rupiah });
      });
    }

    setChartData(mappingResult);
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  useEffect(() => {
    fetchChartData();
  }, [sortMethod, sortMethodValue]);

  return (
    <div className="chart">
      <div className="chart-editor">
        <h3 className="chart-title">Total Revenue</h3>
        <div className="chart-selector-form">
          <FormControl>
            <InputLabel id="demo-simple-select-label">sortBy</InputLabel>
            <Select
              label="sortBy"
              sx={{ width: "350px" }}
              onChange={handleSortMethod}
            >
              <MenuItem value="month">Month</MenuItem>
              <MenuItem value="year">year</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="chart-selector-form">
          {sortMethod === "month" ? (
            <FormControl fullWidth className="chart-selector-form">
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                label="MethodValue"
                onChange={handleMethodValueChange}
                sx={{ width: "350px" }}
              >
                <MenuItem value="2022">2022</MenuItem>
                <MenuItem value="2021">2021</MenuItem>
                <MenuItem value="2020">2020</MenuItem>
                <MenuItem value="2019">2019</MenuItem>
              </Select>
            </FormControl>
          ) : null}
        </div>
      </div>

      <ResponsiveContainer maxWidth="1100px" aspect={4 / 2}>
        <LineChart data={chartData}>
          <XAxis
            dataKey={sortMethod == "month" ? "month" : "year"}
            stroke="#5550bd"
          />
          <YAxis />
          <Line type="monotone" dataKey="Rupiah" stroke="#5550bd" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
export default ChartRevenue;
