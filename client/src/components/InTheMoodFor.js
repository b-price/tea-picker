import {Button, Modal, Form, Row, Col, DropdownButton, DropdownItem, Alert} from "react-bootstrap";
import { useState } from "react";
import {useTea} from "../contexts/TeaContext.js";
import {useVessels} from "../contexts/VesselContext.js";
import {useAuth} from "../contexts/AuthContext.js";

export default function InTheMoodFor(props) {
    const {teaTypes, years, getMaxCost} = useTea()
    const {vessels} = useVessels()
    const {presets, addPreset} = useAuth()
    const [form, setForm] = useState({
        id: Math.random() * 10000, name: "", type: undefined, keywords: [], vessel: undefined, year: 0, maxCost: getMaxCost(), minRating: 0
    })
    const [teaSelect, setTeaSelect] = useState([getTypes()])
    const [vesselSelect, setVesselSelect] = useState([getVessels()])
    const [yearSelect, setYearSelect] = useState([getYears()])
    const [presetSelect, setPresetSelect] = useState([getPresets()])
    const [presetNaming, setPresetNaming] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const maxCost = getMaxCost()
    const maxRating = 10
    const minRating = 0
    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value === "Any"? undefined : event.target.value
        })
    }
    const handleKeywords = (event) => {
        const splitChars = /[\s,]/
        let value = event.target.value.toLocaleLowerCase().split(splitChars)
        console.log("Keywords: " + value)
        if (value[0] === "" && value.length === 1) {
            value = []
        }
        setForm({
            ...form,
            [event.target.id]: value,
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!props.onPickWithMood(form)){
            setShowErrorAlert(true)
            setTimeout(() => {
                setShowErrorAlert(false)
            }, 2000)
        }
        // if (!pickSession(form)){
        //     setShowErrorAlert(true)
        //     setTimeout(() => {
        //         setShowErrorAlert(false)
        //     }, 2000)
        // } else {
        //     openTeaPickedModal()
        //     handleClose()
        // }
        // let pick = getPickedSession(form)
        // console.log("pick: " + pick.tea + ", " + pick.vessel)
        // if (pick === "tea not found"){
        //     setShowErrorAlert(true)
        //     setTimeout(() => {
        //         setShowErrorAlert(false)
        //     }, 2000)
        // } else {
        //     updatePicked(pick)
        //     openTeaPickedModal()
        //     handleClose()
        // }

    }
    const handleSavePreset = () => {
        console.log(form)
        addPreset(form)
        console.log(presets)
        setPresetNaming(false)
        setShowAlert(true)
        setPresetSelect([getPresets()])
        setTimeout(() => {
            setShowAlert(false)
        }, 800)
    }
    const onLoadPreset = (preset) => {
        setForm(preset)
    }
    function getTypes(){
        let teaSelection = [<option value={undefined} key={-1}>Any</option>]
        teaTypes.forEach((type, index) => {
            teaSelection.push(
                <option value={type} key={index}>{type}</option>
            )
        })
        return teaSelection
    }

    function getVessels(){
        let vesselSelection = [<option value={undefined} key={-1}>Any</option>]
        vessels.forEach(vessel => {
            vesselSelection.push(
                <option value={vessel._id} key={vessel._id}>{vessel.name}</option>
            )
        })
        return vesselSelection
    }

    function getYears(){
        let yearSelection = [<option value={0} key={-1}>Any</option>]
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
        <Modal show={props.show} onHide={props.handleClose}>
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
                        {/*Keywords*/}
                        <Form.Group as={Col}>
                            <Form.Label>Keywords</Form.Label>
                            <Form.Control
                                id={"keywords"}
                                onChange={handleKeywords}
                                value={form.keywords}
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
                                value={form.vessel === undefined? "Any": form.vessel}
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
                                value={form.year}
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
                            min={minRating}
                            max={maxRating}
                            step="0.5"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Alert variant={"danger"} className={"p-2 mb-0"} show={showErrorAlert}>No matching teas found!</Alert>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" type={"submit"} onClick={handleSubmit}>
                    Pick Tea!
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}