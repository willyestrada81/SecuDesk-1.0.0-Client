import React, { useState } from 'react'
import { Alert, Button, Modal } from 'react-bootstrap'
import SearchTenantForm from '../tenants/SearchTenantForm'
import NewPackageForm from './NewPackageForm'

export default function OpenNewPackageModal ({ size, variant }) {
  const [lgShow, setLgShow] = useState(false)
  const [searchResult, setSearchResult] = useState({})

  const onCloseModal = () => {
    setLgShow(false)
    setSearchResult({})
  }

  return (
    <>
      <Button onClick={() => setLgShow(true)} variant={variant} size={size}>
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-mailbox2 mr-2' viewBox='0 0 16 16'>
          <path d='M9 8.5h2.793l.853.854A.5.5 0 0 0 13 9.5h1a.5.5 0 0 0 .5-.5V8a.5.5 0 0 0-.5-.5H9v1z' />
          <path d='M12 3H4a4 4 0 0 0-4 4v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7a4 4 0 0 0-4-4zM8 7a3.99 3.99 0 0 0-1.354-3H12a3 3 0 0 1 3 3v6H8V7zm-3.415.157C4.42 7.087 4.218 7 4 7c-.218 0-.42.086-.585.157C3.164 7.264 3 7.334 3 7a1 1 0 0 1 2 0c0 .334-.164.264-.415.157z' />
        </svg>
        Log New Package
      </Button>
      <Modal
        size='lg'
        show={lgShow}
        onHide={onCloseModal}
        aria-labelledby='example-modal-sizes-title-lg'
      >
        <Modal.Header closeButton>Log New Package</Modal.Header>
        <Modal.Body>
          <p className='mb-4 h5'>Search Package Recipient. <br /></p>
          <SearchTenantForm setSearchResult={setSearchResult} />
          {searchResult.searchTenants && Object.values(searchResult)[0].length > 0
            ? (
              <div>
                <h4>Results:</h4>
                {searchResult.searchTenants.map((tenant, index) => {
                  return (
                    <NewPackageForm
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
          <Button variant='secondary' onClick={onCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
