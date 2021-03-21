import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'

import { Container, Row, Col } from 'react-bootstrap'

import { GET_EMPLOYEE_BY_ID } from '../utils/querries/employees'
import { AuthContext } from '../context/auth'
import PageTitle from '../components/common/PageTitle'
import EmployeeSummary from '../components/employee/EmployeeSummary'
import EmployeeAccountDetails from '../components/employee/EmployeeAccountDetails'

function EmployeeAccount (props) {
  const employeeId = props.location.state && props.location.state.id
  const { user: { id } } = useContext(AuthContext)

  if (id) {
    const { loading, error, data } = useQuery(GET_EMPLOYEE_BY_ID, {
      variables: {
        employeeId: employeeId || id
      }
    })

    if (!loading && !data) {
      return <Redirect to={{ pathname: '/error', state: { error: error.message } }} />
    }

    return (
      <Container fluid className='main-content-container px-4'>
        <Row noGutters className='page-header py-4'>
          <PageTitle
            title='User Profile'
            subtitle='Overview'
            md='12'
            className='ml-sm-auto mr-sm-auto'
          />
        </Row>
        <Row>
          <Col lg='4'>
            {
              !loading && data && <EmployeeSummary employeeData={data.getEmployeeById} />
            }

          </Col>
          <Col lg='8'>
            {
              !loading && data && <EmployeeAccountDetails employeeData={data.getEmployeeById} />
            }
          </Col>
        </Row>
      </Container>
    )
  } else {
    return <Redirect to='/login' />
  }
}

export default EmployeeAccount
