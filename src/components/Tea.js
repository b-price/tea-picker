import { ListGroup, Button, Modal } from 'react-bootstrap'
import TeaStat from './TeaStat.js'
import { useState } from 'react'
import DeleteConfirm from './DeleteConfirm.js'
import EditDeleteButtons from './EditDeleteButtons.js'

export default function Tea({buttons = true}){
    
    return (
        <>
            <ListGroup horizontal={"xl"}>
                <TeaStat category={"Name"} data={"Honey Dan Cong"} />
                <TeaStat category={"Type"} data={"Oolong"} />
                <TeaStat category={"Vendor"} data={"Floating Leaves"} />
                <TeaStat category={"Price/g"} data={"0.50"} />
                <TeaStat category={"Amount"} data={"62"} />
                <TeaStat category={"Rating"} data={"9.5"} />
                <TeaStat category={"Year"} data={"2022"} />
                <TeaStat category={"Sessions"} data={"5"} />
                <TeaStat category={"Tea:Water"} data={"4.5g/mL"} />
                
            </ListGroup>
            
            <EditDeleteButtons showButtons={buttons} label="Tea" />
        </>
    )
}
