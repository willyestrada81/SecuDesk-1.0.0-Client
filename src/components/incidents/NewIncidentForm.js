import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Form, Modal, Button, ListGroup } from 'react-bootstrap'

import { SUBMIT_INCIDENT_MUTATION } from '../../utils/graphql'

function NewIncidentForm ({ tenantId, tenantName, buttonText, showAsLink = false, size }) {
  const [incidentType, setIncident] = useState('')
  const [lgShow, setLgShow] = useState(false)

  const [submitIncidentLog] = useMutation(
    SUBMIT_INCIDENT_MUTATION,
    {
      variables: {
        tenantId: tenantId,
        incidentType
      },
      onError (err) {
        console.log(err.networkError)
      },
      onCompleted () {
        setLgShow(false)
      }
    }
  )
  const submitIncident = () => {
    submitIncidentLog()
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
        size='lg'
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby='modal-sizes-title-lg'
      >
        <Modal.Header closeButton>New Incident for {tenantName}</Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              submitIncident()
            }}
            noValidate
          >
            <Form.Group>
              <Form.Control
                as='select'
                className='mr-sm-2 mb-2'
                id='incifentTypeSelect'
                onChange={(event) => setIncident(event.target.value)}
              >
                <option value=''>Choose...</option>
                <option value='Visitor'>Visitor</option>
                <option value='Repairs'>Repairs</option>
                <option value='Delivery'>Delivery</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control as='textarea' rows={3} placeholder='Notes...' />
            </Form.Group>
            <Form.Group className='mb-0'>
              <Button
                theme='accent'
                type='submit'
                disabled={incidentType.trim() === ''}
              >
                Submit Incident
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

export default NewIncidentForm
