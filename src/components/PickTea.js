import { Modal, Button, Stack, Container } from 'react-bootstrap'
import { useState } from 'react'
import InTheMoodFor from './InTheMoodFor'

export default function PickTea({show, handleClose}) {
    const [showInTheMoodFor, setShowInTheMoodFor] = useState(false)
    
    function openInTheMoodForModal() {
        setShowInTheMoodFor(true)
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} size="sm">
                <Modal.Header closeButton>
                <Modal.Title>Pick Tea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack gap="4">
                        <Button variant="primary" size="lg">Hit me!</Button>
                        <Button variant="primary" onClick={() => openInTheMoodForModal(true)}>
                            I'm in the mood for...
                        </Button>
                    </Stack>
                    
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <Container>
                <InTheMoodFor show={showInTheMoodFor} handleClose={() => setShowInTheMoodFor(false)} />
            </Container>
        </>
    )
}