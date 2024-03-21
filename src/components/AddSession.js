import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useState } from "react";
import SessionInputForm from "./SessionInputForm";

export default function AddSession({show, handleClose, openAddTeaModal, openAddVesselModal}) {
    const [startDate, setStartDate] = useState(new Date())
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Session</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <SessionInputForm 
                    openAddTeaModal={() => openAddTeaModal()} 
                    openAddVesselModal={() => openAddVesselModal()}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary">
                    Add Session
                </Button>
            </Modal.Footer>
        </Modal>
    )
}