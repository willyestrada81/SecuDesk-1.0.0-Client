import React, { useContext } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { AuthContext } from '../context/auth'
import PageTitle from '../components/common/PageTitle'
import CreateEmployeeModal from '../components/employee/CreateEmployeeModal'
import OpenModal from '../components/common/OpenModal'
import IncidentCustomFieldForm from '../components/incidents/IncidentCustomFieldForm'

export default function AdminPanel () {
  const { user } = useContext(AuthContext)
  if (user && user.isSuperAdmin) {
    return (
      <Container fluid className='main-content-container px-4'>
        <Row noGutters className='page-header py-4'>
          <PageTitle
            sm='4'
            title='Admin Settings'
            subtitle='Settings'
            className='text-sm-left'
          />
        </Row>
        <Row>
          <Col md={2} />
          <Col md={8}>
            <Row>
              <Col>
                <Card className='mb-4'>
                  <Card.Body className='p-0 pb-3'>
                    <h5 className='text-primary'>Create new Employee</h5>
                    <p className='text-secondary text-md'>Create a new Employee. An email will be sent to the employee's email to activate account.</p>
                    <CreateEmployeeModal title='Create Employee' variant='primary' size='md' />
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className='mb-4'>
                  <Card.Body className='p-0 pb-3'>
                    <h5 className='text-primary'>Create Incident Custom Field</h5>
                    <p className='text-secondary text-md'>Create a custom field that will be used for incidents. "Repairs" is the default. You can add as many as you'd like.</p>
                    <IncidentCustomFieldForm />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                {}
              </Col>
              <Col>
                {}
              </Col>
            </Row>
          </Col>
          <Col md={2} />
        </Row>

      </Container>
    )
  } else {
    return (<Redirect to='/login' />)
  }
}
