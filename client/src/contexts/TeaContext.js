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

    const [teaTypes, setTeaTypes] = useState([])
    const [vendors, setVendors] = useState([])
    const [years, setYears] = useState([])
    const [sortQuery, setSortQuery] = useState("date")
    const [change, setChange] = useState(false)
    const [teaLoading, setTeaLoading] = useState(true)
    const [avRating, setAvRating] = useState(7)

    useEffect(() => {
        axios.get(`${serverRoot}/teas/?user=${userid}`)
            .then((response) => {
                setTeas(sortTeas(response.data))
                setTeaTypes([...new Set(response.data.map(tea => tea.type))])
                setVendors([...new Set(response.data.map(tea => tea.vendor))])
                setYears([...new Set(response.data.map(tea => tea.year).filter(tea => tea.year !== 0))])
                setAvRating(getAverageRating())
                setChange(false)
                setTeaLoading(false)
                console.log("refresh")

            })
            .catch(error => {
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

    const [teas, setTeas] = useState([{
        name: "",
        type: "",
        quantity: 0,
        vendor: "",
        cost: 0,
        year: 0,
        rating: 0,
        ratio: 4.5,
        tags: []
    }])


    function getAverageRating(){
        let ratedTeas = teas.filter(tea => tea.rating > 0)
            .map(tea => +tea.rating)
        let total = ratedTeas.reduce((a, b) => a + b, 0)
        // console.log("ratings: "+ratedTeas)
        // console.log("total: "+total)
        // console.log("length: "+ratedTeas.length)
        // console.log(total/ratedTeas.length)
        return total/ratedTeas.length
    }

    function getTea(id){
        let notFound = {
            name: "",
            type: "",
            quantity: 0,
            vendor: "",
            cost: 0,
            year: 0,
            rating: 0,
            ratio: 4.5,
            tags: []
        }
        let result = teas.find(tea => tea._id == id)
        if (result !== undefined) return result
        else return notFound
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

    function pickTea(mood){
        const cumulativeWeights = []
        if (mood) {
            //console.log("year:", mood.year)
        }

        for (let i = 0; i < teas.length; i++){
            //if (mood.year === teas[i].year) console.log(teas[i].year)
            let skip
            if (
                mood && (
                    (mood.type && mood.type !== teas[i].type) ||
                    (mood.year != 0 && mood.year != teas[i].year) ||
                    (mood.minRating !== 0 && mood.minRating > teas[i].rating) ||
                    (mood.maxCost && mood.maxCost <= teas[i].cost) ||
                    (mood.keywords.length !== 0 && !keywordsInTea(mood.keywords, teas[i]._id))
                )
            ){
                skip = 0
            } else {
                skip = 1
            }
            cumulativeWeights[i] = skip * (getPickWeight(teas[i].quantity, teas[i].rating, teas[i].cost) + (cumulativeWeights[i - 1] || 0))
            //console.log(teas[i].name + ": " + teas[i].type + ": w: " + cumulativeWeights[i] + " s:" + skip)
        }
        const maxCumulativeWeight = Math.max(...cumulativeWeights)
        console.log("max cum: "+maxCumulativeWeight)
        if (maxCumulativeWeight === 0)
            return "tea not found"
        const randomNumber = maxCumulativeWeight * Math.random()
        console.log("randomNumber:", randomNumber)
        for (let itemIndex = 0; itemIndex < teas.length; itemIndex += 1) {
            if (cumulativeWeights[itemIndex] >= randomNumber) {
                console.log("tea pick: " + teas[itemIndex].name)
                return teas[itemIndex]
            }
        }
    }

    function getPickWeight(quantity, rating, cost){
        let adjRating = rating === 0? getAverageRating(): rating
        let denom = cost === 0? 1: (Math.pow(cost, 2) * COST_COEFF)
        return Math.sqrt((QUANTITY_RATING_COEFF * quantity * adjRating)/denom)
    }

    function sortTea(attribute){
        setSortQuery(attribute)
        setChange(true)
    }

    function keywordsInTea(keywords, id){
        const tea = getTea(id)
        //console.log(tea.tags)
        return tea.name.toLowerCase().split(" ").some(word => keywords.includes(word)) ||
            tea.type.toLowerCase().split(" ").some(word => keywords.includes(word)) ||
            tea.vendor.toLowerCase().split(" ").some(word => keywords.includes(word)) ||
            keywords.includes(tea.cost.toString()) ||
            keywords.includes(tea.ratio.toString()) ||
            tea.tags.some(tag => keywords.includes(tag.toLowerCase()))
    }

    function getMaxCost(){
        let costs = [...new Set(teas.map(tea => tea.cost))]
        return Math.max(...costs)
    }

    return (
        <TeaContext.Provider value={{
            teas,
            teaTypes,
            vendors,
            years,
            teaLoading,
            getTea,
            addTea,
            editTea,
            deleteTea,
            pickTea,
            sortTea,
            keywordsInTea,
            getMaxCost
        }}>{children}</TeaContext.Provider>
    )
}

