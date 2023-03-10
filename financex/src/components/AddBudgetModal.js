import React, { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useBudget } from '../Contexts/budgetContext'

const AddBudgetModal = ({show, handleClose}) => {
    const nameRef = useRef()
    const maxRef = useRef()
    const {addBudget} = useBudget()
    const handleSubmit = (e) => {
        addBudget({
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value)
        })
        handleClose()
    }
  return (
    <div>
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton >
                <Modal.Title>New Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className='mb-3' controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={nameRef} type='text' required></Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='max'>
                        <Form.Label>Maximum spending</Form.Label>
                        <Form.Control ref={maxRef} type='number' step={0.01} min={0} required></Form.Control>
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

export default AddBudgetModal