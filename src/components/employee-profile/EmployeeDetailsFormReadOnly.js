import React from 'react'

import { Col, Form, Row } from 'react-bootstrap'

export default function EmployeeDetailsFormReadOnly ({ employeeData }) {
  const {
    firstName,
    lastName,
    gender,
    email,
    address,
    city,
    state,
    hireDate,
    jobTitle
  } = employeeData
  return (
    <Row>
      <Col>
        <Form className='mt-3'>
          <Row>
            <Col md='6'>
              <Form.Group>
                <Form.Label className='color-gray'>First Name</Form.Label>
                <Form.Control
                  id='firstName'
                  type='text'
                  placeholder='John'
                  name='firstName'
                  value={firstName}
                  readOnly
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
                  value={lastName}
                  readOnly
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
                  checked={gender === 'Male'}
                  className='color-gray mr-2'
                  readOnly
                  style={{ display: 'inline-block', padding: '.4375rem .75rem', marginRight: '2rem !important' }}
                />
                <Form.Check
                  type='radio'
                  name='gender'
                  id='genderFemale'
                  label='Female'
                  className='color-gray mr-2'
                  checked={gender === 'Female'}
                  readOnly
                  style={{ display: 'inline-block', padding: '.4375rem .75rem', marginRight: '2rem !important' }}
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
                  value={email}
                  readOnly
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
                  value={address}
                  readOnly
                />
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
                  value={city}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className='color-gray'>State</Form.Label>
                <Form.Control
                  id='state'
                  type='text'
                  value={state}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label className='color-gray'>Hire Date</Form.Label>
                <Form.Control
                  id='hireDate'
                  type='text'
                  value={hireDate}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className='color-gray'>Job title</Form.Label>
                <Form.Control
                  id='jobTitle'
                  type='text'
                  value={jobTitle}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}
