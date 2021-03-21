import React, { useContext } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import { Container, Row, Col, Button } from 'react-bootstrap'
import { AuthContext } from '../context/auth'
import PageTitle from '../components/common/PageTitle'
import CreateEmployeeModal from '../components/employee/CreateEmployeeModal'
import IncidentCustomFieldForm from '../components/incidents/IncidentCustomFieldForm'
import CustomCard from '../components/common/CustomCard'

export default function AdminPanel() {
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
                <CustomCard
                  cardClass='mb-4'
                  cardBodyClass='p-0 pb-3'
                  component={<CreateEmployeeModal title='Create Employee' variant='primary' size='md' />}
                  title='Create new Employee'
                  content={'Create a new Employee. An email will be sent to the employee\'s email to activate account.'}
                />
              </Col>
              <Col>
                <CustomCard
                  cardClass='mb-4'
                  cardBodyClass='p-0 pb-3'
                  component={<IncidentCustomFieldForm />}
                  title='Create Incident Custom Field'
                  content={'Create a custom field that will be used for incidents. "Repairs" is the default. You can add as many as you\'d like.'}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <CustomCard
                  cardClass='mb-4'
                  cardBodyClass='p-0 pb-3'
                  component={
                    <Link variant='primary' to='/manage-employees'>
                      <Button>Manage Employees</Button>
                    </Link>
                    }
                  title='Manage Employees'
                  content={'Reset Employees\' Passwords. Copy Invitation Link. Deactivate Employee.'}
                />
              </Col>
              <Col>
                { }
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
