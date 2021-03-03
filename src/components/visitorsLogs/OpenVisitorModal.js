import React, { useState } from 'react'
import { Alert, Button, Modal } from 'react-bootstrap'
import SearchTenantForm from '../tenants/SearchTenantForm'
import NewVisitLogForm from './NewVisitLogForm'

export default function OpenVisitorModal ({ variant, size }) {
  const [lgShow, setLgShow] = useState(false)
  const [searchResult, setSearchResult] = useState({})

  const handleCloseModal = () => {
    setSearchResult({})
    setLgShow(false)
  }

  return (
    <>
      <Button onClick={() => setLgShow(true)} variant={variant} size={size}>
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-door-open-fill mr-2' viewBox='0 0 16 16'>
          <path d='M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z' />
        </svg>
        Log New Visitor
      </Button>
      <Modal
        size='lg'
        show={lgShow}
        onHide={handleCloseModal}
        aria-labelledby='visitor-modal'
      >
        <Modal.Header className='h5' closeButton>New Visitor - Search Resident</Modal.Header>
        <Modal.Body>
          <p className='mb-4 h5'>Search Resident to log visitor. <br /></p>
          <SearchTenantForm setSearchResult={setSearchResult} />
          {searchResult.searchTenants && Object.values(searchResult)[0].length > 0
            ? (
              <div>
                <h4>Results:</h4>
                {searchResult.searchTenants.map((tenant, index) => {
                  return (
                    <NewVisitLogForm
                      key={index}
                      tenantId={tenant.id}
                      tenantName={`${tenant.tenantFirstName} ${tenant.tenantLastName}`}
                      buttonText={`${tenant.tenantFirstName} ${tenant.tenantLastName} - Log new visit`}
                      size='lg'
                      variant='link'
                    />
                  )
                })}
              </div>
              )
            : searchResult.searchTenants && Object.values(searchResult)[0].length === 0
              ? (
                <Alert variant='danger'>
                  Error. No resident found. You can only log a visit for registered residents. Try a more specific search.
                </Alert>
                )
              : ('')}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
