import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";
import VesselInputForm from "./VesselInputForm";

export default function AddVessel({show, handleClose}) {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Vessel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <VesselInputForm />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary">
                    Add Vessel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}