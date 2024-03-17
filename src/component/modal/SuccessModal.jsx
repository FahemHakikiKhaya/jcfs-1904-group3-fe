import { Modal, Button } from "react-bootstrap";

const SuccessModal = (props) => {
  return (
    <Modal {...props}>
      <Modal.Header>
        <Modal.Title>Success</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default SuccessModal;
