import { Modal } from "react-bootstrap";

function ShowWinner(props) {
  return (
    <>
      <Modal
        show={props.show}
        onHide={() => {
          props.onHide();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
      </Modal>
    </>
  );
}

export default ShowWinner;
