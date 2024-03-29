import React, { useState } from 'react'
import { Alert, Button, Modal } from 'react-bootstrap'
import SearchTenantForm from '../tenants/SearchTenantForm'
import NewIncidentForm from './NewIncidentForm'

export default function OpenIncidentModal ({ size }) {
  const [lgShow, setLgShow] = useState(false)
  const [searchResult, setSearchResult] = useState({})

  return (
    <>
      <Button onClick={() => setLgShow(true)} variant='link' size={size} className='text-start'>
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-exclamation-octagon-fill mr-2' viewBox='0 0 16 16'>
          <path d='M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />
        </svg>
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
