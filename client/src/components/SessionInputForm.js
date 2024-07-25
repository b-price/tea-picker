import {Form, Row, Col, InputGroup, Button, Alert} from "react-bootstrap"
import {useTea} from "../contexts/TeaContext.js";
import {useVessels} from "../contexts/VesselContext.js";
import {useState} from "react";

export default function SessionInputForm({
    currentSession={
        date:new Date().toJSON().slice(0, 10),
        tea:"",
        quantity:0,
        vessel:"",
        rating:0,
        comments:"",
    },
    isEdit = false,
    submit,
    handleClose,
    openAddTeaModal,
    openAddVesselModal,
    after = () => {}
}) {
    const {teas, getTea} = useTea()
    const {vessels, getVessel} = useVessels()

    // const [vesselSelect, setVesselSelect] = useState([getVessels()])
    // const [teaSelect, setTeaSelect] = useState([getTeas()])
    // function getVessels(){
    //     let vesselSelection = []
    //     vessels.forEach(vessel => {
    //         vesselSelection.push(
    //             <option value={vessel._id} key={vessel._id}>{vessel.name}</option>
    //         )
    //     })
    //     return vesselSelection
    // }
    // function getTeas(){
    //     let teaSelection = []
    //     teas.forEach(tea => {
    //         teaSelection.push(
    //             <option value={tea._id} key={tea._id}>{tea.name}</option>
    //         )
    //     })
    //     return teaSelection
    // }

    let teaSelect = []
    let vesselSelect = []
    if (teas){
        teas.forEach(tea => {
            teaSelect.push(
                <option value={tea._id} key={tea._id}>{tea.name}</option>
            )
        })
    }
    if (vessels){
        vessels.forEach(vessel => {
            vesselSelect.push(
                <option value={vessel._id} key={vessel._id}>{vessel.name}</option>
            )
        })
    }
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showSubmitAlert, setShowSubmitAlert] = useState(false);
    //TODO: After adding a new vessel or tea, the old latest tea or vessel is still selected, should select the added one
    const [form, setForm] = useState({
        date: currentSession.date,
        tea: currentSession.tea === ""? teas[0]._id: currentSession.tea,
        vessel: currentSession.vessel === ""? vessels[0]._id: currentSession.vessel,
        quantity: currentSession.quantity,
        rating: currentSession.rating,
        comments: currentSession.comments,
    })

    const [validated, setValidated] = useState(false);
    const handleChange = (event) => {
        console.log(event);
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        })
    }
    let buttonText = isEdit? "Edit Session" : "Add Session"
    function onSubmit(event) {
        event.preventDefault()
        if (event.currentTarget.checkValidity() === false){

            event.stopPropagation()
        }
        else {
            setValidated(true)
            try {
                submit(form, currentSession._id)
                setShowSubmitAlert(true)
                after()
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

    return (
        <Form noValidate validated={validated} onSubmit={onSubmit}>
            <Row className="mb-3">
                {/*Date*/}
                <Form.Group as={Col}>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type={"date"}
                        required
                        id={"date"}
                        onChange={handleChange}
                        isInvalid={form.date === undefined || form.date === ""}
                        defaultValue={form.date}
                    />
                </Form.Group>
                {/*Tea*/}
                <Form.Group as={Col}>
                    <Form.Label>Tea</Form.Label>
                    <Form.Select
                        required
                        id={"tea"}
                        onChange={handleChange}
                        defaultValue={form.tea}
                    >
                        {teaSelect}
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row className="align-items-end mb-3">
                {/*Vessel*/}
                <Form.Group as={Col}>
                    <Form.Label>Vessel</Form.Label>
                    <Form.Select
                        required
                        id={"vessel"}
                        onChange={handleChange}
                        defaultValue={form.vessel}
                    >
                        {vesselSelect}
                    </Form.Select>
                </Form.Group>
                {/*Buttons*/}
                <Col>
                    <Button variant="outline-primary" onClick={() => openAddVesselModal()} className="mx-1 my-1 my-sm-0">
                        New Vessel
                    </Button>
                    <Button variant="outline-primary" onClick={() => openAddTeaModal()} className="mx-1 my-1 my-sm-0">
                        New Tea
                    </Button>
                </Col>
            </Row>
            <Row className="mb-3">
                {/*Quantity*/}
                <Form.Group as={Col}>
                    <Form.Label>Amount Used</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            required
                            id={"quantity"}
                            onChange={handleChange}
                            isInvalid={form.quantity === 0 || isNaN(form.quantity)}
                            defaultValue={form.quantity === 0? undefined : form.quantity}
                        />
                        <InputGroup.Text>grams</InputGroup.Text>
                        <Form.Control.Feedback type="invalid">Quantity must be a number > 0.</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                {/*Rating*/}
                <Form.Group as={Col}>
                    <Form.Label>Rating 1-10</Form.Label>
                    <Form.Control
                        id={"rating"}
                        onChange={handleChange}
                        defaultValue={form.rating === 0? undefined: form.rating}
                        isInvalid={isNaN(form.rating) || form.rating > 10 || form.rating < 0 || (form.rating > 0 && form.rating < 1)}
                    />
                    <Form.Control.Feedback type="invalid">Rating must be a number 1-10.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                {/*Comments*/}
                <Form.Group>
                    <Form.Label>Comments</Form.Label>
                    <Form.Control
                        id={"comments"}
                        onChange={handleChange}
                        defaultValue={form.comments}
                    />
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