import { ListGroup, Button, Modal } from 'react-bootstrap'
import TeaStat from './TeaStat.js'
import { useState } from 'react'
import DeleteConfirm from './DeleteConfirm.js'
import EditDeleteButtons from './EditDeleteButtons.js'

export default function Tea(props){

    return (
        <>
            <ListGroup horizontal={"xl"}>
                <TeaStat category={"Name"} data={props.name} />
                <TeaStat category={"Type"} data={props.type} />
                <TeaStat category={"Vendor"} data={props.vendor} />
                <TeaStat category={"Price/g"} data={`$${props.cost}/g`} />
                <TeaStat category={"Amount"} data={props.quantity +"g"} />
                <TeaStat category={"Rating"} data={props.rating + "/10"} />
                <TeaStat category={"Year"} data={props.year} />
                {/*<TeaStat category={"Sessions"} data={"5"} />*/}
                <TeaStat category={"Tea:Water"} data={props.ratio + "g/100mL"} />
                
            </ListGroup>
            
            <EditDeleteButtons
                showButtons={props.buttons}
                label="Tea"
                id={props.id}
                deleteFunction={props.deleteTea}
                editFunction={props.editTea}
                type={"tea"}
            />
        </>
    )
}
