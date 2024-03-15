import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";

export default function AddVessel({show, handleClose}) {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Vessel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="vesselVesselName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required placeholder="White Large Gaiwan" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="vesselVesselType">
                            <Form.Label>Vessel Type</Form.Label>
                            <Form.Select required defaultValue="Select...">
                                <option>Select...</option>
                                <option>Gaiwan</option>
                                <option>Kyusu</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="vesselCapacity">
                            <Form.Label>Capacity</Form.Label>
                            <InputGroup>
                                <Form.Control required placeholder="100" />
                                <InputGroup.Text>mL</InputGroup.Text>
                            </InputGroup>
                            
                        </Form.Group>
                        <Form.Group as={Col} controlId="vesselVendor">
                            <Form.Label>Vendor</Form.Label>
                            <Form.Control placeholder="Yunnan Sourcing" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group controlId="vesselIllegal">
                            <Form.Label>Disallowed Types</Form.Label>
                            <Form.Check id="white" label="White" />
                            <Form.Check id="green" label="Green" />
                            <Form.Check id="oolong" label="Oolong" />
                            <Form.Check id="black" label="Black" />
                            <Form.Check id="sheng" label="Sheng Puer" />
                            <Form.Check id="shou" label="Shou Puer" />
                            <Form.Check id="dark" label="Dark" />
                        </Form.Group>
                    </Row>
                    
                    
                    <Button variant="primary" type="submit">
                        Add Vessel
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