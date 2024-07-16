import { Form, Row, Col, InputGroup } from "react-bootstrap";



export default function TeaInputForm({
    name="Xiaguan FT #4",
    type="Sheng Puer",
    quantity="357",
    vendor="Yunnan Sourcing",
    cost="0.5",
    year="2007",
    rating="9",
    ratio="4.5",
    tags=["Earthy", "Mineral", "Smoky"],
    isEdit=false
}) {
    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="teaTeaName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required placeholder={name} defaultValue={isEdit? name: null} />
                </Form.Group>
                <Form.Group as={Col} controlId="teaTeaType">
                    <Form.Label>Tea Type</Form.Label>
                    <Form.Select required defaultValue={type}>
                        <option>Sheng Puer</option>
                        <option>White</option>
                        <option>Oolong</option>
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="teaQuantity">
                    <Form.Label>Quantity</Form.Label>
                    <InputGroup>
                        <Form.Control required placeholder={quantity} defaultValue={isEdit? quantity: null} />
                        <InputGroup.Text>grams</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} controlId="teaVendor">
                    <Form.Label>Vendor</Form.Label>
                    <Form.Control placeholder={vendor} defaultValue={isEdit? vendor: null} />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId={"teaCost"}>
                    <Form.Label>Cost Per Gram</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control placeholder={cost} defaultValue={isEdit? cost: null} />
                        <InputGroup.Text>/ gram</InputGroup.Text>
                    </InputGroup>
                    
                </Form.Group>
                <Form.Group as={Col} controlId="teaYear">
                    <Form.Label>Year</Form.Label>
                    <Form.Control placeholder={year} defaultValue={isEdit? year: null} />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="teaRating">
                    <Form.Label>Rating 1-10</Form.Label>
                    <Form.Control placeholder={rating} defaultValue={isEdit? rating: null} />
                </Form.Group>
                <Form.Group as={Col} controlId="teaRatio">
                    <Form.Label>Tea to Water Ratio</Form.Label>
                    <InputGroup>
                        <Form.Control placeholder={ratio} defaultValue={isEdit? ratio: null} />
                        <InputGroup.Text>g/mL</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="teaTags">
                    <Form.Label>Tags</Form.Label>
                    <Form.Control placeholder={tags.join(", ")} defaultValue={isEdit? tags.join(", "): null} />
                </Form.Group>
            </Row>
        </Form>
    )
}