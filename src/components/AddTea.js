import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";
import TeaInputForm from "./TeaInputForm.js";

export default function AddTea({show, handleClose}) {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Tea</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TeaInputForm />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary">
                    Add Tea
                </Button>
            </Modal.Footer>
        </Modal>
    )
}