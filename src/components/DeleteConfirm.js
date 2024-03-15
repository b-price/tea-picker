import { Modal, Button } from "react-bootstrap";

export default function DeleteConfirm({show, handleClose}){
    return (
        <Modal show={show} onHide={handleClose} size="sm" centered>
            <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-around">
                
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Delete
                    </Button>
                
                
                
            </Modal.Body>
        </Modal>
    )
}