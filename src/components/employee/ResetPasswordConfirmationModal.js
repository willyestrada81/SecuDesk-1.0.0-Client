import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button, Modal } from 'react-bootstrap'

import { UPDATE_EMPLOYEE } from '../../utils/querries/employees'
import { ToastMessageContext } from '../../context/toastMessage'

export default function ResetPasswordConfirmationModal ({ employeeId, employeeName }) {
  const [show, setShow] = useState(false)

  const { setMessage } = useContext(ToastMessageContext)

  const handleError = (error) => {
    setShow(false)
    setMessage({
      message: error.message,
      show: true,
      isError: false
    })
  }

  const handleCompleted = () => {
    setMessage({
      message: 'Success.',
      show: true,
      isError: false
    })
    setShow(false)
  }

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    variables: {
      employeeId: employeeId,
      RegisterEmployeeInput: { mustResetPassword: true, password: null }
    },
    onError (err) {
      handleError(err)
    },
    onCompleted () {
      handleCompleted()
    }
  })

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const resetEmployeePassword = () => {
    updateEmployee()
  }

  return (
    <>
      <Button variant='link' onClick={handleShow} size='md'>
        Reset Password
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to reset password for <strong className='test-danger'>{employeeName}?</strong></Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant='danger' onClick={resetEmployeePassword}>Yes, confirm</Button>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
