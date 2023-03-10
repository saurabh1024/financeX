import { Button, Modal, Stack } from "react-bootstrap"
import { UNCATEGORIZED_BUDGET_ID, useBudget } from "../Contexts/budgetContext"
import { currencyFormatter } from "../utils/currencyFormatter"

const ViewExpenseModal = ({ budgetId, handleClose}) => {
    const {budgets, getBudgetExpenses, deleteExpense, deleteBudget} = useBudget()
    const expenses = getBudgetExpenses(budgetId)
    const budget = UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find(b => b.id === budgetId)
  
    return (
    <div>
      <Modal show={budgetId != null} onHide={handleClose} >
        <Modal.Header closeButton>
        <Modal.Title>View Expenses</Modal.Title>
          <Stack gap={2} direction="horizontal" className="fs-4">
            <div> &nbsp; {budget?.name}</div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button 
                onClick={()=>{
                  deleteBudget(budget)
                  handleClose()
                }}
                size="sm"
                variant="outline-danger">Delete Budget</Button>
            )}
          </Stack>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={3} direction="vertical">
          {
            expenses.map(expense =>(
              <Stack direction="horizontal" gap={2} key={expense.id}>
                <div className="me-auto fs-4">{expense.description}</div>
                <div className="ms-auto fs-4">{currencyFormatter.format(expense.amount)}</div>
                <Button onClick={()=>deleteExpense(expense)} size="sm" variant="outline-danger">&times;</Button>
              </Stack>
            ))
          }
          </Stack>
        </Modal.Body>
          
      </Modal>
    </div>
  )
}

export default ViewExpenseModal