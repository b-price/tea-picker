import { Modal, Button } from 'react-bootstrap'
import Session from './Session'

export default function Sessions({
    show, 
    handleClose, 
    openAddSessionModal
}){
    return(
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                <Modal.Title>Sessions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Session />
                    <Session />
                    <Session />
                    <Session />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => openAddSessionModal()}>
                    Add Session
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}