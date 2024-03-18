import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";

export default function AddTea({show, handleClose}) {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Tea</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="teaTeaName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required placeholder="Xianguan FT #8" />
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
                        <Form.Group as={Col} controlId="teaRatio">
                            <Form.Label>Tea to Water Ratio</Form.Label>
                            <InputGroup>
                                <Form.Control placeholder="4.5" />
                                <InputGroup.Text>g/mL</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="teaTags">
                            <Form.Label>Tags</Form.Label>
                            <Form.Control placeholder="Floral, Astringent, ..." />
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary">
                    Add Tea
                </Button>
            </Modal.Footer>
        </Modal>
    )
}