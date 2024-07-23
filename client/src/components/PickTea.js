import { Modal, Button, Stack } from 'react-bootstrap'

export default function PickTea(props) {
    function onHitMe() {
        props.handleClose()
        props.openTeaPickedModal()
    }
    function onMoodFor(){
        props.handleClose()
        props.openInTheMoodForModal()
    }
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} size="sm">
                <Modal.Header closeButton>
                <Modal.Title>Pick Tea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack gap="4">
                        <Button variant="primary" size="lg" onClick={() => onHitMe()}>
                            Hit me!
                        </Button>
                        <Button variant="primary" onClick={() => onMoodFor()}>
                            I'm in the mood for...
                        </Button>
                    </Stack>
                    
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}