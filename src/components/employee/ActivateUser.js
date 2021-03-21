import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

import { Form, Button, Col, Image, Row } from 'react-bootstrap'
import { useForm } from '../../utils/hooks'

import { ACTIVATE_EMPLOYEE } from '../../utils/querries/employees'

export default function ActivateUser ({ activationCode }) {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState(null)

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: ''
  })

  const onSuccess = () => {
    setMessage('Success. Account Activated.')
  }

  const [activateEmployee] = useMutation(ACTIVATE_EMPLOYEE, {
    variables: { ...values, activationCode },
    onError (err) {
      err.graphQLErrors && err.graphQLErrors[0]
        ? setErrors(err.graphQLErrors[0].extensions.exception.errors)
        : setErrors(err.message)
    },
    onCompleted () {
      onSuccess()
    }
  })

  function loginUserCallback () {
    activateEmployee()
  }
  return (
    <Form onSubmit={onSubmit} noValidate className='col-sm-4' style={{ marginTop: '10%' }}>
      <div className='log-box'>
        <Image src={require('../../assets/images/secudesk-logo.png')} className='logo-img' />
      </div>
      <h4 className='mb-4' style={{ textAlign: 'center' }}>Activate User</h4>
      <Form.Row>
        <Col>
          {typeof errors === 'object' && !!Object.keys(errors).length && Object.values(errors).map((error, index) => {
            return (<div key={index}><span className='ml-2 text-danger'>{error}</span></div>)
          })}
          {
            typeof errors === 'string' && <span className='ml-2 text-danger'>{errors}</span>
          }
          <Form.Control
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
            className='p-2'
            label='Email'
            placeholder='Email..'
            name='email'
            type='email'
            value={values.email}
            onChange={onChange}
          />
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <Button
            variant='info'
            type='submit'
            block
            className='my-3'
          >
            Activate
          </Button>
        </Col>
      </Form.Row>
      <Row>
        <Col>
          <p className='text-success bold'>{message}</p>
          {message && <Link
            className='text-info'
            to={{
              pathname: '/accounts/resetPassword',
              state: {
                title: 'Setup a Passoword'
              }
            }}
                      >Please, setup a password...
            </Link>}
        </Col>
      </Row>
    </Form>
  )
}
