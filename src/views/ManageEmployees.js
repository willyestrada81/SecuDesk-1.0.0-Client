import React, { useContext } from 'react'
import { Redirect } from 'react-router'
import { useQuery } from '@apollo/client'
import { Card, Container, Row, Col, Spinner } from 'react-bootstrap'
import { AuthContext } from '../context/auth'
import PageTitle from '../components/common/PageTitle'
import CreateEmployeeModal from '../components/employee/CreateEmployeeModal'
import EmployeesTable from '../components/employee/EmployeesTable'

import { GET_EMPLOYEES } from '../utils/querries/employees'

export default function ManageEmployees () {
  const columns = [
    'Employee',
    'First Name',
    'Last Name',
    'Email',
    'Status',
    'Actions'
  ]
  const { user } = useContext(AuthContext)
  if (user && user.isSuperAdmin) {
    const { loading, data, error } = useQuery(GET_EMPLOYEES)
    return (
      <Container fluid className='main-content-container px-4'>
        <Row noGutters className='page-header py-4'>
          <PageTitle
            sm='4'
            title='Manage Employees'
            subtitle='Employees'
            className='text-sm-left'
          />
        </Row>
        <Row>
          <Col>
            <Card className='mb-4'>
              <Card.Header className='border-bottom'>
                <Row>
                  <Col>
                    <h6 className='m-0'>Employees Accounts</h6>
                    { loading && <Spinner />}
                  </Col>
                  <Col>
                    <div className='d-flex justify-content-end'>
                      <CreateEmployeeModal title='Create Employee' variant='primary' size='md' />
                    </div>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className='p-0 pb-3'>
                {
                  !loading && <EmployeesTable data={data.getEmployees} columns={columns} />
                }
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  } else {
    return (<Redirect to='/login' />)
  }
}
