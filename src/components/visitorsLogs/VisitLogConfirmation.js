import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button, Modal } from 'react-bootstrap'
import moment from 'moment'

import { LOG_VISIT } from '../../utils/graphql'
import { ToastMessageContext } from '../../context/toastMessage'

export default function VisitLogConfirmation ({ tenantId, visitorId, tenantName, visitorName, setModalMessage, variant, size }) {
  const [show, setShow] = useState(false)

  const { setMessage } = useContext(ToastMessageContext)

  const handleError = (error) => {
    setShow(false)
    setMessage(
      {
        show: true,
        message: error && error.message,
        success: false
      }
    )
  }

  const hundleCompleted = (data) => {
    setMessage({
      message: `Success. Visit was logged on ${moment(data && data.createdAt).format('LLL')}`,
      show: true,
      isError: false
    })
    setShow(false)
    setModalMessage &&
    setModalMessage(
      {
        show: true,
        message: `Success. Visit was logged on ${moment(data && data.createdAt).format('LLL')}`,
        success: true
      }
    )
  }

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const [submitVisitLog] = useMutation(LOG_VISIT, {
    variables: {
      tenantId,
      visitorId
    },
    onError (error) {
      handleError(error)
    },
    onCompleted (data) {
      hundleCompleted(data)
    }
  })

  const logVisit = () => {
    submitVisitLog()
  }

  return (
    <>
      <Button variant={variant} onClick={handleShow} size={size}>
        Log new visit for {visitorName}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm <strong>{visitorName}</strong> is visiting <strong>{tenantName}?</strong></Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant='success' onClick={logVisit}>Yes, confirm</Button>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
