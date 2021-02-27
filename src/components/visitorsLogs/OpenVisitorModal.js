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
