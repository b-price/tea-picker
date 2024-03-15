import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";

export default function AddSession({show, handleClose}) {
    const [startDate, setStartDate] = useState(new Date())
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Session</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="teaTeaName">
                            <Form.Label>Date</Form.Label>
                            <Form.Control required>
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="teaTeaType">
                            <Form.Label>Tea Type</Form.Label>
                            <Form.Select required defaultValue="Select...">
                                <option>Select...</option>
                                <option>White</option>
                                <option>Oolong</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="teaQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <InputGroup>
                                <Form.Control required placeholder="357" />
                                <InputGroup.Text>grams</InputGroup.Text>
                            </InputGroup>
                            
                        </Form.Group>
                        <Form.Group as={Col} controlId="teaVendor">
                            <Form.Label>Vendor</Form.Label>
                            <Form.Control placeholder="Crimson Lotus" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="teaCost">
                            <Form.Label>Cost Per Gram</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control placeholder="0.50" />
                                <InputGroup.Text>/ gram</InputGroup.Text>
                            </InputGroup>
                            
                        </Form.Group>
                        <Form.Group as={Col} controlId="teaYear">
                            <Form.Label>Year</Form.Label>
                            <Form.Control placeholder="2007" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="teaRating">
                            <Form.Label>Rating 1-10</Form.Label>
                            <Form.Control placeholder="9" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="teaTags">
                            <Form.Label>Tags</Form.Label>
                            <Form.Control placeholder="Floral, Astringent, ..." />
                        </Form.Group>
                    </Row>
                    
                    <Button variant="primary" type="submit">
                        Add Tea
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