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
    preferred={
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
    favorite=false,
    exclude=false,
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
            <Form.Group as={Col} controlId="vesselFavorite">
                <Form.Check id="favorite" label="Favorite Vessel" checked={isEdit? favorite: undefined} />
            </Form.Group>
            <Form.Group as={Col} controlId="vesselExclude">
                <Form.Check id="exclude" label="Exclude Vessel" checked={isEdit? exclude: undefined} />
            </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group as={Col} controlId="vesselIllegal">
                <Form.Label>Disallowed Types</Form.Label>
                <Form.Check id="white" label="White" checked={isEdit? illegal.white: undefined} />
                <Form.Check id="green" label="Green" checked={isEdit? illegal.green: undefined} />
                <Form.Check id="oolong" label="Oolong" checked={isEdit? illegal.oolong: undefined} />
                <Form.Check id="black" label="Black" checked={isEdit? illegal.black: undefined} />
                <Form.Check id="yellow" label="Yellow" checked={isEdit? illegal.yellow: undefined} />
                <Form.Check id="sheng" label="Sheng Puer" checked={isEdit? illegal.sheng: undefined} />
                <Form.Check id="shou" label="Shou Puer" checked={isEdit? illegal.shou: undefined} />
                <Form.Check id="dark" label="Dark" checked={isEdit? illegal.dark: undefined} />
                <Form.Check id="tisane" label="Tisane" checked={isEdit? illegal.tisane: undefined} />
            </Form.Group>
            <Form.Group as={Col} controlId="vesselPreferred">
                <Form.Label>Preferred Types</Form.Label>
                <Form.Check id="white" label="White" checked={isEdit? preferred.white: undefined} />
                <Form.Check id="green" label="Green" checked={isEdit? preferred.green: undefined} />
                <Form.Check id="oolong" label="Oolong" checked={isEdit? preferred.oolong: undefined} />
                <Form.Check id="black" label="Black" checked={isEdit? preferred.black: undefined} />
                <Form.Check id="yellow" label="Yellow" checked={isEdit? preferred.yellow: undefined} />
                <Form.Check id="sheng" label="Sheng Puer" checked={isEdit? preferred.sheng: undefined} />
                <Form.Check id="shou" label="Shou Puer" checked={isEdit? preferred.shou: undefined} />
                <Form.Check id="dark" label="Dark" checked={isEdit? preferred.dark: undefined} />
                <Form.Check id="tisane" label="Tisane" checked={isEdit? preferred.tisane: undefined} />
            </Form.Group>
        </Row>
    </Form>
    )
}