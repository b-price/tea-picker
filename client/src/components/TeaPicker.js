import React, { useState } from 'react'
import { Card, Row, Col, Container, Button, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import PickTea from './PickTea.js'
import Session from './Session.js'
import TeaPicked from './TeaPicked.js'
import InTheMoodFor from './InTheMoodFor.js'
import Add from "./Add.js";
import {useSession} from "../contexts/SessionContext.js";
import {useVessels} from "../contexts/VesselContext.js";
import {useTea} from "../contexts/TeaContext.js";
import Edit from "./Edit.js";

export default function TeaPicker(){
    const {getTea, addTea, loading} = useTea()
    const {sessions, addSession} = useSession()
    const {getVessel, addVessel} = useVessels()

    const [showPickTea, setShowPickTea] = useState(false)
    const [showAddTea, setShowAddTea] = useState(false)
    const [showAddVessel, setShowAddVessel] = useState(false)
    const [showAddSession, setShowAddSession] = useState(false)
    const [showTeaPicked, setShowTeaPicked] = useState(false)
    const [showInTheMoodFor, setShowInTheMoodFor] = useState(false)
    const navigate = useNavigate()
    const [pickedSession, setPickedSession] = useState()

    function handlePage(path) {
        navigate(path)
    }
    function openPickTeaModal() {
        setShowPickTea(true)
    }
    function openAddTeaModal() {
        setShowAddTea(true)
    }
    function openAddVesselModal() {
        setShowAddVessel(true)
    }
    function openAddSessionModal() {
        setShowAddSession(true)
    }
    function openTeaPickedModal() {
        setShowTeaPicked(true)
    }
    function openInTheMoodForModal() {
        setShowInTheMoodFor(true)
    }
    function updatePicked(session){
        setPickedSession(session)
    }
    function onNewSession(){
        updatePicked({...sessions[0], date: new Date().toJSON().slice(0, 10)})
        setShowAddSession(true)
    }

    let teaObj = {name: "", type: "", vendor: ""}
    let vesselObj = {name: ""}
    if (sessions){
        try{
            vesselObj = getVessel(sessions[0].vessel)
            teaObj = getTea(sessions[0].tea)
        } catch(e) {
            console.log(e)
        }
    }

    if (loading){
        return (
            <Container>
                <Row xs={2} md={4} lg={8}>
                    <Col className="align-self-center text-center">
                        <Button variant="primary" size="lg" onClick={null} className="alig">
                            Loading!
                        </Button>
                    </Col>
                    <Col xs lg="2">
                        <Stack gap="2">
                            <Button variant="outline-primary" onClick={null}>
                                Teas
                            </Button>
                            <Button variant="outline-primary" onClick={null}>
                                Vessels
                            </Button>
                            <Button variant="outline-primary" onClick={null}>
                                Sessions
                            </Button>
                        </Stack>
                    </Col>
                </Row>
                <Row className="py-5">
                    <Card >
                        <Card.Body>
                            <Row className={"align-items-center"}>
                                <Col>
                                    <Card.Title>Last Session</Card.Title>
                                </Col>
                                <Col>
                                    <Button variant={"primary"} onClick={null} className={"float-end me-2 mb-3 d-lg-none"}>New Session</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>

                                </Col>
                                <Col className={"d-none d-lg-inline"}>
                                    <Button variant={"primary"} onClick={null} className={""}>New Session</Button>
                                </Col>

                            </Row>
                        </Card.Body>
                    </Card>

                </Row>

            </Container>
        )
    }
    return (
        <>
            <Container>
                <Row xs={2} md={4} lg={8}>
                    <Col className="align-self-center text-center">
                        <Button variant="primary" size="lg" onClick={() => openPickTeaModal()} className="alig">
                            Pick Tea
                        </Button>
                    </Col>
                    <Col xs lg="2">
                        <Stack gap="2">
                            <Button variant="outline-primary" onClick={() => handlePage("/teas")}>
                                Teas
                            </Button>
                            <Button variant="outline-primary" onClick={() => handlePage("/vessels")}>
                                Vessels
                            </Button>
                            <Button variant="outline-primary" onClick={() => handlePage("/sessions")}>
                                Sessions
                            </Button>
                        </Stack>
                    </Col>
                </Row>
                <Row className="py-5">
                    <Card >
                        <Card.Body>
                            <Row className={"align-items-center"}>
                                <Col>
                                    <Card.Title>Last Session</Card.Title>
                                </Col>
                                <Col>
                                    <Button variant={"primary"} onClick={() => onNewSession()} className={"float-end me-2 mb-3 d-lg-none"}>New Session</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Session
                                        date={sessions[0].date}
                                        teaName={teaObj.name}
                                        teaType={teaObj.type}
                                        teaVendor={teaObj.vendor}
                                        vesselName={vesselObj.name}
                                        quantity={sessions[0].quantity}
                                        rating={sessions[0].rating}
                                        comments={sessions[0].comments}
                                        id={sessions[0]._id}
                                        key={sessions[0]._id}
                                        buttons={false}
                                    />
                                </Col>
                                <Col className={"d-none d-lg-inline"}>
                                    <Button variant={"primary"} onClick={() => onNewSession()} className={""}>New Session</Button>
                                </Col>

                            </Row>
                        </Card.Body>
                    </Card>
                    
                </Row>
                
            </Container>
            <PickTea 
                show={showPickTea} 
                handleClose={() => setShowPickTea(false)} 
                openTeaPickedModal={() => openTeaPickedModal()}
                openInTheMoodForModal={() => openInTheMoodForModal()}
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
            <Add
                show={showAddSession}
                handleClose={() => setShowAddSession(false)}
                add={addSession}
                openAddTeaModal={openAddSessionModal}
                openAddVesselModal={openAddVesselModal}
                type={"session"}
                current={pickedSession}
                after={() => setShowTeaPicked(false)}
            />
            <TeaPicked 
                show={showTeaPicked} 
                handleClose={() => setShowTeaPicked(false)} 
                openPickTeaModal={() => openPickTeaModal()}
                openAddSessionModal={() => openAddSessionModal()}
                updatePicked={updatePicked}
            />
            <InTheMoodFor 
                show={showInTheMoodFor}
                handleClose={() => setShowInTheMoodFor(false)}
                openTeaPickedModal={() => openTeaPickedModal()}
            />
        </>
    )
}
