import React, { useState } from 'react'
import { Button, Modal, Form, Spinner } from 'react-bootstrap'

export default function UploadFile ({ submitFileToUpload, error, loading, setFile, file, photoUrl }) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant='info' onClick={handleShow}>
        Upload Photo
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Form.File
              name='document'
              type='file'
              onChange={({ target: { files } }) => {
                setFile(files[0])
              }}
            />
          </Form>
          <p className='mt-4 text-danger'>{error ? error.message : ''}</p>
          {photoUrl && (
            <p className='mt-4 text-success'>Success. File uploaded successfully.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            theme='accent'
            type='submit'
            disabled={!file}
            onClick={(e) => {
              e.preventDefault()
              submitFileToUpload()
            }}
          >
            {loading
              ? (<Spinner
                  as='span'
                  animation='border'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                 />)
              : ('Upload')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
