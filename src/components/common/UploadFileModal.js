import React, { useState } from 'react'
import { Button, Modal, Form, Spinner, Alert } from 'react-bootstrap'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export default function UploadFileModal (props) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [file, setFile] = useState('')

  const [employeePhoto, setEmployeePhoto] = useState('')

  const [submitFiles, { loading, error }] = useMutation(UPLOAD_FILE, {
    variables: {
      file: file
    },
    onError (err) {
      console.log(err)
    },
    onCompleted (data) {
      if (data) {
        setEmployeePhoto(data.singleUpload.location)
        updateEmployeePhoto()
      }
    }
  })

  let message
  if (error) {
    message = (
      <Alert key='message' variant='danger' className='mt-4'>
        Something went wrong, please try again!
      </Alert>
    )
  }
  const [updateEmployeePhoto] = useMutation(UPDATE_EMPLOYEE, {
    variables: {
      employeeId: props.employeeId,
      RegisterEmployeeInput: { employeeProfilePhoto: employeePhoto }
    },
    onError (err) {
      console.log(err.networkError)
    },
    onCompleted () {
      handleClose()
    }
  })

  const submitFileToUpload = () => {
    submitFiles()
  }

  return (
    <>
      <Button variant='outline-info' onClick={handleShow}>
        Change Photo
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Profile Photo</Modal.Title>
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
          {message}
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
            {loading ? (
              <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
            ) : (
              'Upload'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const UPLOAD_FILE = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
      location
    }
  }
`

const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee(
    $employeeId: ID!
    $RegisterEmployeeInput: RegisterEmployeeInput!
  ) {
    updateEmployee(
      employeeId: $employeeId
      RegisterEmployeeInput: $RegisterEmployeeInput
    ) {
      firstName
    }
  }
`
