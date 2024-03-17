import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

import SuccessAlert from "../../../../../../component/alert/success";

function ConfirmDeleteModal(props) {
  const [showSuccesAlert, setShowSuccesAlert] = useState(true);
  const { axiosFunction, onHide, selectedDeleteProduct } = props;

  const onClickYes = async () => {
    try {
      const res = await axiosFunction(selectedDeleteProduct);
      if (res) {
        setShowSuccesAlert(true);
        setTimeout(() => {
          onHide();
        }, 2000);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    setShowSuccesAlert(false);
  }, []);

  return (
    <Modal {...props} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Sure you wanna delete</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="success" onClick={onClickYes}>
          yes
        </Button>
        <Button variant="danger" onClick={onHide}>
          cancel
        </Button>
      </Modal.Footer>
      {showSuccesAlert ? <SuccessAlert /> : ""}
    </Modal>
  );
}

export default ConfirmDeleteModal;
