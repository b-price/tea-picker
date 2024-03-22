import { Button, Container, Row, Card, Form, Col, Modal } from "react-bootstrap";
import NavButtons from "./NavButtons.js";
import { useState } from "react";

export default function Settings() {
const favorite = undefined
const [showAreYouSure, setShowAreYouSure] = useState(false)
function openAreYouSure() {
    setShowAreYouSure(true)
}

function AreYouSure({openAreYouSure, onClose}) {
    return(
        <Modal show={openAreYouSure} onHide={onClose} >
            <Modal.Header closeButton>
                <Modal.Title>Are You Sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>This will PERMANENTLY delete your account!</p>
                <p>If you're sure, enter your password.</p>
                <Form>
                    <Form.Control type="password" className="mb-3"/>
                    <Button type="submit" variant="danger">DELETE ACCOUNT</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

    return(
        <Container>
            <Card>
                <Card.Header as="h3">
                    Settings
                    <Button variant="outline-primary" className="float-end">Back</Button>
                </Card.Header>
                <div style={{ maxHeight: "60vh", overflowY: "auto" }}>  
                    <Card.Header as="h5">Tea Settings</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="favoriteOnly">
                                <Form.Check type="switch" label="Use only favorite vessel" checked={favorite} />
                            </Form.Group>
                        </Form>
                    </Card.Body>
                    <Card.Header as="h5">Account Settings</Card.Header>
                    <Card.Body>
                        <Form.Check id="modeSwitch" type="switch" label="Dark mode" className="mb-3"/>
                        <Form>
                            <Row className="align-items-end mb-4">
                                <Form.Group as={Col} controlId="updateEmail" className="col-7 col-sm-6">
                                    <Form.Label>Update email</Form.Label>
                                    <Form.Control type="email" defaultValue="tea@picker.com" />
                                </Form.Group>
                                <Col>
                                    <Button variant="secondary" type="submit">Update</Button>
                                </Col>
                                
                            </Row>
                        </Form>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="updatePassword">
                                    <Form.Label>Update password</Form.Label>
                                    <Form.Control type="password" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="updatePasswordConfirm">
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control type="password" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Button variant="secondary" type="submit" className="">Update Password</Button>
                                </Col>
                            </Row>
                        </Form>
                        <Row className="my-5">
                            <Col>
                                <Button variant="danger" onClick={() => openAreYouSure()}>Delete Account</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </div>
                <Card.Footer>
                    <Button variant="primary">Logout</Button>
                </Card.Footer>
            </Card>
            <AreYouSure openAreYouSure={showAreYouSure} onClose={() => setShowAreYouSure(false)} />
        </Container>
    )
}