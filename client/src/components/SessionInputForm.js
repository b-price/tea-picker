import { Form, Row, Col, InputGroup, Button } from "react-bootstrap"

export default function SessionInputForm({
    date="1/15/2024",
    tea="Honey Dan Cong",
    amount="3.5",
    vessel="Small Gaiwan",
    rating="9",
    comments="Less brew time...",
    isEdit=false,
    openAddTeaModal,
    openAddVesselModal
}) {
    return (
        <Form>
        <Row className="mb-3">
            <Form.Group as={Col} controlId="sessionDate">
                <Form.Label>Date</Form.Label>
                <Form.Control required placeholder={date} defaultValue={isEdit? date: null} >
                </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="sessionTea">
                <Form.Label>Tea</Form.Label>
                <Form.Select required defaultValue={tea}>
                    <option>Xiaguan FT #4</option>
                    <option>Honey Dan Cong</option>
                    <option>Long Jing</option>
                </Form.Select>
            </Form.Group>
        </Row>
        <Row className="align-items-end mb-3">
            <Form.Group as={Col} controlId="sessionVessel">
                <Form.Label>Vessel</Form.Label>
                <Form.Select required defaultValue={vessel}>
                    <option>Small Gaiwan</option>
                    <option>Kyusu</option>
                    <option>Large Gaiwan</option>
                </Form.Select>
            </Form.Group>
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
            <Form.Group as={Col} controlId="sessionQuantity">
                <Form.Label>Amount Used</Form.Label>
                <InputGroup>
                    <Form.Control required placeholder={amount} defaultValue={isEdit? amount: null} />
                    <InputGroup.Text>grams</InputGroup.Text>
                </InputGroup>
            </Form.Group>
            <Form.Group as={Col} controlId="sessionRating">
                <Form.Label>Rating 1-10</Form.Label>
                <Form.Control placeholder={rating} defaultValue={isEdit? rating: null} />
            </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group controlId="sessionComments">
                <Form.Label>Comments</Form.Label>
                <Form.Control placeholder={comments} defaultValue={isEdit? comments: null} />
            </Form.Group>
        </Row>
    </Form>
    )
}