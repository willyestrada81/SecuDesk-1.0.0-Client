import React, { useState, useContext } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Form, Modal, Button, ListGroup } from 'react-bootstrap'

import { SUBMIT_INCIDENT_MUTATION, GET_INCIDENT_CUSTOM_FIELDS } from '../../utils/graphql'
import { ToastMessageContext } from '../../context/toastMessage'

function NewIncidentForm ({ tenantId, tenantName, buttonText, showAsLink = false, size }) {
  const [incidentType, setIncident] = useState('')
  const [lgShow, setLgShow] = useState(false)

  const { loading, data } = useQuery(GET_INCIDENT_CUSTOM_FIELDS)

  const { setMessage } = useContext(ToastMessageContext)

  const hundleCompleted = () => {
    setMessage({
      message: 'Success: Incident Created',
      show: true,
      isError: false
    })
    setLgShow(false)
  }

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
        hundleCompleted()
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
            {
              !loading && data && data.getCustomFields && (
                <Form.Group>
                  <Form.Control
                    as='select'
                    className='mr-sm-2 mb-2'
                    id='incidentTypeSelect'
                    name='customField'
                    onChange={(event) => setIncident(event.target.value)}
                  >
                    <option value=''>Choose...</option>
                    {data.getCustomFields.map((field, index) => {
                      return (<option key={index} value={field.fieldName}>{field.fieldName}</option>)
                    })}
                  </Form.Control>
                </Form.Group>

              )
            }

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
