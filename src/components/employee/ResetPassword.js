import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

import { Form, Button, Col, Image } from 'react-bootstrap'
import { useForm } from '../../utils/hooks'

import { RESET_PASSWORD } from '../../utils/graphql'

export default function ResetPassword (props) {
  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [resetPassword] = useMutation(RESET_PASSWORD, {
    onError (err) {
      err.graphQLErrors && err.graphQLErrors[0]
        ? setErrors(err.graphQLErrors[0].extensions.exception.errors)
        : setErrors(err.message)
    },
    onCompleted () {
      props.history.push('/login')
    },
    variables: values
  })

  function loginUserCallback () {
    resetPassword()
  }
  return (
    <Form onSubmit={onSubmit} noValidate className='col-sm-4' style={{ marginTop: '10%' }}>
      <div className='log-box'>
        <Image src={require('../../assets/images/secudesk-logo.png')} className='logo-img' />
      </div>
      <h4 className='mb-4' style={{ textAlign: 'center' }}>Reset Password</h4>
      <Form.Row>
        <Col>
          {typeof errors === 'object' && !!Object.keys(errors).length && Object.values(errors).map((error, index) => {
            return (<div key={index}><span className='ml-2 text-danger'>{error.toUpperCase()}</span></div>)
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
          <Form.Control
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
            className='my-2 p-2'
            label='Password'
            placeholder='Password..'
            name='password'
            type='password'
            value={values.password}
            onChange={onChange}
          />
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <Form.Control
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
            className='my-2 p-2'
            label='Confirm Password'
            placeholder='Confirm Password..'
            name='confirmPassword'
            type='password'
            value={values.confirmPassword}
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
            Reset Password
          </Button>
        </Col>
      </Form.Row>
      <Link to='/login' className='custom-link'>Back to login...</Link>
    </Form>
  )
}