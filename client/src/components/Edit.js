import { Button, Modal } from "react-bootstrap";
import TeaInputForm from "./TeaInputForm.js";
import SessionInputForm from "./SessionInputForm.js";
import VesselInputForm from "./VesselInputForm.js";

export default function Edit({show, handleClose, edit, type, current}) {
    let titleText
    let form
    switch (type) {
        case "tea":
            titleText = "Edit Tea"
            form = <TeaInputForm submit={edit} handleClose={handleClose} currentTea={current} isEdit={true}/>
            break
        case "vessel":
            titleText = "Edit Vessel"
            form = <VesselInputForm submit={edit} handleClose={handleClose} currentVessel={current} isEdit={true}/>
            break
        case "session":
            titleText = "Edit Session"
            form = <SessionInputForm submit={edit} handleClose={handleClose} currentSession={current} isEdit={true}/>
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