import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { Button, Form, Modal } from 'react-bootstrap'

import {
  DEACTIVATE_EMPLOYEE
} from '../../utils/querries/employees'

export default function DeactivateEmployeeModal ({
  employeeId,
  handleSuccess
}) {
  const [lgShow, setLgShow] = useState(false)
  const [email, setEmail] = useState('')

  const [deactivateEmployee] = useMutation(DEACTIVATE_EMPLOYEE, {
    variables: {
      employeeId,
      employeeEmail: email
    },
    onError (error) {
      console.log(error)
    },
    onCompleted (data) {
      console.log('NINJARMM ~ file: DeactivateEmployeeModal.js ~ line 26 ~ data', data)
      handleSuccess('Success', 'danger', 'Inactive')
    }
  })

  const setClose = () => {
    setEmail('')
    setLgShow(false)
  }
  return (
    <>
      <Button
        onClick={() => setLgShow(true)}
        variant='link'
        className='text-danger'
        size='sm'
      >
        Deactivate Account
      </Button>
      <Modal
        size='lg'
        show={lgShow}
        onHide={setClose}
      >
        <Modal.Header closeButton>Deactivate Employee Account</Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              deactivateEmployee()
            }}
            noValidate
          >
            <Form.Group>
              <Form.Label>
                <strong className='text-danger'>Please, type your email to deactivate employee</strong>
              </Form.Label>
              <Form.Control
                placeholder='Email'
                className='mr-sm-2 mb-2'
                id='employeeEmail'
                type='email'
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Button variant='danger' type='submit' disabled={email.trim() === ''}>
                Deactivate
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={setClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
