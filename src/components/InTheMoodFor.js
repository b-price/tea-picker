import { Button, Modal, Form, Row, Col } from "react-bootstrap";

export default function InTheMoodFor({show, handleClose, openTeaPickedModal}) {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>I'm in the mood for...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="moodTeaType">
                            <Form.Label>Tea Type</Form.Label>
                            <Form.Select defaultValue="Select...">
                                <option>Select...</option>
                                <option>White</option>
                                <option>Oolong</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="moodTeaKeyword">
                            <Form.Label>Keyword</Form.Label>
                            <Form.Control placeholder="Bing Dao" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="moodVessel">
                            <Form.Label>Vessel</Form.Label>
                            <Form.Select defaultValue="Select...">
                                <option>Select...</option>
                                <option>Small Gaiwan</option>
                                <option>Yinxi</option>
                                <option>Kyusu</option>
                            </Form.Select>
                        </Form.Group>
                        <Col>
                            <Button variant="outline-secondary">Load Preset</Button>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="moodYear">
                            <Form.Label>Year</Form.Label>
                            <Form.Select defaultValue="Select...">
                                <option>Select...</option>
                                <option>2023</option>
                                <option>2022</option>
                                <option>2020</option>
                            </Form.Select>
                        </Form.Group>
                        <Col>
                            <Button variant="outline-primary">Save Preset</Button>
                        </Col>
                    </Row>
                    <Form.Group controlId="moodCost">
                        <Form.Label>Cost</Form.Label>
                        <Form.Range />
                    </Form.Group>
                    <Form.Group controlId="moodRating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Range />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={() => openTeaPickedModal()}>
                        Pick Tea!
                    </Button>
                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}