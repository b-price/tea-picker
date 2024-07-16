import {Form, Row, Col, InputGroup, Button, Alert} from "react-bootstrap";
import {useState} from "react";

export default function TeaInputForm({
    currentTea={
        name: "Xiaguan FT #4",
        type: "Sheng Puer",
        quantity: "357",
        vendor: "Yunnan Sourcing",
        cost: "0.5",
        year: "2007",
        rating: "9",
        ratio: "4.5",
        tags: ["Earthy", "Mineral", "Smoky"]
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
    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        })
    }
    let buttonText = isEdit? "Edit Tea" : "Add Tea"
    function onSubmit(event) {
        event.preventDefault()
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
    return (
        <Form onSubmit={onSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        id="name"
                        onChange={handleChange}
                        placeholder={form.name}
                        value={isEdit? form.name: null}
                    />
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
                    <InputGroup>
                        <Form.Control
                            required
                            id={"quantity"}
                            onChange={handleChange}
                            placeholder={form.quantity}
                            defaultValue={isEdit? form.quantity: null}
                        />
                        <InputGroup.Text>grams</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Vendor</Form.Label>
                    <Form.Control
                        id={"vendor"}
                        onChange={handleChange}
                        placeholder={form.vendor}
                        defaultValue={isEdit? form.vendor: null}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Cost Per Gram</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                            id={"cost"}
                            onChange={handleChange}
                            placeholder={form.cost}
                            defaultValue={isEdit? form.cost: null}
                        />
                        <InputGroup.Text>/ gram</InputGroup.Text>
                    </InputGroup>
                    
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                        id={"year"}
                        placeholder={form.year}
                        defaultValue={isEdit? form.year: null}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} >
                    <Form.Label>Rating 1-10</Form.Label>
                    <Form.Control
                        id={"rating"}
                        onChange={handleChange}
                        placeholder={form.rating}
                        defaultValue={isEdit? form.rating: null}
                    />
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label>Tea to Water Ratio</Form.Label>
                    <InputGroup>
                        <Form.Control
                            id={"ratio"}
                            onChange={handleChange}
                            placeholder={form.ratio}
                            defaultValue={isEdit? form.ratio: null}
                        />
                        <InputGroup.Text>g/mL</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} >
                    <Form.Label>Tags</Form.Label>
                    <Form.Control
                        id={"tags"}
                        onChange={handleChange}
                        placeholder={form.tags.isArray ? form.tags.join(", ") : form.tags}
                        defaultValue={!isEdit? null: form.tags.isArray ? form.tags.join(", ") : form.tags}
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