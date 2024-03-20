import React, { useContext, useState } from "react"
import { v4 as uuidV4 } from "uuid"
import {ref, set, get, update, remove, child} from "firebase/database";

const TeaContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

// budgets: id, name, and max
// expense: id, budgetId, desc, and amount
// income : desc and amount

// allows to use the context
// BudgetApp/App has access to everything in budgets context
export function useTea() {
  return useContext(TeaContext)
}

export const TeaProvider = ({ children }) => {
  // setBudgets allows to update budget values
  const [vessels, setVessels] = useLocalStorage("budgets", [])
  // setExpenses allows to update the expenses
  const [teas, setTeas] = useLocalStorage("expenses", [])
  // setIncome allows to update the income values
  const [sessions, setSessions] = useLocalStorage("income", [])

  function getBudgetExpenses(budgetId) {
    return expenses.filter(expense => expense.budgetId === budgetId)
  }

  // function to add expense
  function addExpense({ description, amount, budgetId }) { // pass in the desc, amount, and the budgetId
    setExpenses(prevExpenses => { // add the expense to the past expenses
      // do not need to check for duplicate names since we can have expenses with the same desc
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }]
    })
  }

  // allows user to add income
  function addIncome({ description, amount }) {
    setIncome(prevIncome => {
      return [...prevIncome, { id: uuidV4(), description, amount }]
    })
  }

  // function to add a budget
  function addBudget({ name, max }) { // pass in a name and a max for the budget
    setBudgets(prevBudgets => { // make sure to account for previous budgets
      // check to see if the budget already exitsts
      if (prevBudgets.find(budget => budget.name === name)) {
        return prevBudgets // return the current budgets if any of the names are the same
      }
      return [...prevBudgets, { id: uuidV4(), name, max }]
    })
  }

  // function to delete the budget
  function deleteBudget({ id }) {
    // get rid of the budget with the passed in it
    setExpenses(prevExpenses => {
      return prevExpenses.map(expense => {
        if (expense.budgetId !== id) return expense
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
        // need to account for the uncategorized budget category
      })
    })

    setBudgets(prevBudgets => {
      return prevBudgets.filter(budget => budget.id !== id)
    })
  }

  // function to delete an expense
  function deleteExpense({ id }) {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id)
    })
  }
  function deleteIncome({ id }) {
    setIncome(prevIncome => {
      return prevIncome.filter(income => income.id !== id)
    })
  }

  // entire application is wrapped in BudgetsProvider
  return (
    <BudgetsContext.Provider
      value={{
        // what is passes down
        budgets,
        expenses,
        income,
        // fucntions
        getBudgetExpenses,
        addExpense,
        addIncome,
        addBudget,
        deleteBudget,
        deleteExpense,
        deleteIncome
      }}
    >
      {children}
    </BudgetsContext.Provider>
  )
}
