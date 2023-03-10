import React, {useContext} from "react" 
import { v4 as uuidV4} from 'uuid'
import useLocalStorage from "../hooks/localStorageHook"

const budgetContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"
export function useBudget(){
    return useContext(budgetContext)
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses",[])

    function getBudgetExpenses(budgetId){
        return expenses.filter(expense => expense.budgetId == budgetId)
    }

    function addBudget({name, max}){
        setBudgets(prevBudgets =>{
            if(prevBudgets.find(budget => budget.name === name)){
                return prevBudgets
            }
            return [...prevBudgets, {id: uuidV4(), name , max}]
        })
    }

    function addExpense({description, amount, budgetId}){
        setExpenses(prevExpenses =>{
            return [...prevExpenses, {id: uuidV4(), description , amount, budgetId}]
        })
    }

    function deleteBudget({id}){
        //make expenses move to uncategorized after budget is deleted
        setExpenses(prevExpenses =>{
            return prevExpenses.map(expense => {
                if(expense.budgetId !== id) return expense
                return {...expense, budgetId:UNCATEGORIZED_BUDGET_ID}
            })
        })
        setBudgets(prevBudgets=>{
            return prevBudgets.filter(budget=> budget.id !== id)
        })
    }

    function deleteExpense({id}){
        setExpenses(prevExpenses=>{
            return prevExpenses.filter(expense=> expense.id !== id)
        })
    }
    return <budgetContext.Provider value={
        {
            budgets,
            expenses,
            getBudgetExpenses,
            addBudget,
            addExpense,
            deleteBudget,
            deleteExpense,
        }
    }>
        {children}
    </budgetContext.Provider>
}