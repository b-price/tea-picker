import axios from "axios";
import React, {useContext, useEffect, useState} from "react";

const userid = "666cccp"
const serverRoot = 'http://localhost:5050';
const TeaContext = React.createContext()
const QUANTITY_RATING_COEFF = 17
const COST_COEFF = 75

export function useTea() {
    return useContext(TeaContext)
}

export const TeaProvider = ({ children }) => {
    const [teas, setTeas] = useState([])
    const [teaTypes, setTeaTypes] = useState([])
    const [vendors, setVendors] = useState([])
    const [sortQuery, setSortQuery] = useState("date")
    const [change, setChange] = useState(false)

    useEffect(() => {
        axios.get(`${serverRoot}/teas/?user=${userid}`)
            .then((response) => {
                setTeas(sortTeas(response.data))
                setChange(false)
                setTeaTypes([...new Set(teas.map(tea => tea.type))])
                setVendors([...new Set(teas.map(tea => tea.vendor))])
                console.log("refresh")

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
    }, [change])

    function getTea(id){
        return teas.find(tea => tea._id == id)
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
            setChange(true)
            // setTeas(prevTeas => [...prevTeas, tea])
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
            setChange(true)
            // setTeas(teas.map(tea => {
            //     if (tea._id == id){
            //         return attributes
            //     } else {
            //         return tea
            //     }
            // }))
        }).catch(error => {
            console.log(error)
        })
    }

    function deleteTea(id) {
        axios.delete(`${serverRoot}/teas/${id}`)
            .then(response => {
                console.log(response)
                setChange(true)
                // setTeas(teas.filter(tea => tea._id != id))
            }).catch(error => {
            console.log(error)
        })
    }

    function pickTea(){
        const cumulativeWeights = []
        for (let i = 0; i < teas.length; i++){
            cumulativeWeights[i] = getPickWeight(teas[i].quantity, teas[i].rating, teas[i].cost) + (cumulativeWeights[i - 1] || 0)
        }
        const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1]
        const randomNumber = maxCumulativeWeight * Math.random()
        for (let itemIndex = 0; itemIndex < teas.length; itemIndex += 1) {
            if (cumulativeWeights[itemIndex] >= randomNumber) {
              return {
                tea: teas[itemIndex],
                index: itemIndex,
              }
            }
        }
    }

    function getPickWeight(quantity, rating, cost){
        return Math.sqrt((QUANTITY_RATING_COEFF * quantity * rating)/(Math.pow(cost, 2) * COST_COEFF))
    }

    function sortTea(attribute){
        setSortQuery(attribute)
    }

    return (
        <TeaContext.Provider value={{
            teas,
            teaTypes,
            vendors,
            getTea,
            addTea,
            editTea,
            deleteTea,
            pickTea,
            sortTea
        }}>{children}</TeaContext.Provider>
    )
}

