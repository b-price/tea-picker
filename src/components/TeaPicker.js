import React, { useState } from 'react'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LastSession from './LastSession'
import Teas from './Teas'
import Sessions from './Sessions'

export default function TeaPicker(){
    const [showTeas, setShowTeas] = useState(false)
    const [showSessions, setShowSessions] = useState(false)

    function openTeasModal() {
        setShowTeas(true)
    }
    function openSessionsModal() {
        setShowSessions(true)
    }

    return (
        <>
            <Container>
                <Row xs={2} md={4} lg={6}>
                    <Col>
                        <Button variant="primary" size="lg" >Pick Tea</Button>
                    </Col>
                    <Col xs lg="2">
                        <Stack gap="2">
                            <Button variant="outline-primary" onClick={() => openTeasModal(true)}>
                                Teas
                            </Button>
                            <Button variant="outline-primary" >
                                Vessels
                            </Button>
                            <Button variant="outline-primary" onClick={() => openSessionsModal(true)}>
                                Sessions
                            </Button>
                        </Stack>
                    </Col>
                </Row>
                <Row className="py-5">
                    <LastSession />
                </Row>
                
            </Container>
            <Teas show={showTeas} handleClose={() => setShowTeas(false)} />
            <Sessions show={showSessions} handleClose={() => setShowSessions(false)} />
        </>
    )
}
