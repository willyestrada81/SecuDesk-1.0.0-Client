import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { Button, Modal } from 'react-bootstrap'
import EmployeeForm from './EmployeeForm'
import { UPDATE_EMPLOYEE } from '../../utils/graphql'

export default function CreateEmployeeModal ({
  employeeData,
  title,
  customClassName
}) {
  const [lgShow, setLgShow] = useState(false)

  // const [values, setValues] = useState({
  // })

  const [employee, setEmployee] = useState({})

  // function update (event) {
  //   const value = event.target.value
  //   setValues({ ...values, [event.target.name]: value })
  // }
  function update (event, field) {
    const fieldName = event ? [event.target.name] : [Object.keys(field)]
    const value = event ? event.target.value : Object.values(field)[0]

    setEmployee({ ...employee, [fieldName]: value })
  }

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    variables: {
      employeeId: employeeData.id,
      RegisterEmployeeInput: employee
    },
    onError (err) {
      console.log(err.networkError)
    },
    onCompleted () {
      setLgShow(false)
    }
  })

  const submitEmployee = () => {
    updateEmployee()
  }

  const handleClose = () => {
    setEmployee({})
    setLgShow(false)
  }

  return (
    <>
      <Button
        onClick={() => setLgShow(true)}
        variant='primary'
        className={customClassName}
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
