import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button, Form, Modal } from 'react-bootstrap'

import { DELIVER_PACKAGE } from '../../utils/graphql'
import { ToastMessageContext } from '../../context/toastMessage'

export default function ChangePackageStatus ({
  tenantId,
  packageId,
  isDelivered
}) {
  const { setMessage } = useContext(ToastMessageContext)
  const [show, setShow] = useState(false)
  const [deliveryNote, setDeliveryNote] = useState({ notes: '' })

  const [buttonProps, setButtonProps] = useState({
    variant: isDelivered
      ? 'success'
      : 'warning',
    title: isDelivered
      ? 'Delivered'
      : 'Pending Delivery'
  })

  const handleSuccess = (message, variant, title) => {
    setMessage({
      message,
      show: true,
      isError: false
    })
    setButtonProps({
      variant,
      title
    })
  }

  const onChange = (event) => {
    const value = event.target.value
    setDeliveryNote({ notes: value })
  }

  const [submitDelivery] = useMutation(DELIVER_PACKAGE, {
    variables: {
      tenantId,
      packageId,
      note: deliveryNote
    },
    onError (error) {
      console.log(error)
    },
    onCompleted () {
      handleSuccess(
        'Success. Package status changed to "Delivered"',
        'success',
        'Delivered'
      )
    }
  })

  if (isDelivered) {
    return (
      <>
        <Button disabled variant={buttonProps.variant} size='sm'>
          {buttonProps.title}
        </Button>
      </>
    )
  } else {
    return (
      <>
        <Button onClick={() => setShow(true)} variant={buttonProps.variant} size='sm'>
          {buttonProps.title}
        </Button>
        <Modal
          size='md'
          show={show}
          onHide={() => setShow(false)}
          aria-labelledby='visitor-modal'
        >
          <Modal.Header className='h5' closeButton>Add Note</Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                e.preventDefault()
                submitDelivery()
              }}
              noValidate
            >
              <Form.Group>
                <Form.Label className='color-gray'>Notes</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  id='deliveryNote'
                  name='notes'
                  placeholder='Notes (optional)'
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className='mb-0'>
                <Button
                  theme='accent'
                  type='submit'
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}
