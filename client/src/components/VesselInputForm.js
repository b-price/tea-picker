import {Form, Row, Col, InputGroup, Button, Alert} from "react-bootstrap"
import {useVessels} from "../contexts/VesselContext.js";
import {useState} from "react";
import {useTea} from "../contexts/TeaContext.js";

export default function VesselInputForm({
    currentVessel ={
        name:"",
        type:"",
        capacity:0,
        vendor:"",
        disallowed:[],
        preferred:[],
        favorite:false,
        exclude:false,
        _date: new Date().toJSON()
    },
    isEdit=false,
    submit,
    handleClose
}) {
    const {vendors, vesselTypes} = useVessels()
    const {teaTypes} = useTea()
    let vesselSelect = []
    let vendorSelect = []
    let teaSelect = []
    if (vesselTypes){
        vesselTypes.forEach((type, index) => {
            vesselSelect.push(
                <option value={type} key={index}>{type}</option>
            )
        })
    }
    if (vendors){
        vendors.forEach((vendor, index) => {
            vendorSelect.push(
                <option value={vendor} key={index}>{vendor}</option>
            )
        })
    }
    if (teaTypes){
        teaTypes.forEach((type, index) => {
            teaSelect.push(
                <option value={type} key={index}>{type}</option>
            )
        })
    }

    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showSubmitAlert, setShowSubmitAlert] = useState(false);
    const [newType, setNewType] = useState(false);
    const [newVendor, setNewVendor] = useState(false);

    const [form, setForm] = useState({
        name: currentVessel.name,
        type: !isEdit? vesselTypes[0]: currentVessel.type,
        capacity: currentVessel.capacity,
        vendor: !isEdit? vendors[0]: currentVessel.vendor,
        favorite: currentVessel.favorite,
        exclude: currentVessel.exclude,
        disallowed: currentVessel.disallowed,
        preferred: currentVessel.preferred,
        _date: currentVessel._date
    })

    const [validated, setValidated] = useState(false);
    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        })
    }
    const handleSwitch = (event) => {
        let value = event.target.checked
        setForm({
            ...form,
            [event.target.id]: value,
        })
    }
    const handleMultiSelect = (event) => {
        let value = Array.from(event.target.selectedOptions, option => option.value)
        setForm({
            ...form,
            [event.target.id]: value,
        })
    }
    const handleNewType = () => {
        setNewType(!newType)
        if (!isEdit) {
            setForm({
                ...form,
                type: ""
            })
        }
    }
    const handleNewVendor = () => {
        setNewVendor(!newVendor)
        if (!isEdit) {
            setForm({
                ...form,
                vendor: ""
            })
        }
    }
    let buttonText = isEdit? "Edit Vessel" : "Add Vessel"
    function onSubmit(event) {
        event.preventDefault()
        if (event.currentTarget.checkValidity() === false){
            event.stopPropagation()
        }
        else {
            setValidated(true)
            try {
                submit(form, currentVessel._id)
                setShowSubmitAlert(true)
                setTimeout(() => {
                    setShowSubmitAlert(false)
                    handleClose()
                }, 1000)
            } catch (error) {
                console.error(error)
                setShowErrorAlert(true)
                setTimeout(() => {
                    setShowErrorAlert(false)
                    handleClose()
                }, 1000)
            }
        }
    }
    return(
        <Form noValidate validated={validated} onSubmit={onSubmit}>
            <Row className="mb-3">
                {/*Name*/}
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        id={"name"}
                        onChange={handleChange}
                        value={isEdit? form.name: undefined}
                        isInvalid={form.name === undefined || form.name === ""}
                    />
                    <Form.Control.Feedback type="invalid">Name is required.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                {/*Type*/}
                <Form.Group as={Col}>
                    <Form.Label>Vessel Type</Form.Label>
                    {newType ? (
                        <>
                            <Form.Control
                                required
                                id={"type"}
                                onChange={handleChange}
                                defaultValue={isEdit? form.type : undefined}
                                isInvalid={form.type === undefined || form.type === ""}
                            />
                            <Form.Control.Feedback type="invalid">Type is required.</Form.Control.Feedback>
                        </>
                    ) : (
                        <Form.Select
                            required
                            id={"type"}
                            onChange={handleChange}
                            defaultValue={form.type}
                        >
                            {vesselSelect}
                        </Form.Select>
                    )}
                </Form.Group>
                {/*Vendor*/}
                <Form.Group as={Col}>
                    <Form.Label>Vendor</Form.Label>
                    {newVendor ? (
                        <Form.Control
                            id={"vendor"}
                            onChange={handleChange}
                            defaultValue={isEdit? form.vendor: undefined}
                        />
                    ) : (
                        <Form.Select
                            id={"vendor"}
                            onChange={handleChange}
                            defaultValue={form.vendor}
                        >
                            {vendorSelect}
                        </Form.Select>
                    )}
                </Form.Group>
            </Row>
            <Row className="mb-3">
                {/*New Type+Vendor Buttons*/}
                <Col>
                    <Button variant="outline-primary" onClick={() => handleNewType()} className="mx-1 my-1 my-sm-0" size={"sm"}>
                        New Type
                    </Button>
                    <Button variant="outline-primary" onClick={() => handleNewVendor()} className="mx-1 my-1 my-sm-0" size={"sm"}>
                        New Vendor
                    </Button>
                </Col>
                {/*Capacity*/}
                <Form.Group as={Col}>
                    <Form.Label>Capacity</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            required
                            id={"capacity"}
                            onChange={handleChange}
                            defaultValue={isEdit? form.capacity: undefined}
                            isInvalid={form.capacity === 0 || isNaN(form.capacity)}
                        />
                        <InputGroup.Text>mL</InputGroup.Text>
                        <Form.Control.Feedback type="invalid">Capacity must be a number > 0.</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                {/*Favorite*/}
                <Form.Group as={Col}>
                    <Form.Check
                        id="favorite"
                        type={"switch"}
                        label="Favorite Vessel"
                        checked={form.favorite}
                        onChange={handleSwitch}
                    />
                </Form.Group>
                {/*Exclude*/}
                <Form.Group as={Col}>
                    <Form.Check
                        id="exclude"
                        type={"switch"}
                        label="Exclude Vessel"
                        checked={form.exclude}
                        onChange={handleSwitch}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                {/*Disallowed*/}
                <Form.Group as={Col} >
                    <Form.Label>Disallowed Types</Form.Label>
                    <Form.Select
                        id={"disallowed"}
                        onChange={handleMultiSelect}
                        multiple={true}
                        defaultValue={isEdit? form.disallowed : undefined}
                    >
                        {teaSelect}
                    </Form.Select>
                </Form.Group>
                {/*Preferred*/}
                <Form.Group as={Col} >
                    <Form.Label>Preferred Types</Form.Label>
                    <Form.Select
                        id={"preferred"}
                        onChange={handleMultiSelect}
                        multiple={true}
                        defaultValue={isEdit? form.preferred : undefined}
                    >
                        {teaSelect}
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" type={"submit"}>
                        {buttonText}
                    </Button>
                </Col>
                <Col>
                    <Alert
                        className={"p-2 text-center"}
                        variant={"danger"}
                        show={showErrorAlert}
                        onClose={() => setShowErrorAlert(false)}
                    >
                        Submission Error!
                    </Alert>
                    <Alert
                        className={"p-2 text-center"}
                        variant={"primary"}
                        show={showSubmitAlert}
                        onClose={() => setShowSubmitAlert(false)}
                    >
                        Submitted!
                    </Alert>
                </Col>
            </Row>
        </Form>
    )
}