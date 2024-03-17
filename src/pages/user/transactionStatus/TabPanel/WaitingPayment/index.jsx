import React, { useState, useEffect } from "react";
import axios from "../../../../../utils/axios";
import { Button } from "@mui/material";
import ConfirmationModal from "./modal";
import "./style.css";
import { useSelector } from "react-redux";

function TabWaitingPayment({handleChange}) {
  const userId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);

  const [paymentEvidence, setPaymentEvidece] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [detailTransaction, setDetailTransaction] = useState([]);
  const fetchTransactionHistory = async () => {
    try {
      const res = await axios.get(`/transactions/user/status`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          userId: userId,
          status: "waiting payment",
        },
      });
      const { resultTransactions, resultDetailTransactions } = res.data;
      if (resultTransactions.length) {
        setTransactionHistory(resultTransactions);
        setDetailTransaction(resultDetailTransactions);
      } else {
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

  const handleUploadPaymentEvidence = async (e) => {
    setPaymentEvidece(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setShowConfirmationModal(true);
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
            <span className="transaction-status">waiting payment</span>
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
              </div>
            </div>
          </div>

          <div className="transaction-detail-link">
            <div class="file-input">
              <input
                name="image"
                type="file"
                id="file"
                class="file"
                onChange={handleUploadPaymentEvidence}
              />
              <label for="file">Upload Payment Evidece</label>
            </div>
          </div>
          {paymentEvidence && (
            <ConfirmationModal
              onHide={() => {
                setShowConfirmationModal(false);
              }}
              show={showConfirmationModal}
              transactionId={trx.transactionId}
              previewImage={previewImage}
              paymentEvidence={paymentEvidence}
              token={token}
              handleChange={handleChange}
            />
          )}
        </div>
      );
    });
  };
  return <div>{renderTransaction()}</div>;
}

export default TabWaitingPayment;
