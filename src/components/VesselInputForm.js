import { Form, Row, Col, InputGroup } from "react-bootstrap"

export default function VesselInputForm({
    name="Small Gaiwan",
    type="Gaiwan",
    capacity="100",
    vendor="Bitterleaf",
    illegal={
        green:false,
        white:false,
        oolong:false,
        yellow:false,
        black:false,
        sheng:false,
        shou:false,
        dark:false,
        tisane:false
    },
    isEdit=false
}) {

    return(
        <Form>
        <Row className="mb-3">
            <Form.Group as={Col} controlId="vesselVesselName">
                <Form.Label>Name</Form.Label>
                <Form.Control required placeholder={name} defaultValue={isEdit? name: null} />
            </Form.Group>
            <Form.Group as={Col} controlId="vesselVesselType">
                <Form.Label>Vessel Type</Form.Label>
                <Form.Select required defaultValue={type}>
                    <option>Gaiwan</option>
                    <option>Yixing</option>
                    <option>Kyusu</option>
                </Form.Select>
            </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group as={Col} controlId="vesselCapacity">
                <Form.Label>Capacity</Form.Label>
                <InputGroup>
                    <Form.Control placeholder={capacity} defaultValue={isEdit? capacity: null} />
                    <InputGroup.Text>mL</InputGroup.Text>
                </InputGroup>
                
            </Form.Group>
            <Form.Group as={Col} controlId="vesselVendor">
                <Form.Label>Vendor</Form.Label>
                <Form.Control placeholder={vendor} defaultValue={isEdit? vendor: null} />
            </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group controlId="vesselIllegal">
                <Form.Label>Disallowed Types</Form.Label>
                <Form.Check id="white" label="White" checked={isEdit? illegal.white: false} />
                <Form.Check id="green" label="Green" checked={isEdit? illegal.green: false} />
                <Form.Check id="oolong" label="Oolong" checked={isEdit? illegal.oolong: false} />
                <Form.Check id="black" label="Black" checked={isEdit? illegal.black: false} />
                <Form.Check id="yellow" label="Yellow" checked={isEdit? illegal.yellow: false} />
                <Form.Check id="sheng" label="Sheng Puer" checked={isEdit? illegal.sheng: false} />
                <Form.Check id="shou" label="Shou Puer" checked={isEdit? illegal.shou: false} />
                <Form.Check id="dark" label="Dark" checked={isEdit? illegal.dark: false} />
                <Form.Check id="tisane" label="Tisane" checked={isEdit? illegal.tisane: false} />
            </Form.Group>
        </Row>
    </Form>
    )
}