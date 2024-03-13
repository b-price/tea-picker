import { ListGroup, Button } from "react-bootstrap"
import TeaStat from './TeaStat'

export default function Vessel(){
    return (
        <>
            <ListGroup horizontal={"lg"}>
                <TeaStat category={"Name"} data={"Small Gaiwan"}/>
                <TeaStat category={"Capacity"} data={"80 mL"}/>
                <TeaStat category={"Type"} data={"Gaiwan"}/>
                <TeaStat category={"Vendor"} data={"Floating Leaves"}/>
                
            </ListGroup>
            <Button variant="outline-secondary" size="sm" className="m-2 me-auto">Edit Vessel</Button>
            <Button variant="outline-danger" size="sm" className="m-2 me-auto">Delete Vessel</Button>
        </>
    )
}