import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

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
          <Modal.Title className='mb-4'>{`Who is visiting ${tenantName}? Search for visitor: `} <br />If no visitor found, add one. </Modal.Title>
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
                      variant='primary'
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
