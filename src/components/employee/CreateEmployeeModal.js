import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { Button, Modal } from 'react-bootstrap'
import EmployeeForm from './EmployeeForm'
import { UPDATE_EMPLOYEE, REGISTER_EMPLOYEE } from '../../utils/querries/employees'
import { ToastMessageContext } from '../../context/toastMessage'

export default function CreateEmployeeModal ({
  employeeData,
  title,
  customClassName,
  variant,
  size
}) {
  const [lgShow, setLgShow] = useState(false)

  const [employee, setEmployee] = useState({})

  const { setMessage } = useContext(ToastMessageContext)

  const hundleCompleted = () => {
    setMessage({
      message: 'Success. Invitation sent',
      show: true,
      isError: false
    })
    setLgShow(false)
  }

  const hundleError = (error) => {
    setMessage({
      message: `Error. ${error.message}`,
      show: true,
      isError: true
    })
    setLgShow(false)
  }

  function update (event, field) {
    const fieldName = event ? [event.target.name] : [Object.keys(field)]
    const value = event ? event.target.value : Object.values(field)[0]

    setEmployee({ ...employee, [fieldName]: value })
  }

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    variables: {
      employeeId: employeeData && employeeData.id,
      RegisterEmployeeInput: employee
    },
    onError (err) {
      hundleError(err)
    },
    onCompleted () {
      hundleCompleted()
    }
  })

  const [createEmployee] = useMutation(REGISTER_EMPLOYEE, {
    variables: employee,
    onError (err) {
      hundleError(err)
    },
    onCompleted () {
      hundleCompleted()
    }
  })

  const submitEmployee = () => {
    employeeData ? updateEmployee() : createEmployee()
  }

  const handleClose = () => {
    setEmployee({})
    setLgShow(false)
  }

  return (
    <>
      <Button
        onClick={() => setLgShow(true)}
        variant={variant}
        className={customClassName}
        size={size}
      >
        {title}
      </Button>
      <Modal
        size='lg'
        show={lgShow}
        onHide={() => handleClose()}
        aria-labelledby='example-modal-sizes-title-lg'
      >
        <Modal.Header closeButton>{title}</Modal.Header>
        <Modal.Body>
          <EmployeeForm
            employeeData={employeeData}
            callBack={update}
            employee={employee}
            values={employee}
            submitEmployee={submitEmployee}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
