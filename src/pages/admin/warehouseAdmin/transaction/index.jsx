import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Sidebar from "../../../../component/navigation/admin";
import TabWaitingPayment from "./TabPanel/WaitingPayment";
import TabWaitingConfirmation from "./TabPanel/waitingConfirmation";
import TabPackaging from "./TabPanel/packaging";
import TabDelivering from "./TabPanel/delivering";
import TabCompleted from "./TabPanel/completed";
import TabRejected from "./TabPanel/rejected";
import axios from "../../../../utils/axios";

import "./style.css";
import "../style.css";

function TransactionStatus() {
  const [value, setValue] = useState(0);

  const [waitingPaymentData, setWaitingPaymentData] = useState([]);
  const [waitingPaymentPagination, setWaitingPaymentPagination] = useState({
    page: 1,
    maxPage: 0,
    itemsPerPage: 5,
  });

  const [waitingConfirmationData, setWaitingConfirmationData] = useState([]);
  const [WaitingConfirmationPagination, setWaitingConfirmationPagination] =
    useState({
      page: 1,
      maxPage: 0,
      itemsPerPage: 5,
    });

  const [packagingData, setPackagingData] = useState([]);
  const [packagingPagination, setPackagingPagination] = useState({
    page: 1,
    maxPage: 0,
    itemsPerPage: 5,
  });

  const [deliveringData, setDeliveringData] = useState([]);
  const [deliveringPagination, setDeliveringPagination] = useState({
    page: 1,
    maxPage: 0,
    itemsPerPage: 5,
  });

  const [completedData, setCompletedData] = useState([]);
  const [completedPagination, setCompletedPagination] = useState({
    page: 1,
    maxPage: 0,
    itemsPerPage: 5,
  });

  const [rejectedData, setRejectedData] = useState([]);
  const [rejectedPagination, setRejectedPagination] = useState({
    page: 1,
    maxPage: 0,
    itemsPerPage: 5,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchTransactionHistory = async (
    status,
    setStateTransaction,
    setStatePagination,
    paginationState
  ) => {
    try {
      const { page, itemsPerPage, maxPage } = paginationState;

      const res = await axios.get(`/transactions/admin/status/`, {
        params: {
          status: status,
          limit: parseInt(itemsPerPage),
          offset: parseInt((page - 1) * itemsPerPage),
        },
      });

      const { result, dataCount } = res.data;
      if (result) {
        setStateTransaction(result);
        setStatePagination({
          ...paginationState,
          maxPage: Math.ceil(dataCount[0].totalData / itemsPerPage),
        });
      }
      if (!result) {
        setStateTransaction([]);
        setStatePagination({
          page: 1,
          maxPage: 1,
          itemsPerPage: 1,
        });
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchTransactionHistory(
      "waiting payment",
      setWaitingPaymentData,
      setWaitingPaymentPagination,
      waitingPaymentPagination
    );
    fetchTransactionHistory(
      "waiting confirmation",
      setWaitingConfirmationData,
      setWaitingConfirmationPagination,
      WaitingConfirmationPagination
    );
    fetchTransactionHistory(
      "packaging",
      setPackagingData,
      setPackagingPagination,
      packagingPagination
    );
    fetchTransactionHistory(
      "delivering",
      setDeliveringData,
      setDeliveringPagination,
      deliveringPagination
    );
    fetchTransactionHistory(
      "completed",
      setCompletedData,
      setCompletedPagination,
      completedPagination
    );
    fetchTransactionHistory(
      "rejected",
      setRejectedData,
      setRejectedPagination,
      rejectedPagination
    );
  }, []);

  return (
    <div className="navigation-wrapper">
      <Sidebar />
      <div className="page-container">
        <div className="status-container">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                textColor="black"
                TabIndicatorProps={{
                  sx: {
                    backgroundColor: "black",
                  },
                }}
              >
                <Tab sx={{ width: "16.6%" }} label="Waiting for payment" />
                <Tab sx={{ width: "16.6%" }} label="Waiting for confirmation" />
                <Tab sx={{ width: "16.6%" }} label="packaging" />
                <Tab sx={{ width: "16.6%" }} label="delivering" />
                <Tab sx={{ width: "16.6%" }} label="completed" />
                <Tab sx={{ width: "16.6%" }} label="rejected" />
              </Tabs>
            </Box>
            {value === 0 && (
              <TabWaitingPayment
                fetchTransactionHistory={() => {
                  fetchTransactionHistory(
                    "waiting payment",
                    setWaitingPaymentData,
                    setWaitingPaymentPagination,
                    waitingPaymentPagination
                  );
                }}
                waitingPaymentData={waitingPaymentData}
                waitingPaymentPagination={waitingPaymentPagination}
                setWaitingPaymentPagination={setWaitingPaymentPagination}
              />
            )}
            {value === 1 && (
              <TabWaitingConfirmation
                fetchTransactionHistory={() => {
                  fetchTransactionHistory(
                    "waiting confirmation",
                    setWaitingConfirmationData,
                    setWaitingConfirmationPagination,
                    WaitingConfirmationPagination
                  );
                }}
                waitingConfirmationData={waitingConfirmationData}
                WaitingConfirmationPagination={WaitingConfirmationPagination}
                setWaitingConfirmationPagination={
                  setWaitingConfirmationPagination
                }
              />
            )}
            {value === 2 && (
              <TabPackaging
                fetchTransactionHistory={() => {
                  fetchTransactionHistory(
                    "packaging",
                    setPackagingData,
                    setPackagingPagination,
                    packagingPagination
                  );
                }}
                packagingData={packagingData}
                packagingPagination={packagingPagination}
                setPackagingPagination={setPackagingPagination}
              />
            )}
            {value === 3 && (
              <TabDelivering
                fetchTransactionHistory={() => {
                  fetchTransactionHistory(
                    "delivering",
                    setDeliveringData,
                    setDeliveringPagination,
                    deliveringPagination
                  );
                }}
                deliveringData={deliveringData}
                deliveringPagination={deliveringPagination}
                setDeliveringPagination={setDeliveringPagination}
              />
            )}
            {value === 4 && (
              <TabCompleted
                fetchTransactionHistory={() => {
                  fetchTransactionHistory(
                    "completed",
                    setCompletedData,
                    setCompletedPagination,
                    completedPagination
                  );
                }}
                completedData={completedData}
                completedPagination={completedPagination}
                setCompletedPagination={setCompletedPagination}
              />
            )}
            {value === 5 && (
              <TabRejected
                fetchTransactionHistory={() => {
                  fetchTransactionHistory(
                    "rejected",
                    setRejectedData,
                    setRejectedPagination,
                    rejectedPagination
                  );
                }}
                rejectedData={rejectedData}
                rejectedPagination={rejectedPagination}
                setRejectedPagination={setRejectedPagination}
              />
            )}
          </Box>
        </div>
      </div>
    </div>
  );
}
export default TransactionStatus;
