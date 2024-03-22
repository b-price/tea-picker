import { ListGroup, Button } from "react-bootstrap"
import TeaStat from './TeaStat.js'
import EditDeleteButtons from "./EditDeleteButtons.js"

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
                <TeaStat category={"Amount"} data={"3.5g"}/>
                
            </ListGroup>
            <EditDeleteButtons showButtons={buttons} label="Session" />
        </>
    )
}