import {Modal, Button, Alert} from "react-bootstrap"
import Session from "./Session.js"
import {useSession} from "../contexts/SessionContext.js";
import {useState} from "react";
import {useTea} from "../contexts/TeaContext.js";
import {useVessels} from "../contexts/VesselContext.js";

export default function TeaPicked(props){
    const {pickedSession} = useSession()
    const {getTea} = useTea()
    const {getVessel} = useVessels()
    const [showAlert, setShowAlert] = useState(false)
    function onAdd(){
        props.onAddPicked()
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
            props.handleClose()
        }, 800)
    }
    return (
        <Modal show={props.show} onHide={props.handleClose} size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Tea Picked!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Session
                    date={pickedSession.date}
                    teaName={getTea(pickedSession.tea).name}
                    teaType={getTea(pickedSession.tea).type}
                    teaVendor={getTea(pickedSession.tea).vendor}
                    vesselName={getVessel(pickedSession.vessel).name}
                    quantity={pickedSession.quantity}
                    rating={pickedSession.rating}
                    comments={pickedSession.comments}
                    id={pickedSession._id}
                    key={pickedSession._id}
                    buttons={false}
                />
            </Modal.Body>
            <Modal.Footer>
                <Alert variant={"primary"} show={showAlert}>Submitted!</Alert>
                <Button variant="success" onClick={() => onAdd()}>
                    Add to Sessions
                </Button>
                <Button variant="outline-primary" onClick={() => props.onEditPicked()}>
                    Edit
                </Button>
                <Button variant="outline-primary" onClick={() => props.onTryAgain()}>
                    Try Again
                </Button>
            </Modal.Footer>
        </Modal>
    )
        
}