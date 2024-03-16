import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useState } from "react";

export default function AddSession({show, handleClose, openAddTeaModal}) {
    const [startDate, setStartDate] = useState(new Date())
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Session</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="sessionDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control required>
                                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="sessionTea">
                            <Form.Label>Tea</Form.Label>
                            <Form.Select required defaultValue="Select...">
                                <option>Select...</option>
                                <option>Honey Dan Cong</option>
                                <option>Long Jing</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="sessionQuantity">
                            <Form.Label>Amount Used</Form.Label>
                            <InputGroup>
                                <Form.Control required placeholder="3.5" />
                                <InputGroup.Text>grams</InputGroup.Text>
                            </InputGroup>
                            
                        </Form.Group>
                        <Col>
                            <Button variant="outline-primary" onClick={() => openAddTeaModal()}>
                                New Tea
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="sessionRating">
                            <Form.Label>Rating 1-10</Form.Label>
                            <Form.Control placeholder="9" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="sessionComments">
                            <Form.Label>Comments</Form.Label>
                            <Form.Control placeholder="Less brew time..." />
                        </Form.Group>
                    </Row>
                    
                    <Button variant="primary" type="submit">
                        Add Session
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