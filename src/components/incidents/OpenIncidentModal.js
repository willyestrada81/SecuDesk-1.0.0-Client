import React, { useState } from 'react'
import { Alert, Button, Modal } from 'react-bootstrap'
import SearchTenantForm from '../tenants/SearchTenantForm'
import NewIncidentForm from './NewIncidentForm'

export default function OpenIncidentModal ({ size }) {
  const [lgShow, setLgShow] = useState(false)
  const [searchResult, setSearchResult] = useState({})

  return (
    <>
      <Button onClick={() => setLgShow(true)} variant='link' size={size}>
        Log a new Incident
      </Button>
      <Modal
        size='lg'
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby='example-modal-sizes-title-lg'
      >
        <Modal.Header closeButton>Create a new incident</Modal.Header>
        <Modal.Body>
          <p className='mb-4 h5'>Search Resident to Log Incident. <br /></p>
          <SearchTenantForm setSearchResult={setSearchResult} />
          {searchResult.searchTenants && Object.values(searchResult)[0].length > 0
            ? (
              <div>
                <h4>Results:</h4>
                {searchResult.searchTenants.map((tenant, index) => {
                  return (
                    <NewIncidentForm
                      key={index}
                      tenantId={tenant.id}
                      tenantFirstName={tenant.tenantFirstName}
                      buttonText={`${tenant.tenantFirstName} ${tenant.tenantLastName} - Apt/Address: ${tenant.apartment}`}
                      title='Results'
                      size='lg'
                    />
                  )
                })}
              </div>
              )
            : searchResult.searchTenants && Object.values(searchResult)[0].length === 0
              ? (
                <Alert variant='danger'>
                  Error. No resident found. You can only log an incident for registered residents. Try a more specific search.
                </Alert>
                )
              : ('')}
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
