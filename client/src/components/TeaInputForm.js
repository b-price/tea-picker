import {Form, Row, Col, InputGroup, Button, Alert} from "react-bootstrap";
import {useState} from "react";

export default function TeaInputForm({
    currentTea={
        name: "",
        type: "",
        quantity: 0,
        vendor: "",
        cost: 0,
        year: 0,
        rating: 0,
        ratio: 0,
        tags: []
    },
    isEdit=false,
    submit,
    handleClose
}) {
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showSubmitAlert, setShowSubmitAlert] = useState(false);
    const [form, setForm] = useState({
        name: currentTea.name,
        type: currentTea.type,
        quantity: currentTea.quantity,
        vendor: currentTea.vendor,
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
                }, 2000)
            } catch (error) {
                console.error(error)
                setShowErrorAlert(true)
                setTimeout(() => {
                    setShowErrorAlert(false)
                    handleClose()
                }, 2000)
            }
        }
    }
    return (
        <Form noValidate validated={validated} onSubmit={onSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col}>
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
                <Form.Group as={Col}>
                    <Form.Label>Tea Type</Form.Label>
                    <Form.Select
                        required
                        id={"type"}
                        onChange={handleChange}
                        defaultValue={form.type}
                    >
                        <option>Sheng Puer</option>
                        <option>White</option>
                        <option>Oolong</option>
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row className="mb-3">
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
                <Form.Group as={Col}>
                    <Form.Label>Vendor</Form.Label>
                    <Form.Control
                        id={"vendor"}
                        onChange={handleChange}
                        defaultValue={isEdit? form.vendor: undefined}
                    />
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
                            defaultValue={isEdit? form.ratio: undefined}
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
    )
}