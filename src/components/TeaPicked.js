import { Modal, Button } from "react-bootstrap"
import Session from "./Session"

export default function TeaPicked({
    show, 
    handleClose, 
    openPickTeaModal, 
    openAddSessionModal}
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
            <Button variant="success">
                Add to Sessions
            </Button>
            <Button variant="outline-primary" onClick={() => openAddSessionModal()}>
                Edit
            </Button>
            <Button variant="outline-primary" onClick={handleClose}>
                Try Again
            </Button>
            </Modal.Footer>
        </Modal>
    )
        
}