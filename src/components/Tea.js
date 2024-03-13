import { ListGroup, Button, Modal } from 'react-bootstrap'
import TeaStat from './TeaStat'

export default function Tea(){
    return (
        <>
            <ListGroup horizontal={"lg"}>
                <TeaStat category={"Name"} data={"Honey Dan Cong"} />
                <TeaStat category={"Type"} data={"Oolong"} />
                <TeaStat category={"Vendor"} data={"Floating Leaves"} />
                <TeaStat category={"Price/g"} data={"0.50"} />
                <TeaStat category={"Amount"} data={"62"} />
                <TeaStat category={"Rating"} data={"9.5"} />
                <TeaStat category={"Year"} data={"2022"} />
                <TeaStat category={"Sessions"} data={"5"} />
                
            </ListGroup>
            <Button variant="outline-secondary" size="sm" className="m-2 me-auto">Edit Tea</Button>
            <Button variant="outline-danger" size="sm" className="m-2 me-auto">Delete Tea</Button>
        </>
    )
}
