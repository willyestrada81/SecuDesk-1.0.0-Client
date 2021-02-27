import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button, Modal } from 'react-bootstrap'
import moment from 'moment'

import { LOG_VISIT } from '../../utils/graphql'

export default function VisitLogConfirmation ({ tenantId, visitorId, tenantName, visitorName, setMessage }) {
  const [show, setShow] = useState(false)

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

  const handleSuccess = (data) => {
    setShow(false)
    setMessage(
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
      handleSuccess(data)
    }
  })

  const logVisit = () => {
    submitVisitLog()
  }

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Log new visit
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
