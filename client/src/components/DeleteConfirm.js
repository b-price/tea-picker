import { Modal, Button, Alert } from "react-bootstrap";
import {useState} from "react";

export default function DeleteConfirm({show, handleClose, id, deleteFunction}){
    const [showAlert, setShowAlert] = useState(false);
    const onDelete = () => {
        deleteFunction(id)
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
            handleClose()
        }, 2000)
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} size="sm" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-around">
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => onDelete()}>
                        Delete
                    </Button>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-around">
                    <Alert className={"p-2"} variant={"danger"} show={showAlert} onClose={() => setShowAlert(false)}>
                        Item Deleted!
                    </Alert>
                </Modal.Footer>
            </Modal>
        </>
    )
}