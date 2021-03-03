import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Form, Modal, Button, ListGroup } from 'react-bootstrap'

import { CREATE_VISITOR_LOG } from '../../utils/graphql'
import { hasEmptyStrings } from '../../utils/utils'
import { ToastMessageContext } from '../../context/toastMessage'

export default function NewVisitLogForm ({ buttonText, showAsLink = false, size, variant, setModalMessage, tenantId }) {
  const [visitorLog, setVisitorLog] = useState({})
  const [lgShow, setLgShow] = useState(false)

  const { setMessage } = useContext(ToastMessageContext)

  const handleError = (error) => {
    setLgShow(false)
    setModalMessage(
      {
        show: true,
        message: `${error && error.message}. Please try again, if error persists, contact the system admin.`,
        success: false
      }
    )
  }

  const handleSuccess = (data) => {
    setMessage({
      message: `Success. Visitor ${data && data.createVisitorLog.visitorName} added`,
      show: true,
      isError: false
    })
    setLgShow(false)
    setModalMessage(
      {
        show: true,
        message: `Success. Visitor ${data && data.createVisitorLog.visitorName} added`,
        success: true
      }
    )
  }

  const [submitVisitorLog] = useMutation(
    CREATE_VISITOR_LOG,
    {
      variables: {
        tenantId,
        NewVisitorInputs: visitorLog
      },
      onError (err) {
        handleError(err)
      },
      onCompleted (data) {
        handleSuccess(data)
      }
    }
  )

  const onChange = (event) => {
    const value = event.target.value
    setVisitorLog({ ...visitorLog, [event.target.name]: value })
  }
  const submitVisitorLogForm = () => {
    submitVisitorLog()
  }
  return (
    <>
      {showAsLink
        ? (<Button variant={variant} size={size} onClick={() => setLgShow(true)}>{buttonText}</Button>)
        : (
          <ListGroup>
            <ListGroup.Item action onClick={() => setLgShow(true)} className='text-primary underlined'>
              <u>{buttonText}</u>
            </ListGroup.Item>
          </ListGroup>
          )}
      <Modal
        size='lg'
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby='modal-sizes-title-lg'
      >
        <Modal.Header closeButton>New Visitor</Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              submitVisitorLogForm()
            }}
            noValidate
          >
            <Form.Group>
              <Form.Control
                className='mr-sm-2 mb-2'
                id='visitorName'
                name='visitorName'
                placeholder="Visitor's Name" // eslint-disable-line
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className='mr-sm-2 mb-2'
                id='visitorLastName'
                name='visitorLastName'
                placeholder="Visitor's Last Name" // eslint-disable-line
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Notes...'
                name='notes'
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className='mb-0'>
              <Button
                theme='accent'
                type='submit'
                disabled={hasEmptyStrings(Object.keys(visitorLog))}
              >
                Submit Visitor
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setLgShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
