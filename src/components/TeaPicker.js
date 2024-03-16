import React, { useState } from 'react'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Card } from 'react-bootstrap'
import Teas from './Teas' 
import Sessions from './Sessions'
import Vessels from './Vessels'
import PickTea from './PickTea'
import Session from './Session'
import AddTea from './AddTea'
import AddVessel from './AddVessel'
import AddSession from './AddSession'


export default function TeaPicker(){
    const [showTeas, setShowTeas] = useState(false)
    const [showVessels, setShowVessels] = useState(false)
    const [showSessions, setShowSessions] = useState(false)
    const [showPickTea, setShowPickTea] = useState(false)
    const [showAddTea, setShowAddTea] = useState(false)
    const [showAddVessel, setShowAddVessel] = useState(false)
    const [showAddSession, setShowAddSession] = useState(false)
    
    function openTeasModal() {
        setShowTeas(true)
    }
    function openVesselsModal() {
        setShowVessels(true)
    }
    function openSessionsModal() {
        setShowSessions(true)
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

    return (
        <>
            <Container>
                <Row xs={2} md={4} lg={6}>
                    <Col>
                        <Button variant="primary" size="lg" onClick={() => openPickTeaModal()}>
                            Pick Tea
                        </Button>
                    </Col>
                    <Col xs lg="2">
                        <Stack gap="2">
                            <Button variant="outline-primary" onClick={() => openTeasModal()}>
                                Teas
                            </Button>
                            <Button variant="outline-primary" onClick={() => openVesselsModal()}>
                                Vessels
                            </Button>
                            <Button variant="outline-primary" onClick={() => openSessionsModal()}>
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
            <Teas 
                show={showTeas} 
                handleClose={() => setShowTeas(false)} 
                openAddTeaModal={() => openAddTeaModal()}
            />
            <Vessels 
                show={showVessels} 
                handleClose={() => setShowVessels(false)}
                openAddVesselModal={() => openAddVesselModal()} 
            />
            <Sessions 
                show={showSessions} 
                handleClose={() => setShowSessions(false)} 
                openAddSessionModal={() => openAddSessionModal()}
            />
            <PickTea show={showPickTea} handleClose={() => setShowPickTea(false)} />
            <AddTea show={showAddTea} handleClose={() => setShowAddTea(false)} />
            <AddVessel show={showAddVessel} handleClose={() => setShowAddVessel(false)} />
            <AddSession 
                show={showAddSession} 
                handleClose={() => setShowAddSession(false)}
                openAddTeaModal={() => openAddTeaModal()}
            />
        </>
    )
}
