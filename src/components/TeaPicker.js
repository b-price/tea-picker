import React from 'react'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LastSession from './LastSession'

export default function TeaPicker(){

    return (
        <>
            <Container>
                <Row xs={2} md={4} lg={6}>
                    <Col>
                        <Button variant="primary" size="lg" >Pick Tea</Button>
                    </Col>
                    <Col xs lg="2">
                        <Stack gap="2">
                            <Button variant="outline-primary">
                                Teas
                            </Button>
                            <Button variant="outline-primary">
                                Vessels
                            </Button>
                            <Button variant="outline-primary">
                                Sessions
                            </Button>
                        </Stack>
                    </Col>
                </Row>
                <Row className="py-5">
                    <LastSession />
                </Row>
                
            </Container>
        </>
    )
}
