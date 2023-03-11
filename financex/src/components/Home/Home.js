import React, { useState } from 'react'
import { Button, Container, Stack } from 'react-bootstrap'
import { UNCATEGORIZED_BUDGET_ID, useBudget } from '../../Contexts/budgetContext'
import AddBudgetModal from '../AddBudgetModal'
import AddExpenseModal from '../addExpenseModal'
import BudgetCard from '../BudgetCard'
import TotalBudgetCard from '../TotalBudgetCard'
import UncategorizedBudgetCard from '../UncategorizedBudgetCard'
import ViewExpenseModal from '../ViewExpenseModal'
import './Home.css'

export const Home = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState()
  const {budgets, expenses, getBudgetExpenses} = useBudget()
  const openAddExpenseModal =(budgetId)=> {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }
  return (
    <div className='d-flex justify-content-center'>
        <div className='col-12 col-lg-6' >
          <Container className='my-4 container'>
            <Stack direction='horizontal' gap='2' className='mb-4'>
              <h1 className='me-auto'>ExpenseX</h1>
              <Button onClick={()=>setShowAddBudgetModal(true)}>Add Budget</Button>
              <Button onClick={openAddExpenseModal} variant='outline-primary'>Add Expense</Button>
            </Stack>
            { (budgets.length>0 || expenses.length>0)  ?
              <div className="cardDiv">
              {
                budgets.map(budget=>
                  {
                    const amount = getBudgetExpenses(budget.id).reduce(
                      (total, expense) => total + expense.amount,0
                    )
                  return <BudgetCard 
                  key={budget.id}
                  name={budget.name} 
                  max={budget.max} 
                  amount={amount}
                  onAddExpenseClick={()=>openAddExpenseModal(budget.id)}
                  onViewExpenseClick={()=>setViewExpenseModalBudgetId(budget.id)}
                   />
                  }
                )
              }
              <UncategorizedBudgetCard 
                onAddExpenseClick={openAddExpenseModal}                  
                onViewExpenseClick={()=>setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
 />
              <TotalBudgetCard />
            </div>
            :
            <div className='d-flex flex-column pt-5 mt-5 justify-content-center align-items-center'>
              <span className='fs-5'>Welcome to FinanceX. <br/>
              </span>
              <p className='pt-4 px-5 text-center'>A handy app to keep track of your budget and expenses. <br/>To get started, add a category with Add budget button above and play around a litle.</p>
            </div>
            }
          </Container>
          <AddBudgetModal show={showAddBudgetModal} handleClose={()=>setShowAddBudgetModal(false)}  />          
          <AddExpenseModal defaultBudgetId={addExpenseModalBudgetId} show={showAddExpenseModal} handleClose={()=>setShowAddExpenseModal(false)}  />
          <ViewExpenseModal budgetId={viewExpenseModalBudgetId} handleClose={()=>setViewExpenseModalBudgetId()} />
        </div>
    </div>
  )
}
