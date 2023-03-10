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
  const {budgets, getBudgetExpenses} = useBudget()
  const openAddExpenseModal =(budgetId)=> {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }
  return (
    <div className='d-flex justify-content-center'>
        <div id='container'>
          <Container className='my-4'>
            <Stack direction='horizontal' gap='2' className='mb-4'>
              <h1 className='me-auto'>Budgets</h1>
              <Button onClick={()=>setShowAddBudgetModal(true)}>Add Budget</Button>
              <Button onClick={openAddExpenseModal} variant='outline-primary'>Add Expense</Button>
            </Stack>
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
          </Container>
          <AddBudgetModal show={showAddBudgetModal} handleClose={()=>setShowAddBudgetModal(false)}  />          
          <AddExpenseModal defaultBudgetId={addExpenseModalBudgetId} show={showAddExpenseModal} handleClose={()=>setShowAddExpenseModal(false)}  />
          <ViewExpenseModal budgetId={viewExpenseModalBudgetId} handleClose={()=>setViewExpenseModalBudgetId()} />
        </div>
    </div>
  )
}
