import { Button, Modal, Form, Row, Col, DropdownButton, DropdownItem } from "react-bootstrap";
import { useState } from "react";

export default function InTheMoodFor({show, handleClose, openTeaPickedModal}) {
    const [costSliderValue, setCostSliderValue] = useState(0.5)
    const [ratingSliderValue, setRatingSliderValue] = useState(8)
    const [showSavePreset, setShowSavePreset] = useState(false)
    const maxCost = 2.0
    const maxRating = 10
 
    const handleCostSliderChange = (e) => {
        setCostSliderValue(e.target.value)
    }
    const handleRatingSliderChange = (e) => {
        setRatingSliderValue(e.target.value)
    }
    function openSavePresetModal() {
        setShowSavePreset(true)
    }

    function SavePreset({show, handleClose}) {
        return(
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Preset Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className="col-5 col-sm-6">
                            <Form>
                                <Form.Group controlId="presetName">
                                    <Form.Control placeholder="Preset 1" />
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col>
                            <Button variant="secondary" onClick={handleClose} className="mx-2">
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Save
                            </Button>
                        </Col>
                       
                    </Row>
                    
                </Modal.Body>
            </Modal>
        )
    }

    return (
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>I'm in the mood for...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="moodTeaType">
                            <Form.Label>Tea Type</Form.Label>
                            <Form.Select defaultValue="Green">
                                <option>Green</option>
                                <option>White</option>
                                <option>Oolong</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="moodTeaKeyword">
                            <Form.Label>Keyword</Form.Label>
                            <Form.Control placeholder="Bing Dao" />
                        </Form.Group>
                    </Row>
                    <Row className="align-items-end mb-3">
                        <Form.Group as={Col} controlId="moodVessel">
                            <Form.Label>Vessel</Form.Label>
                            <Form.Select defaultValue="Large Gaiwan">
                                <option>Large Gaiwan</option>
                                <option>Small Gaiwan</option>
                                <option>Yixing</option>
                                <option>Kyusu</option>
                            </Form.Select>
                        </Form.Group>
                        <Col>
                            <DropdownButton variant="outline-secondary" title="Load Preset">
                                <DropdownItem>Preset 1</DropdownItem>
                                <DropdownItem>Preset 2</DropdownItem>
                                <DropdownItem>Preset 3</DropdownItem>
                            </DropdownButton>
                        </Col>
                    </Row>
                    <Row className="align-items-end mb-3">
                        <Form.Group as={Col} controlId="moodYear">
                            <Form.Label>Year</Form.Label>
                            <Form.Select defaultValue="2024">
                                <option>2024</option>
                                <option>2023</option>
                                <option>2022</option>
                                <option>2020</option>
                            </Form.Select>
                        </Form.Group>
                        <Col >
                            <Button variant="outline-primary" onClick={() => openSavePresetModal()}>
                                Save Preset
                            </Button>
                        </Col>
                    </Row>
                    <Form.Group controlId="moodCost">
                        <Form.Label>Max Cost: ${costSliderValue}/gram</Form.Label>
                        <Form.Range 
                            value={costSliderValue} 
                            onChange={handleCostSliderChange} 
                            min="0.0"
                            max={maxCost}
                            step="0.01"
                        />
                    </Form.Group>
                    <Form.Group controlId="moodRating">
                        <Form.Label>Min Rating: {ratingSliderValue}</Form.Label>
                        <Form.Range 
                            value={ratingSliderValue} 
                            onChange={handleRatingSliderChange} 
                            min="1"
                            max={maxRating}
                            step="0.5"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => openTeaPickedModal()}>
                    Pick Tea!
                </Button>
            </Modal.Footer>
        </Modal>
        <SavePreset show={showSavePreset} handleClose={() => setShowSavePreset()} />
        </>
    )
}