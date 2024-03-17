import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "../../../../../../../utils/axios";

import SuccessModal from "../../../../../../../component/modal/SuccessModal";

function AcceptWaitingPaymentModal(props) {
  const [showSuccesModal, setShowSuccesModal] = useState(false);
  const { onHide, transactionId, fetchTransactionHistory } = props;

  const onAcceptPayment = async () => {
    try {
      const res = await axios.put("/transactions/approve/waiting-payment", {
        transactionId,
      });
      if (res.data) {
        setShowSuccesModal(true);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    // fetchtransaction history setelah user menutup success alert agar menghindari render ulang
    if (!showSuccesModal) {
      fetchTransactionHistory();
    }
  }, [showSuccesModal]);

  return (
    <Modal {...props} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Confirm Accept Payment?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="success" onClick={onAcceptPayment}>
          yes
        </Button>
        <Button variant="danger" onClick={onHide}>
          cancel
        </Button>
      </Modal.Footer>
      <SuccessModal
        show={showSuccesModal}
        onHide={() => {
          setShowSuccesModal(false);
          onHide();
        }}
      />
    </Modal>
  );
}

function RejectWaitingPaymentModal(props) {
  const { onHide, transactionId, fetchTransactionHistory } = props;
  const [showSuccesModal, setShowSuccesModal] = useState(false);

  const onRejectPayment = async () => {
    try {
      const res = await axios.put("/transactions/reject/waiting-payment", {
        transactionId,
      });
      console.log(res.data);
      if (res.data) {
        setShowSuccesModal(true);
      }
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    // fetchtransaction history setelah user menutup success alert agar menghindari render ulang
    if (!showSuccesModal) {
      fetchTransactionHistory();
    }
  }, [showSuccesModal]);
  return (
    <Modal {...props} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Confirm Reject Payment?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="success" onClick={onRejectPayment}>
          yes
        </Button>
        <Button variant="danger" onClick={onHide}>
          cancel
        </Button>
      </Modal.Footer>
      <SuccessModal
        show={showSuccesModal}
        onHide={() => {
          setShowSuccesModal(false);
          onHide();
        }}
      />
    </Modal>
  );
}

export { AcceptWaitingPaymentModal, RejectWaitingPaymentModal };
