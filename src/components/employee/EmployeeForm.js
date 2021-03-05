import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { Button, Col, Form, Row } from 'react-bootstrap'
import { UPLOAD_FILE } from '../../utils/graphql'
import { hasEmptyStrings } from '../../utils/utils'

import UploadFile from '../common/UploadFile'

const states = require('../../data/usStates')

export default function EmployeeForm ({
  employeeData,
  callBack,
  employee,
  values,
  submitEmployee
}) {
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
      callBack('', { employeeProfilePhoto: data.singleUpload.location })
    }
  })

  const submitFileToUpload = () => {
    submitFiles()
  }

  return (
    <Row>
      <Col>
        {!!employee && (
          <p className='text-primary'>** You can only update basic info.</p>
        )}
        <Form
          className='mt-3'
          onSubmit={(e) => {
            e.preventDefault()
            submitEmployee()
          }}
          noValidate
        >
          <Row>
            <Col md='6'>
              <Form.Group>
                <Form.Label className='color-gray'>First Name</Form.Label>
                <Form.Control
                  id='firstName'
                  type='text'
                  placeholder='John'
                  name='firstName'
                  defaultValue={employeeData ? employeeData.firstName : ''}
                  value={values.firstName}
                  readOnly={!!employee}
                  onChange={callBack || {}}
                />
              </Form.Group>
            </Col>
            <Col md='6'>
              <Form.Group>
                <Form.Label className='color-gray'>Last Name</Form.Label>
                <Form.Control
                  id='lastName'
                  type='text'
                  placeholder='Doe'
                  name='lastName'
                  defaultValue={employeeData ? employeeData.lastName : ''}
                  value={values.lastName}
                  readOnly={!!employee}
                  onChange={callBack || {}}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md='6'>
              <Form.Group className='mt-4 pl-3'>
                <Form.Check
                  type='radio'
                  name='gender'
                  id='genderMale'
                  label='Male'
                  checked={
                    employeeData ? employeeData.gender === 'Male' : false
                  }
                  disabled={!!employee}
                  onChange={callBack || {}}
                  className='color-gray mr-2'
                  value={values.gender}
                  style={{
                    display: 'inline-block',
                    padding: '.4375rem .75rem',
                    marginRight: '2rem !important'
                  }}
                />
                <Form.Check
                  type='radio'
                  name='gender'
                  id='genderFemale'
                  label='Female'
                  className='color-gray mr-2'
                  checked={
                    employeeData ? employeeData.gender === 'Female' : false
                  }
                  disabled={!!employee}
                  value={values.gender}
                  onChange={callBack || {}}
                  style={{
                    display: 'inline-block',
                    padding: '.4375rem .75rem',
                    marginRight: '2rem !important'
                  }}
                />
              </Form.Group>
            </Col>
            <Col md='6'>
              <Form.Group>
                <Form.Label className='color-gray'>Email</Form.Label>
                <Form.Control
                  id='email'
                  type='email'
                  placeholder='email'
                  name='email'
                  readOnly={!!employee}
                  defaultValue={employeeData ? employeeData.email : ''}
                  value={values.email}
                  onChange={callBack || {}}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md='8'>
              <Form.Group>
                <Form.Label className='color-gray'>Address</Form.Label>
                <Form.Control
                  id='address'
                  type='text'
                  placeholder='Address'
                  name='address'
                  defaultValue={employeeData ? employeeData.address : ''}
                  value={values.address}
                  onChange={callBack || {}}
                />
              </Form.Group>
            </Col>
            <Col md='4'>
              <Form.Group as={Col}>
                <Form.Label className='color-gray'>Profile Photo</Form.Label>
                <div>
                  <UploadFile
                    submitFileToUpload={submitFileToUpload}
                    error={error}
                    loading={loading}
                    setFile={setFile}
                    file={file}
                    photoUrl={photoUrl}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label className='color-gray'>City</Form.Label>
                <Form.Control
                  id='city'
                  type='text'
                  placeholder='City'
                  name='city'
                  defaultValue={employeeData ? employeeData.city : ''}
                  value={values.city}
                  onChange={callBack || {}}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className='color-gray'>State</Form.Label>
                <Form.Control
                  as='select'
                  id='state'
                  type='text'
                  name='state'
                  onChange={callBack || {}}
                >
                  {states.map((state, index) => {
                    return (
                      <option
                        key={index}
                        value={values.state}
                        defaultValue={employeeData ? employeeData.state : ''}
                      >
                        {state}
                      </option>
                    )
                  })}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label className='color-gray'>Hire Date</Form.Label>
                <Form.Control
                  id='hireDate'
                  type='date'
                  name='hireDate'
                  defaultValue={employeeData ? employeeData.hireDate : ''}
                  value={values.hireDate}
                  readOnly={!!employee}
                  onChange={callBack || {}}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className='color-gray'>Job title</Form.Label>
                <Form.Control
                  id='jobTitle'
                  type='text'
                  name='jobTitle'
                  defaultValue={employeeData ? employeeData.jobTitle : ''}
                  value={values.jobTitle}
                  readOnly={!!employee}
                  onChange={callBack || {}}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col auto='true'>
              <Form.Group controlId='employeeBio'>
                <Form.Label className='color-gray'>Bio</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  defaultValue={employeeData ? employeeData.bio : ''}
                  value={values.bio}
                  name='bio'
                  onChange={callBack || {}}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Row>
            <Button
              variant='primary'
              type='submit'
              disabled={hasEmptyStrings(Object.keys(values))}
            >
              Submit
            </Button>
          </Form.Row>
        </Form>
      </Col>
    </Row>
  )
}