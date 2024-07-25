import {Button, Modal, Form, Row, Col, DropdownButton, DropdownItem, Alert} from "react-bootstrap";
import { useState } from "react";
import {useTea} from "../contexts/TeaContext.js";
import {useVessels} from "../contexts/VesselContext.js";
import {useSession} from "../contexts/SessionContext.js";

export default function InTheMoodFor({show, handleClose, openTeaPickedModal, updatePicked}) {
    const {teaTypes, years, getMaxCost} = useTea()
    const {vessels} = useVessels()
    const {getPickedSession} = useSession()
    const [presets, setPresets] = useState([
        {id: 0, name: "Preset 0", type: "Oolong", keywords: "", vessel: "", year: 2000, maxCost: 0, minRating: 0}
    ])
    const [form, setForm] = useState({
        id: Math.random() * 10000, name: "", type: teaTypes[0], keywords: "", vessel: vessels[0]._id, year: years[0], maxCost: 0, minRating: 0
    })
    const [teaSelect, setTeaSelect] = useState([getTypes()])
    const [vesselSelect, setVesselSelect] = useState([getVessels()])
    const [yearSelect, setYearSelect] = useState([getYears()])
    const [presetSelect, setPresetSelect] = useState([getPresets()])
    const [presetNaming, setPresetNaming] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const maxCost = getMaxCost()
    const maxRating = 10
    const minRating = 0
    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        updatePicked(getPickedSession(form))
        openTeaPickedModal()
        handleClose()
    }
    const handleSavePreset = () => {
        setPresets([...presets, form])
        console.log(presets)
        setPresetNaming(false)
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        }, 800)
    }
    const onLoadPreset = (preset) => {
        setForm(preset)
    }
    function getTypes(){
        let teaSelection = []
        teaTypes.forEach((type, index) => {
            teaSelection.push(
                <option value={type} key={index}>{type}</option>
            )
        })
        return teaSelection
    }

    function getVessels(){
        let vesselSelection = []
        vessels.forEach(vessel => {
            vesselSelection.push(
                <option value={vessel._id} key={vessel._id}>{vessel.name}</option>
            )
        })
        return vesselSelection
    }

    function getYears(){
        let yearSelection = []
        years.forEach((year, index) => {
            yearSelection.push(
                <option value={year} key={index}>{year}</option>
            )
        })
        return yearSelection
    }



    function getPresets(){
        let presetSelection = []
        presets.forEach(preset => {
            presetSelection.push(
                <DropdownItem onClick={() => onLoadPreset(preset)}>{preset.name}</DropdownItem>
            )
        })
        return presetSelection
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
                        {/*Type*/}
                        <Form.Group as={Col}>
                            <Form.Label>Tea Type</Form.Label>
                            <Form.Select
                                id={"type"}
                                onChange={handleChange}
                                value={form.type}
                            >
                                {teaSelect}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Keywords</Form.Label>
                            <Form.Control
                                id={"keywords"}
                                onChange={handleChange}
                                defaultValue={form.keywords}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="align-items-end mb-3">
                        {/*Vessel*/}
                        <Form.Group as={Col}>
                            <Form.Label>Vessel</Form.Label>
                            <Form.Select
                                id={"vessel"}
                                onChange={handleChange}
                                defaultValue={form.vessel}
                            >
                                {vesselSelect}
                            </Form.Select>
                        </Form.Group>
                        {/*Load Preset*/}
                        <Col>
                            <DropdownButton variant="outline-secondary" title="Load Preset">
                                {presetSelect}
                            </DropdownButton>
                        </Col>
                    </Row>
                    <Row className="align-items-end mb-3">
                        {/*Year*/}
                        <Form.Group as={Col}>
                            <Form.Label>Year</Form.Label>
                            <Form.Select
                                id={"year"}
                                onChange={handleChange}
                                defaultValue={form.year}
                            >
                                {yearSelect}
                            </Form.Select>
                        </Form.Group>
                        {/*Save Preset*/}
                        <Col>
                            {presetNaming? (
                                <Row>
                                    <Form.Label>Preset Name</Form.Label>
                                    <Form.Group as={Col} className={"col-8"}>
                                        <Form.Control id={"name"} onChange={handleChange} />
                                    </Form.Group>
                                    <Button as={Col} variant="primary" onClick={handleSavePreset} className={"col-4 col-lg-3"}>
                                        Save
                                    </Button>
                                </Row>
                            ) : (
                                <>
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => setPresetNaming(true)}
                                        className={""}
                                        hidden={showAlert}
                                    >
                                        Save Preset
                                    </Button>
                                    <Alert  variant="primary" className={"p-2 mb-0 w-75"} show={showAlert}>Preset Saved!</Alert>
                                </>
                            )}

                        </Col>
                    </Row>
                    {/*Max Cost*/}
                    <Form.Group>
                        <Form.Label>Max Cost: ${form.maxCost}/gram</Form.Label>
                        <Form.Range
                            id={"maxCost"}
                            value={form.maxCost}
                            onChange={handleChange}
                            min="0.0"
                            max={maxCost}
                            step="0.01"
                        />
                    </Form.Group>
                    {/*Min Rating*/}
                    <Form.Group>
                        <Form.Label>Min Rating: {form.minRating}</Form.Label>
                        <Form.Range
                            id={"minRating"}
                            value={form.minRating}
                            onChange={handleChange}
                            min="0"
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
        </>
    )
}