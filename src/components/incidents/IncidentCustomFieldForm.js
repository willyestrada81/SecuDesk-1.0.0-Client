import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Form, Modal, Button } from 'react-bootstrap'

import { CREATE_CUSTOM_FIELD } from '../../utils/graphql'
import { ToastMessageContext } from '../../context/toastMessage'

export default function IncidentCustomFieldForm () {
  const [fieldName, setFieldName] = useState('')
  const [lgShow, setLgShow] = useState(false)

  const { setMessage } = useContext(ToastMessageContext)

  const handleError = (error) => {
    setLgShow(false)
    setMessage({
      message: error.message,
      show: true,
      isError: true
    })
  }

  const handleSuccess = () => {
    setMessage({
      message: 'Success',
      show: true,
      isError: false
    })
    setLgShow(false)
  }

  const [submitCustomField] = useMutation(
    CREATE_CUSTOM_FIELD,
    {
      variables: {
        fieldName
      },
      onError (err) {
        handleError(err)
      },
      onCompleted () {
        handleSuccess()
      }
    }
  )

  const onChange = (event) => {
    const value = event.target.value
    setFieldName(value)
  }
  const submitForm = () => {
    submitCustomField()
  }

  const handleClose = () => {
    setFieldName('')
    setLgShow(false)
  }

  return (
    <>
      <Button variant='primary' onClick={() => setLgShow(true)}>New Incident Custom Field</Button>
      <Modal
        size='sm'
        show={lgShow}
        onHide={handleClose}
        aria-labelledby='modal-sizes-title-lg'
      >
        <Modal.Header closeButton>New Incident Custom Field</Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              submitForm()
            }}
            noValidate
          >
            <Form.Group>
              <Form.Control
                className='mr-sm-2 mb-2'
                id='visitorName'
                name='visitorName'
                placeholder='Field Name (required)'
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group className='mb-0'>
              <Button
                theme='accent'
                type='submit'
                disabled={fieldName.trim() === ''}
              >
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
