import { useBudget } from "../Contexts/budgetContext"
import BudgetCard from "./BudgetCard"

const TotalBudgetCard = () => {
    const {budgets, expenses} = useBudget()
    const max = budgets.reduce(
        (total, budget) => total + budget.max,0
    )
    const amount = expenses.reduce(
        (total, expense) => total + expense.amount,0
    )
    if(max === 0) return null
  return (
    <div>
        <BudgetCard 
            name="Total"
            max={max}
            amount={amount}
            hideButtons
            grey
        />

    </div>
  )
}

export default TotalBudgetCard