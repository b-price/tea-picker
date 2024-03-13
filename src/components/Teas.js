import { Modal, Button } from 'react-bootstrap'
import Tea from './Tea'

export default function Teas({show, handleClose}){
    const teas = 5
    return(
        <>
            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                <Modal.Title>Teas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tea />
                    <Tea />
                    <Tea />
                    <Tea />
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