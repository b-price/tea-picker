import { Modal, Button } from "react-bootstrap"
import Session from "./Session"

export default function TeaPicked({
    show, 
    handleClose, 
    openTeaPickedModal, 
    openInTheMoodForModal}
){
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Tea Picked!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Session buttons={false}/>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="success">
                Add to Sessions
            </Button>
            </Modal.Footer>
        </Modal>
    )
        
}