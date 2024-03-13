import { Modal, Button } from 'react-bootstrap'
import Session from './Session'

export default function Sessions({show, handleClose}){
    const teas = 5
    return(
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                <Modal.Title>Teas</Modal.Title>
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
                <Button variant="primary" onClick={handleClose}>
                    Add Tea
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}