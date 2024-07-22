import {Form, Row, Col, InputGroup, Button, Alert} from "react-bootstrap";
import {useState} from "react";
import {useTea} from "../contexts/TeaContext.js";

export default function TeaInputForm({
    currentTea={
        name: "",
        type: "",
        quantity: 0,
        vendor: "",
        cost: 0,
        year: 0,
        rating: 0,
        ratio: 4.5,
        tags: []
    },
    isEdit=false,
    submit,
    handleClose
}) {
    const {teaTypes, vendors} = useTea()
    let teaSelect = []
    let vendorSelect = []
    if (teaTypes){
        teaTypes.forEach((type, index) => {
            teaSelect.push(
                <option value={type}>{type}</option>
            )
        })
    }
    if (vendors){
        vendors.forEach((vendor, index) => {
            vendorSelect.push(
                <option value={vendor}>{vendor}</option>
            )
        })
    }
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showSubmitAlert, setShowSubmitAlert] = useState(false);
    const [newType, setNewType] = useState(false);
    const [newVendor, setNewVendor] = useState(false);
    const [form, setForm] = useState({
        name: currentTea.name,
        type: !isEdit? teaTypes[0] : currentTea.type,
        quantity: currentTea.quantity,
        vendor: !isEdit? vendors[0] : currentTea.vendor,
        cost: currentTea.cost,
        year: currentTea.year,
        rating: currentTea.rating,
        ratio: currentTea.ratio,
        tags: currentTea.tags
    })
    const [validated, setValidated] = useState(false);
    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        })
    }
    const handleNewType = () => {
        console.log(teaTypes[0])
        setNewType(!newType)
    }
    const handleNewVendor = () => {
        setNewVendor(!newVendor)
    }
    let buttonText = isEdit? "Edit Tea" : "Add Tea"
    function onSubmit(event) {
        event.preventDefault()
        if (event.currentTarget.checkValidity() === false){
            event.stopPropagation()
        }
        else {
            setValidated(true)
            try {
                submit(form, currentTea._id)
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

    return (
        <>
            <Form noValidate validated={validated} onSubmit={onSubmit}>
                <Row className="mb-3">
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            id="name"
                            onChange={handleChange}
                            value={isEdit? form.name: undefined}
                            isInvalid={form.name === undefined || form.name === ""}
                        />
                        <Form.Control.Feedback type="invalid">Name is required.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Tea Type</Form.Label>
                        {newType ? (
                            <>
                                <Form.Control
                                    id={"type"}
                                    onChange={handleChange}
                                    defaultValue={form.type}
                                    isInvalid={form.type === undefined || form.name === ""}
                                />
                                <Form.Control.Feedback type="invalid">Type is required.</Form.Control.Feedback>
                            </>
                        ) : (
                            <Form.Select
                                required
                                id={"type"}
                                onChange={handleChange}
                                defaultValue={isEdit? form.type : undefined}
                            >
                                {teaSelect}
                            </Form.Select>
                        )}
                    </Form.Group>
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
                <Row className="align-items-end mb-3">
                    <Col>
                        <Button variant="outline-primary" onClick={() => handleNewType()} className="mx-1 my-1 my-sm-0" size={"sm"}>
                            New Type
                        </Button>
                        <Button variant="outline-primary" onClick={() => handleNewVendor()} className="mx-1 my-1 my-sm-0" size={"sm"}>
                            New Vendor
                        </Button>
                    </Col>
                    <Form.Group as={Col}>
                        <Form.Label>Quantity</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                id={"quantity"}
                                onChange={handleChange}
                                defaultValue={isEdit? form.quantity: undefined}
                                isInvalid={form.quantity === 0 || isNaN(form.quantity)}
                            />
                            <InputGroup.Text>grams</InputGroup.Text>
                            <Form.Control.Feedback type="invalid">Quantity must be a number > 0.</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Cost Per Gram</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                                id={"cost"}
                                onChange={handleChange}
                                defaultValue={isEdit? form.cost: undefined}
                                isInvalid={isNaN(form.cost)}
                            />
                            <InputGroup.Text>/ gram</InputGroup.Text>
                            <Form.Control.Feedback type="invalid">Cost must be a number.</Form.Control.Feedback>
                        </InputGroup>

                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                            id={"year"}
                            onChange={handleChange}
                            defaultValue={isEdit? form.year: undefined}
                            isInvalid={isNaN(form.year)}
                        />
                        <Form.Control.Feedback type="invalid">Year must be a number.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} >
                        <Form.Label>Rating 1-10</Form.Label>
                        <Form.Control
                            id={"rating"}
                            onChange={handleChange}
                            defaultValue={isEdit? form.rating: undefined}
                            isInvalid={isNaN(form.rating) || form.rating > 10 || form.rating < 0 || (form.rating > 0 && form.rating < 1)}
                        />
                        <Form.Control.Feedback type="invalid">Rating must be a number 1-10.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} >
                        <Form.Label>Tea to Water Ratio</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                id={"ratio"}
                                onChange={handleChange}
                                defaultValue={form.ratio}
                                isInvalid={isNaN(form.ratio)}
                            />
                            <InputGroup.Text>g/mL</InputGroup.Text>
                            <Form.Control.Feedback type="invalid">Ratio must be a number.</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} >
                        <Form.Label>Tags</Form.Label>
                        <Form.Control
                            id={"tags"}
                            onChange={handleChange}
                            defaultValue={!isEdit? "": form.tags.isArray ? form.tags.join(", ") : form.tags}
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

        </>
    )
}