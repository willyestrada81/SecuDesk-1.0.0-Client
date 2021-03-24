import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Button, Modal, Spinner } from 'react-bootstrap'

import { GET_VISITORS_BY_TENANT_ID } from '../../utils/graphql'

import SearchVisitors from './SearchVisitors'
import VisitLogConfirmation from './VisitLogConfirmation'
import NewVisitorForm from './NewVisitorForm'

export default function NewVisitLogForm ({ tenantId, tenantName, buttonText, size, variant }) {
  const [message, setModalMessage] = useState({
    show: false,
    message: '',
    success: false
  })

  const [lgShow, setLgShow] = useState(false)

  const [searchResult, setSearchResult] = useState({})

  const handleClose = () => {
    setSearchResult({})
    setModalMessage({})
    setLgShow(false)
  }

  const { loading, data } = useQuery(GET_VISITORS_BY_TENANT_ID, {
    variables: {
      tenantId
    }
  })

  return (
    <>
      <Button variant={variant} size={size} onClick={() => setLgShow(true)}>{buttonText}</Button>
      <Modal
        size='lg'
        show={lgShow}
        onHide={handleClose}
        aria-labelledby='modal-sizes-title-lg'
      >
        <Modal.Header closeButton>Log new visit for {tenantName}</Modal.Header>
        <Modal.Body>
          <Modal.Title className='mb-4'>{`Recent visitors for ${tenantName} `}</Modal.Title>
          {loading && (
            <Spinner
              as='span'
              animation='border'
              size='sm'
              role='status'
              aria-hidden='true'
            />)}
          {
            !loading && data.getVisitorsByTenantId.map((visitor, index) => {
              return (
                <span key={index} className='mr-2'>
                  <VisitLogConfirmation
                    tenantId={tenantId}
                    visitorId={visitor.id}
                    tenantName={tenantName}
                    visitorName={visitor.visitorName}
                    setModalMessage={setModalMessage}
                    variant='info'
                    btnText={`${visitor.visitorName} ${visitor.visitorLastName}`}
                  />
                </span>
              )
            })
          }
          <Modal.Title className='mt-2'>Search or add a new visitor. </Modal.Title>
          <SearchVisitors setSearchResult={setSearchResult} />
          {searchResult.searchVisitors && Object.values(searchResult)[0].length > 0
            ? (
              <div>
                <h4>Results:</h4>
                {searchResult.searchVisitors.map((visitor, index) => {
                  return (
                    <VisitLogConfirmation
                      key={index}
                      tenantId={tenantId}
                      visitorId={visitor.id}
                      tenantName={tenantName}
                      visitorName={visitor.visitorName}
                      setModalMessage={setModalMessage}
                      variant='info'
                      btnText={`Log visit for ${visitor.visitorName}`}
                    />
                  )
                })}
              </div>
              )
            : searchResult.searchVisitors && Object.values(searchResult)[0].length === 0
              ? (
                <div>
                  <h6 className='text-danger'>No visitor found</h6>
                  <NewVisitorForm
                    buttonText='Create new visitor'
                    size='md'
                    variant='primary'
                    showAsLink
                    setModalMessage={setModalMessage}
                    tenantId={tenantId}
                  />
                </div>
                )
              : ('')}
          {message.show &&
            (
              <p className={message.success ? 'text-success mt-3' : 'text-danger mt-3'}>
                {message.message}
              </p>
            )}
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
