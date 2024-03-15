import { ListGroup, Button } from "react-bootstrap"
import TeaStat from './TeaStat'

export default function Session({buttons = true}){
    return (
        <>
            <ListGroup horizontal={"lg"}>
                <TeaStat category={"Date"} data={"1/1/12"}/>
                <TeaStat category={"Tea"} data={"Honey Dan Cong"}/>
                <TeaStat category={"Type"} data={"Oolong"}/>
                <TeaStat category={"Vendor"} data={"Floating Leaves"}/>
                <TeaStat category={"Vessel"} data={"Small Gaiwan"}/>
                <TeaStat category={"Rating"} data={"9.5"}/>
                
            </ListGroup>
            <Buttons showButtons={buttons} />
        </>
    )
}

function Buttons({showButtons}){
    if (showButtons){
        return (
            <>
                <Button variant="outline-secondary" size="sm" className="m-2 me-auto">Edit Tea</Button>
                <Button variant="outline-danger" size="sm" className="m-2 me-auto">Delete Tea</Button>
            </>
        )
    }

}