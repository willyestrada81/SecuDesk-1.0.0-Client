import React from 'react'

import { Container, Row, Col } from 'react-bootstrap'
import LoginForm from '../components/employee/LoginForm'
import ResetPassword from '../components/employee/ResetPassword'

function Login (props) {
  const getForm = () => {
    if (props.match.params.activationCode) {
      const activationCode = props.match.params.activationCode
      return (<div>THIS IS TO ACTIVATEUSER</div>)
    }
    if (props.match.params.resetPassword) {
      console.log(props.match.params.resetPassword)
      return (<ResetPassword />)
    }
    return (<LoginForm />)
  }

  return (
    <div className='login-bg'>
      <Container>
        <Row>
          <Col className='d-flex flex-direction column justify-content-center'>
            {getForm()}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login
