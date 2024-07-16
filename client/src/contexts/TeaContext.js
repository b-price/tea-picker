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
    useEffect(() => {
        axios.get(`${serverRoot}/teas/?user=${userid}`)
            .then((response) => {
                setTeas(response.data)
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
    }, [])

    function getTea(id){
        return teas.find(tea => tea._id === id)
    }

    function addTea(tea) {
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
            tags: tea.tags.split(","),
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    function editTea(attributes, id){
        axios.patch(`${serverRoot}/teas/${id}`, {
            name: attributes.name,
            type: attributes.type,
            quantity: +attributes.quantity,
            vendor: attributes.vendor,
            cost: +attributes.cost,
            year: +attributes.year,
            rating: +attributes.rating,
            ratio: +attributes.ratio,
            tags: attributes.tags.split(","),
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    function deleteTea(id) {
        console.log(id)
        axios.delete(`${serverRoot}/teas/${id}`)
            .then(response => {
                console.log(response)
            }).catch(error => {
            console.log(error)
        })
    }

    function pickTea(){
        const cumulativeWeights = []
        for (var i = 0; i < teas.length; i++){
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

    return (
        <TeaContext.Provider value={{
            teas,
            getTea,
            addTea,
            editTea,
            deleteTea,
            pickTea
        }}>{children}</TeaContext.Provider>
    )
}

