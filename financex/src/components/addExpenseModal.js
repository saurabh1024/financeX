import React, { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { UNCATEGORIZED_BUDGET_ID, useBudget } from '../Contexts/budgetContext'

const AddExpenseModal = ({show, handleClose, defaultBudgetId}) => {
    const descRef = useRef()
    const amountRef = useRef()
    const budgetRef = useRef()
    const {addExpense, budgets} = useBudget()
    const handleSubmit = (e) => {
        addExpense({
            description: descRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: budgetRef.current.value,
        })
        handleClose()
    }
  return (
    <div>
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton >
                <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className='mb-3' controlId='name'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control ref={descRef} type='text' required></Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='max'>
                        <Form.Label>Amount Spent</Form.Label>
                        <Form.Control ref={amountRef} type='number' step={0.01} min={0} required></Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='max'>
                        <Form.Label>Budget</Form.Label>
                        <Form.Select 
                        defaultValue={defaultBudgetId} 
                        ref={budgetRef}
                        required>
                            <option value={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                            {budgets.map(budget=>(
                                <option key={budget.id} value={budget.id}>
                                    {budget.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <div className='d-flex justify-content-end mt-4'>
                        <Button type='submit' className='px-4'>Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    </div>
  )
}

export default AddExpenseModal