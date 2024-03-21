import React, { useState } from 'react'
import { Card, Row, Col, Container, Button, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import PickTea from './PickTea'
import Session from './Session'
import AddTea from './AddTea'
import AddVessel from './AddVessel'
import AddSession from './AddSession'
import TeaPicked from './TeaPicked'
import InTheMoodFor from './InTheMoodFor'

export default function TeaPicker(){
    const [showPickTea, setShowPickTea] = useState(false)
    const [showAddTea, setShowAddTea] = useState(false)
    const [showAddVessel, setShowAddVessel] = useState(false)
    const [showAddSession, setShowAddSession] = useState(false)
    const [showTeaPicked, setShowTeaPicked] = useState(false)
    const [showInTheMoodFor, setShowInTheMoodFor] = useState(false)
    const navigate = useNavigate()

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
                            <Card.Title>Last Session</Card.Title>
                            <Session buttons={false} />
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
            <AddTea show={showAddTea} handleClose={() => setShowAddTea(false)} />
            <AddVessel show={showAddVessel} handleClose={() => setShowAddVessel(false)} />
            <AddSession 
                show={showAddSession} 
                handleClose={() => setShowAddSession(false)}
                openAddTeaModal={() => openAddTeaModal()}
            />
            <TeaPicked 
                show={showTeaPicked} 
                handleClose={() => setShowTeaPicked(false)} 
                openPickTeaModal={() => openPickTeaModal()}
                openAddSessionModal={() => openAddSessionModal()}
            />
            <InTheMoodFor 
                show={showInTheMoodFor}
                handleClose={() => setShowInTheMoodFor(false)}
                openTeaPickedModal={() => openTeaPickedModal()}
            />
        </>
    )
}
