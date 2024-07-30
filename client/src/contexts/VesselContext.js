import axios from "axios";
import React, {useContext, useEffect, useState} from "react";

const userid = "666cccp"
const serverRoot = 'http://localhost:5050';
const VesselContext = React.createContext()

export function useVessels() {
    return useContext(VesselContext)
}

export const VesselProvider = ({ children }) => {

    const [teaTypes, setTeaTypes] = useState([])
    const [vendors, setVendors] = useState([])
    const [vesselTypes, setVesselTypes] = useState([])
    const [change, setChange] = useState(false)
    const [sortQuery, setSortQuery] = useState("date")
    const [vesselLoading, setVesselLoading] = useState(true)

    useEffect(() => {
        axios.get(`${serverRoot}/vessels/?user=${userid}`)
            .then((response) => {
                setVessels(sortVessels(response.data))
                setVesselTypes([...new Set(response.data.map(vessel => vessel.type))])
                setVendors([...new Set(response.data.map(vessel => vessel.vendor))])
                setChange(false)
                setVesselLoading(false)
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
        function sortVessels(rawVessels){
            switch (sortQuery){
                case "name":
                    rawVessels.sort((a, b) => a.name.localeCompare(b.name))
                    break
                case "type":
                    rawVessels.sort((a, b) => a.type.localeCompare(b.type))
                    break
                case "capacity":
                    rawVessels.sort((a, b) => a.capacity - b.capacity)
                    break
                case "vendor":
                    rawVessels.sort((a, b) => a.vendor.localeCompare(b.vendor))
                    break
                case "favorite":
                    rawVessels.sort((a, b) => a.favorite - b.favorite)
                    break
                case "exclude":
                    rawVessels.sort((a, b) => a.exclude - b.exclude)
                    break
                default:
                    rawVessels.reverse()
                    break
            }
            return rawVessels
        }
    }, [change])

    const [vessels, setVessels] = useState([
        {
            name:"",
            type:"",
            capacity:0,
            vendor:"",
            disallowed:[],
            preferred:[],
            favorite:false,
            exclude:false
        }
    ])

    function getVessel(id){
        let notFound = {
            name:"",
            type:"",
            capacity:0,
            vendor:"",
            disallowed:[],
            preferred:[],
            favorite:false,
            exclude:false
        }
        let result = vessels.find(vessel => vessel._id == id)
        return result !== undefined? result : notFound
    }

    function addVessel(vessel) {
        if (typeof vessel.disallowed === "string"){
            vessel.disallowed = vessel.disallowed.split(",")
        }
        if (typeof vessel.preferred === "string"){
            vessel.preferred = vessel.preferred.split(",")
        }
        axios.post(`${serverRoot}/vessels/`, {
            user_id: userid,
            name: vessel.name,
            type: vessel.type,
            capacity: +vessel.capacity,
            vendor: vessel.vendor,
            favorite: vessel.favorite,
            exclude: vessel.exclude,
            disallowed: vessel.disallowed,
            preferred: vessel.preferred,
        }).then(response => {
            console.log(response)
            setChange(true)
            //setTeas(prevTeas => [...prevTeas, tea])
        }).catch(error => {
            console.log(error)
        })

    }

    function editVessel(attributes, id){
        if (typeof attributes.disallowed === "string"){
            attributes.disallowed = attributes.disallowed.split(",")
        }
        if (typeof attributes.preferred === "string"){
            attributes.preferred = attributes.preferred.split(",")
        }
        axios.patch(`${serverRoot}/vessels/${id}`, {
            name: attributes.name,
            type: attributes.type,
            capacity: +attributes.capacity,
            vendor: attributes.vendor,
            favorite: attributes.favorite,
            exclude: attributes.exclude,
            disallowed: attributes.disallowed,
            preferred: attributes.preferred,
        }).then(response => {
            console.log(response)
            setChange(true)
        }).catch(error => {
            console.log(error)
        })
    }

    function deleteVessel(id) {
        axios.delete(`${serverRoot}/vessels/${id}`)
            .then(response => {
                console.log(response)
                setChange(true)
                //setTeas(teas.filter(tea => tea._id !== id))
            }).catch(error => {
            console.log(error)
        })
    }

    function sortVessels(attribute){
        setSortQuery(attribute)
        setChange(true)
    }

    function keywordsInVessel(keywords, id){
        const vessel = getVessel(id)
        return vessel.name.toLowerCase().split(" ").some(word => keywords.includes(word)) ||
            vessel.type.toLowerCase().split(" ").some(word => keywords.includes(word)) ||
            vessel.vendor.toLowerCase().split(" ").some(word => keywords.includes(word)) ||
            keywords.includes(vessel.capacity.toString());
    }

    return (
        <VesselContext.Provider value={{
            vessels,
            teaTypes,
            vendors,
            vesselTypes,
            vesselLoading,
            getVessel,
            addVessel,
            editVessel,
            deleteVessel,
            sortVessels,
            keywordsInVessel
        }}>{children}</VesselContext.Provider>
    )
}

