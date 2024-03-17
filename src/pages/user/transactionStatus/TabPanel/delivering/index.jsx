import React, { useState, useEffect } from "react";
import axios from "../../../../../utils/axios";
import { Button } from "@mui/material";

import FinishDeliveringPayment from "./modal/Confirmation";
import "./style.css";
import { useSelector } from "react-redux";

function TabDelivering({ handleChange }) {
  const userId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const [selectedTransaction, setSelectedTransaction] = useState([]);

  const [detailTransaction, setDetailTransaction] = useState([]);
  const [showFinishDeliveringModal, setShowFinishDeliveringModal] =
    useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);

  const fetchTransactionHistory = async () => {
    try {
      const res = await axios.get(`/transactions/user/status`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          userId: userId,
          status: "delivering",
        },
      });
      const { resultTransactions, resultDetailTransactions } = res.data;
      if (resultTransactions) {
        setTransactionHistory(resultTransactions);
        setDetailTransaction(resultDetailTransactions);
      }
      if (!resultTransactions) {
        setTransactionHistory([]);
        setDetailTransaction([]);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  const formatIdr = (e) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(e);
  };

  const renderTransaction = () => {
    return transactionHistory.map((trx) => {
      const {
        province,
        city,
        district,
        urban_village,
        postal_code,
        detail_address,
      } = trx;
      return (
        <div className="transaction-item">
          <div className="transaction-item-info1">
            <strong>Transactions</strong>
            <span className="mx-2">{trx.created_at.split("T")[0]}</span>
            <span className="transaction-status">on the way</span>
          </div>

          <div className="transaction-detail">
            <div>
              {detailTransaction.map((item) => {
                if (item.transactionId == trx.transactionId)
                  return (
                    <div className="transaction-detail-item">
                      <p>The Warehouse</p>

                      <div className="d-flex">
                        <img
                          className="transaction-img"
                          src={item.productImage}
                        />
                        <div className="ms-3 transaction-info2">
                          <p>
                            <strong>{item.productName}</strong>
                          </p>
                          <p className="support">
                            {item.quantity} item x{formatIdr(item.productPrice)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
              })}
              <div>
                <p>
                  <strong>Alamat :</strong>
                </p>
                <p>
                  {province},{city},{district},{urban_village},{postal_code},
                  {detail_address}
                </p>
              </div>
            </div>

            <div className="transaction-total-price">
              <div>
                <p>Total Amount</p>
                <p>
                  <strong> {formatIdr(trx.totalAmount)} </strong>
                </p>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    setSelectedTransaction(trx);

                    setShowFinishDeliveringModal(true);
                  }}
                >
                  Finish transaction
                </Button>
                {selectedTransaction.length != 0 ? (
                  <FinishDeliveringPayment
                    show={showFinishDeliveringModal}
                    onHide={() => {
                      setShowFinishDeliveringModal(false);
                    }}
                    transaction={selectedTransaction}
                    detailTransactions={detailTransaction}
                    fetchTransactionHistory={fetchTransactionHistory}
                    token={token}
                    handleChange={handleChange}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return <div>{renderTransaction()}</div>;
}

export default TabDelivering;
