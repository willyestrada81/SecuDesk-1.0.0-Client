import React from 'react'

import { Container, Row, Col } from 'react-bootstrap'
import LoginForm from '../components/employee/LoginForm'
import ResetPassword from '../components/employee/ResetPassword'
import ActivateUser from '../components/employee/ActivateUser'

function Login (props) {
  const title = props.location.state ? props.location.state.title : 'Reset Password'

  const getForm = () => {
    if (props.match.params.activationCode) {
      const activationCode = props.match.params.activationCode
      return (<ActivateUser activationCode={activationCode} />)
    }
    if (props.match.params.resetPassword) {
      return (<ResetPassword title={title} />)
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
