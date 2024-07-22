import axios from "axios";
import React, {useContext, useEffect, useState} from "react";

const userid = "666cccp"
const serverRoot = 'http://localhost:5050';
const SessionContext = React.createContext()

export function useSession() {
    return useContext(SessionContext)
}

export const SessionProvider = ({ children }) => {
    const [sessions, setSessions] = useState([])
    const [teaTypes, setTeaTypes] = useState([])
    const [vendors, setVendors] = useState([])
    const [sortQuery, setSortQuery] = useState("date")

    useEffect(() => {
        axios.get(`${serverRoot}/teas/?user=${userid}`)
            .then((response) => {
                setSessions(sortTeas(response.data))
                setTeaTypes([...new Set(sessions.map(tea => tea.type))])
                setVendors([...new Set(sessions.map(tea => tea.vendor))])
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
        function sortTeas(rawTeas){
            switch (sortQuery){
                case "name":
                    rawTeas.sort((a, b) => a.name.localeCompare(b.name))
                    break
                case "type":
                    rawTeas.sort((a, b) => a.type.localeCompare(b.type))
                    break
                case "quantity":
                    rawTeas.sort((a, b) => a.quantity - b.quantity)
                    break
                case "vendor":
                    rawTeas.sort((a, b) => a.vendor.localeCompare(b.vendor))
                    break
                case "cost":
                    rawTeas.sort((a, b) => a.cost - b.cost)
                    break
                case "year":
                    rawTeas.sort((a, b) => a.year - b.year)
                    break
                case "rating":
                    rawTeas.sort((a, b) => b.rating - a.rating)
                    break
                case "ratio":
                    rawTeas.sort((a, b) => a.ratio - b.ratio)
                    break
                default:
                    rawTeas.reverse()
                    break
            }
            return rawTeas
        }
    }, [sortQuery, sessions])

    function getTea(id){
        return sessions.find(tea => tea._id === id)
    }

    function addTea(tea) {
        if (typeof tea.tags === "string"){
            tea.tags = tea.tags.split(",")
        }
        axios.post(`${serverRoot}/teas/`, {
            user_id: userid,
            name: tea.name,
            type: tea.type,
            quantity: +tea.quantity,
            vendor: tea.vendor,
            cost: +tea.cost,
            year: +tea.year,
            rating: +tea.rating,
            ratio: +tea.ratio,
            tags: tea.tags,
        }).then(response => {
            console.log(response)
            //setTeas(prevTeas => [...prevTeas, tea])
        }).catch(error => {
            console.log(error)
        })

    }

    function editTea(attributes, id){
        if (typeof attributes.tags === "string"){
            attributes.tags = attributes.tags.split(",")
        }
        axios.patch(`${serverRoot}/teas/${id}`, {
            name: attributes.name,
            type: attributes.type,
            quantity: +attributes.quantity,
            vendor: attributes.vendor,
            cost: +attributes.cost,
            year: +attributes.year,
            rating: +attributes.rating,
            ratio: +attributes.ratio,
            tags: attributes.tags,
        }).then(response => {
            console.log(response)
            setSessions(sessions.map(tea => {
                if (tea._id === id){
                    return attributes
                } else {
                    return tea
                }
            }))
        }).catch(error => {
            console.log(error)
        })
    }

    function deleteTea(id) {
        axios.delete(`${serverRoot}/teas/${id}`)
            .then(response => {
                console.log(response)
                //setTeas(teas.filter(tea => tea._id !== id))
            }).catch(error => {
            console.log(error)
        })
    }

    function sortTea(attribute){
        setSortQuery(attribute)
    }

    return (
        <SessionContext.Provider value={{
            teas: sessions,
            teaTypes,
            vendors,
            getTea,
            addTea,
            editTea,
            deleteTea,
            sortTea
        }}>{children}</SessionContext.Provider>
    )
}

