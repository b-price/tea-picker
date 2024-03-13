import { Modal, Button } from 'react-bootstrap'
import Vessel from './Vessel'

export default function Vessels({show, handleClose}){
    
    return(
        <>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                <Modal.Title>Vessels</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Vessel />
                    <Vessel />
                    <Vessel />
                    <Vessel />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Add Vessel
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}