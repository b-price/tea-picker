import { Button, Modal } from "react-bootstrap";
import TeaInputForm from "./TeaInputForm.js";
import SessionInputForm from "./SessionInputForm.js";
import VesselInputForm from "./VesselInputForm.js";

export default function Add({show, handleClose, add, type, openAddTeaModal, openAddVesselModal}) {
    let titleText
    let form
    switch (type) {
        case "tea":
            titleText = "Add Tea"
            form = <TeaInputForm submit={add} handleClose={handleClose}/>
            break
        case "vessel":
            titleText = "Add Vessel"
            form = <VesselInputForm submit={add} handleClose={handleClose}/>
            break
        case "session":
            titleText = "Add Session"
            form = <SessionInputForm submit={add} handleClose={handleClose} openAddTeaModal={openAddTeaModal} openAddVesselModal={openAddVesselModal}/>
            break
        default:
            console.log("Error: no input type specified")
            titleText = "Error"
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{titleText}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {form}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}