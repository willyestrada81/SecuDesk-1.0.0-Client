import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Form, Col, Button } from 'react-bootstrap'
import UploadFile from '../common/UploadFile'

import { useForm } from '../../utils/hooks'
import { UPLOAD_FILE, CREATE_TENANT } from '../../utils/graphql'
import { hasEmptyStrings } from '../../utils/utils'

export default function NewTenantForm () {
  const [file, setFile] = useState('')

  const [photoUrl, setPhotoUrl] = useState('')

  const [submitFiles, { loading, error }] = useMutation(UPLOAD_FILE, {
    variables: {
      file: file
    },
    onError (err) {
      console.log(err)
    },
    onCompleted (data) {
      setPhotoUrl(data.singleUpload.location)
      console.log(data)
    }
  })

  const submitFileToUpload = () => {
    submitFiles()
  }

  const [message, setMessage] = useState({
    show: false,
    message: '',
    success: false
  })

  const { onChange, onSubmit, values } = useForm(createTenant, {
    tenantFirstName: '',
    tenantLastName: '',
    tenantDateOfBirth: '',
    apartment: '',
    moveinDate: '',
    tenantPhone: '',
    tenantEmail: ''
  })

  const [addTenant] = useMutation(CREATE_TENANT, {
    onError (err) {
      setMessage({
        show: true,
        message:
          typeof err.graphQLErrors[0] !== 'undefined'
            ? Object.values(err.graphQLErrors[0].extensions.exception.errors)
            : [err.message]
      })
    },
    onCompleted () {
      setMessage({
        show: true,
        message: ['Success. Form submitted'],
        success: true
      })
    },
    variables: { ...values, tenantProfilePhoto: photoUrl }
  })

  function createTenant () {
    addTenant()
  }

  return (
    <Form onSubmit={onSubmit} noValidate className='p-10'>
      <Form.Row>
        <Form.Group as={Col} controlId='formGridFirstName'>
          <Form.Label column sm='6'>
            <strong className='text-muted'>First Name</strong>
          </Form.Label>
          <Form.Control
            placeholder='John..'
            name='tenantFirstName'
            type='text'
            value={values.tenantFirstName}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId='formGridLastName'>
          <Form.Label column sm='6'>
            <strong className='text-muted'>Last Name</strong>
          </Form.Label>
          <Form.Control
            placeholder='Doe..'
            name='tenantLastName'
            type='text'
            value={values.tenantLastName}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId='formGridDOB'>
          <Form.Label column sm='6'>
            <strong className='text-muted'>Date of birth</strong>
          </Form.Label>
          <Form.Control
            name='tenantDateOfBirth'
            type='date'
            value={values.tenantDateOfBirth}
            onChange={onChange}
            required
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId='formGridEmail'>
          <Form.Label column sm='4'>
            <strong className='text-muted'>Email</strong>
          </Form.Label>
          <Form.Control
            placeholder='john.doe@gmail.com'
            name='tenantEmail'
            type='email'
            value={values.tenantEmail}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId='formGridPhone'>
          <Form.Label column sm='4'>
            <strong className='text-muted'>Phone</strong>
          </Form.Label>
          <Form.Control
            placeholder='555-555-5555'
            name='tenantPhone'
            type='phone'
            value={values.tenantPhone}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId='formGridApartment'>
          <Form.Label column sm='4'>
            <strong className='text-muted'>Apartment</strong>
          </Form.Label>
          <Form.Control
            placeholder='111'
            name='apartment'
            type='number'
            value={values.apartment}
            onChange={onChange}
            required
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId='formGridMoveInDate'>
          <Form.Label column sm='4'>
            <strong className='text-muted'>Move in date</strong>
          </Form.Label>
          <Form.Control
            label='Move in Date'
            name='moveinDate'
            type='date'
            value={values.moveinDate}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label column sm='4'>
            <strong className='text-muted'>Profile Photo</strong>
          </Form.Label>
          <div>

            <UploadFile submitFileToUpload={submitFileToUpload} error={error} loading={loading} setFile={setFile} file={file} photoUrl={photoUrl} />
          </div>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        {message.show &&
          message.message.map((m, index) => {
            return (
              <div key={index}>
                <p
                  key='message'
                  className={message.success ? 'text-success' : 'text-danger'}
                >
                  {m}
                </p>
              </div>
            )
          })}
      </Form.Row>
      <Form.Row>
        <Button
          variant='primary'
          type='submit'
          disabled={hasEmptyStrings(Object.values(values))}
        >
          Submit
        </Button>
      </Form.Row>
    </Form>
  )
}
