import { useState } from 'react'
import {Card, Button, Dropdown} from 'react-bootstrap'
import Session from './Session.js'
import NavButtons from './NavButtons.js'
import Add from "./Add.js";
import {useSession} from "../contexts/SessionContext.js";
import {useTea} from "../contexts/TeaContext.js";
import {useVessels} from "../contexts/VesselContext.js";

export default function Sessions(){
    const [showAddTea, setShowAddTea] = useState(false)
    const {sessions, addSession, deleteSession, editSession, sortSessions} = useSession()
    const {getTea, addTea} = useTea()
    const {getVessel, addVessel} = useVessels()
    
    function openAddTeaModal() {
        setShowAddTea(true)
    }
    const [showAddSession, setShowAddSession] = useState(false)
    function openAddSessionModal() {
        setShowAddSession(true)
    }
    const [showAddVessel, setShowAddVessel] = useState(false)
    function openAddVesselModal() {
        setShowAddVessel(true)
    }
    function onAddTea(tea){

    }
    function onAddVessel(vessel){

    }

    let rows = []
    if (sessions){
        let teaObj = {name: "", type: "", vendor: ""}
        let vesselObj = {name: ""}
        sessions.forEach(session => {
            try{
                vesselObj = getVessel(session.vessel)
                teaObj = getTea(session.tea)
            } catch(e) {
                console.log(e)
            }
            rows.push(
                <Session
                    date={session.date}
                    teaName={teaObj.name}
                    teaType={teaObj.type}
                    teaVendor={teaObj.vendor}
                    vesselName={vesselObj.name}
                    quantity={session.quantity}
                    rating={session.rating}
                    comments={session.comments}
                    id={session._id}
                    key={session._id}
                    deleteFunction={deleteSession}
                    editFunction={editSession}
                    buttons={true}
                />
            )
        })
    }

    return(
        <>
            <Card>
                <Card.Header as="h2">
                    Sessions
                    <NavButtons 
                        button1="Home"
                        button2="Teas"
                        button3="Vessels"
                    />
                </Card.Header>
                <Card.Body>
                    <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
                        {rows}
                    </div>
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary" onClick={() => openAddSessionModal()}>
                        Add Session
                    </Button>
                    <Dropdown className={"float-end"}>
                        <Dropdown.Toggle variant={"outline-primary"}>Sort by...</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => sortSessions("date")}>Date</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortSessions("tea")}>Tea</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortSessions("quantity")}>Amount</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortSessions("vendor")}>Tea Vendor</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortSessions("rating")}>Rating</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortSessions("type")}>Tea Type</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortSessions("vessel")}>Vessel</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Footer>
            </Card>
            <Add
                show={showAddSession} 
                handleClose={() => setShowAddSession(false)} 
                openAddTeaModal={openAddTeaModal}
                openAddVesselModal={openAddVesselModal}
                add={addSession}
                type={"session"}
            />
            <Add
                show={showAddTea}
                handleClose={() => setShowAddTea(false)}
                add={addTea}
                type={"tea"}
            />
            <Add
                show={showAddVessel}
                handleClose={() => setShowAddVessel(false)}
                add={addVessel}
                type={"vessel"}
            />
        </>
    )
}