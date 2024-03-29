import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { Button, Form, Modal } from 'react-bootstrap'

import {
  DEACTIVATE_EMPLOYEE
} from '../../utils/querries/employees'

export default function DeactivateEmployeeModal ({
  employeeId,
  handleSuccess,
  hundleError
}) {
  const [lgShow, setLgShow] = useState(false)
  const [email, setEmail] = useState('')

  const sendError = (errors) => {
    errors.graphQLErrors && errors.graphQLErrors[0]
      ? hundleError(errors.graphQLErrors[0].extensions.exception.errors.code)
      : hundleError(errors.message)
    setEmail('')
  }

  const sendSuccess = () => {
    handleSuccess('Success', 'danger', 'Inactive')
    setEmail('')
    setLgShow(false)
  }

  const [deactivateEmployee] = useMutation(DEACTIVATE_EMPLOYEE, {
    variables: {
      employeeId,
      employeeEmail: email
    },
    onError (err) {
      sendError(err)
    },
    onCompleted () {
      sendSuccess()
    }
  })

  const setClose = () => {
    setEmail('')
    setLgShow(false)
  }

  function validateEmail (email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
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
          <p className='text-warning bold fs-5'>Warning! Deactivating an employee will disable access to the app.</p>
          <Form
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
            <Button
              variant='danger'
              onClick={(e) => {
                e.preventDefault()
                deactivateEmployee()
              }}
              disabled={!validateEmail(email)}
            >
              Deactivate
            </Button>
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
