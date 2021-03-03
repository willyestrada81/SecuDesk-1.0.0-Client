import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Form, Modal, Button, ListGroup } from 'react-bootstrap'

import { CREATE_NEW_PACKAGE } from '../../utils/graphql'
import { ToastMessageContext } from '../../context/toastMessage'

function NewPackageForm ({ tenantId, tenantName, buttonText, showAsLink = false, size }) {
  const [lgShow, setLgShow] = useState(false)
  const [newPackage, setNewPackage] = useState({})

  const { setMessage } = useContext(ToastMessageContext)

  const hundleCompleted = () => {
    setMessage({
      message: 'Success: Package logged',
      show: true,
      isError: false
    })
    setLgShow(false)
  }

  const [submitIncidentLog] = useMutation(
    CREATE_NEW_PACKAGE,
    {
      variables: {
        tenantId: tenantId,
        isDelivered: newPackage.isDelivered === 'on',
        notes: newPackage.notes
      },
      onError (err) {
        console.log(err.networkError)
      },
      onCompleted () {
        hundleCompleted()
      }
    }
  )
  const submitIncident = () => {
    submitIncidentLog()
  }

  const onChange = (event) => {
    setNewPackage({
      ...newPackage, [event.target.name]: event.target.value
    })
  }

  const onCloseModal = () => {
    setLgShow(false)
    setNewPackage({})
  }

  return (
    <>
      {showAsLink
        ? (<Button variant='link' size={size} onClick={() => setLgShow(true)}>{buttonText}</Button>)
        : (
          <ListGroup>
            <ListGroup.Item action onClick={() => setLgShow(true)} className='text-primary underlined'>
              <u>{buttonText}</u>
            </ListGroup.Item>
          </ListGroup>
          )}
      <Modal
        size='md'
        show={lgShow}
        onHide={onCloseModal}
        aria-labelledby='modal-sizes-title-lg'
      >
        <Modal.Header closeButton>New Package for {tenantName}</Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              submitIncident()
            }}
            noValidate
          >
            <Form.Group controlId='formBasicCheckbox'>
              <Form.Check
                id='isPackageDelivered'
                type='checkbox'
                label='Is Delivered?'
                name='isDelivered'
                className='mr-sm-2 mb-2'
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as='textarea'
                rows={3}
                name='notes'
                placeholder='Notes...'
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className='mb-0'>
              <Button
                theme='accent'
                type='submit'
              >
                Log Package
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default NewPackageForm
