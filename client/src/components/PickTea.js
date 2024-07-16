import { Modal, Button, Stack, Container } from 'react-bootstrap'

export default function PickTea({show, handleClose, openTeaPickedModal, openInTheMoodForModal}) {
    return (
        <>
            <Modal show={show} onHide={handleClose} size="sm">
                <Modal.Header closeButton>
                <Modal.Title>Pick Tea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack gap="4">
                        <Button variant="primary" size="lg" onClick={() => openTeaPickedModal()}>
                            Hit me!
                        </Button>
                        <Button variant="primary" onClick={() => openInTheMoodForModal()}>
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
        </>
    )
}