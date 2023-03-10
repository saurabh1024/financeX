import { UNCATEGORIZED_BUDGET_ID, useBudget } from "../Contexts/budgetContext"
import BudgetCard from "./BudgetCard"

function UncategorizedBudgetCard(props) {
    const {getBudgetExpenses} = useBudget()
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
        (total, expense) => total + expense.amount, 0
    )
    if(amount === 0) return null;
  return (
    <BudgetCard
        {...props}
        grey
        name = "uncategorized"
        amount={amount}
    />
  )
}

export default UncategorizedBudgetCard