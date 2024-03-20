import router from "../server/routes/record";
import React, {useContext} from "react";

const TeaContext = React.createContext()
const QUANTITY_RATING_COEFF = 17
const COST_COEFF = 75

export function useTea() {
    return useContext(TeaContext)
}

export const TeaProvider = ({ children }) => {

    function getTeas() {
        return router.get()
    }

    function getTeaByID(id) {
        return router.get(id)
    }

    function addTea(tea) {
        router.post(tea)
    }

    function editTea(id, attributes){
        router.patch(id, attributes)
    }

    function pickTea(){
        let teas = getTeas()
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

    

}

