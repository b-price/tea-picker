import { Modal, Button, Container } from 'react-bootstrap'
import Tea from './Tea'
import AddTea from './AddTea'
import { useState } from 'react'

export default function Teas({show, handleClose}){
    const [showAddTea, setShowAddTea] = useState(false)
    
    function openAddTeaModal() {
        setShowAddTea(true)
    }
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
                <Button variant="primary" onClick={() => openAddTeaModal()}>
                    Add Tea
                </Button>
                </Modal.Footer>
            </Modal>
            <Container>
                <AddTea show={showAddTea} handleClose={() => setShowAddTea(false)} />
            </Container>
        </>
    )
}