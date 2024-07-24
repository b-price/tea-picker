import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {useTea} from "./TeaContext.js";
import {useVessels} from "./VesselContext.js";

const userid = "666cccp"
const serverRoot = 'http://localhost:5050';
const SessionContext = React.createContext()

export function useSession() {
    return useContext(SessionContext)
}

export const SessionProvider = ({ children }) => {
    const [sortQuery, setSortQuery] = useState("date")
    const [change, setChange] = useState(false)
    const [pickedSession, setPickedSession] = useState([])
    const {getTea, pickTea} = useTea()
    const {vessels, getVessel} = useVessels()

    useEffect(() => {
        axios.get(`${serverRoot}/sessions/?user=${userid}`)
            .then((response) => {
                setSessions(sortSessions(response.data))
                setChange(false)
            }).catch(error => {
            if (error.response) {
                console.log("Error with response: " + error.response)
            } else if (error.request) {
                console.log("Error with request: ")
                console.log(error.request)
            } else {
                console.log("Non-axios error")
            }
        })
        function sortSessions(rawSessions){
            switch (sortQuery){
                case "date":
                    rawSessions.sort((a, b) => a.date - b.date)
                    break
                case "tea":
                    rawSessions.sort((a, b) => getTea(a.tea).name.localeCompare(getTea(b.tea).name))
                    break
                case "vendor":
                    rawSessions.sort((a, b) => getTea(a.tea).vendor.localeCompare(getTea(b.tea).vendor))
                    break
                case "type":
                    rawSessions.sort((a, b) => getTea(a.tea).type.localeCompare(getTea(b.tea).type))
                    break
                case "vessel":
                    rawSessions.sort((a, b) => getVessel(a.vessel).name.localeCompare(getVessel(b.vessel).name))
                    break
                case "quantity":
                    rawSessions.sort((a, b) => b.quantity - a.quantity)
                    break
                case "rating":
                    rawSessions.sort((a, b) => b.rating - a.rating)
                    break
                default:
                    rawSessions.reverse()
                    break
            }
            return rawSessions
        }
    }, [change])

    const [sessions, setSessions] = useState([
        {
            date:"2000-01-01",
            tea:"",
            quantity:0,
            vessel:"",
            rating:0,
            comments:"",
        }
    ])

    function getSession(id){
        return sessions.find(session => session._id == id)
    }

    function addSession(session) {
        axios.post(`${serverRoot}/sessions/`, {
            user_id: userid,
            date: session.date,
            tea: session.tea,
            vessel: session.vessel,
            quantity: +session.quantity,
            rating: +session.rating,
            comments: session.comments,
        }).then(response => {
            console.log(response)
            setChange(true)
        }).catch(error => {
            console.log(error)
        })

    }

    function editSession(attributes, id){
        axios.patch(`${serverRoot}/sessions/${id}`, {
            user_id: userid,
            date: attributes.date,
            tea: attributes.tea,
            vessel: attributes.vessel,
            quantity: +attributes.quantity,
            rating: +attributes.rating,
            comments: attributes.comments,
        }).then(response => {
            console.log(response)
            setChange(true)
        }).catch(error => {
            console.log(error)
        })
    }

    function deleteSession(id) {
        axios.delete(`${serverRoot}/sessions/${id}`)
            .then(response => {
                console.log(response)
                setChange(true)
            }).catch(error => {
            console.log(error)
        })
    }

    function sortSessions(attribute){
        setSortQuery(attribute)
        setChange(true)
    }

    function getPickedSession(){
        let randomVessel = Math.floor(Math.random() * vessels.length)
        let pickedTea = pickTea()
        let pickedVessel = vessels[randomVessel]
        let amount = pickedVessel.capacity * 0.01 * pickedTea.ratio
        return {
            date: new Date().toJSON().slice(0, 10),
            tea: pickedTea._id,
            quantity: Math.round(amount * 100) / 100,
            vessel: pickedVessel._id,
            rating: 0,
            comments: "",
        }
    }

    return (
        <SessionContext.Provider value={{
            sessions,
            getSession,
            addSession,
            editSession,
            deleteSession,
            sortSessions,
            getPickedSession
        }}>{children}</SessionContext.Provider>
    )
}

