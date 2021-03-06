import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'

import { AuthContext } from '../context/auth'
import PageTitle from '../components/common/PageTitle'
import TenantsTable from '../components/tenants/TenantsTable'

function TenantsSearchResult (props) {
  const { user } = useContext(AuthContext)

  const data = props.location.state && props.location.state.data
  const columns = [
    'Resident',
    'First Name',
    'Last Name',
    'Apartment #',
    'Resident Since',
    'Phone',
    'Total of Incidents',
    'Add New Incident'
  ]

  if (user) {
    return (
      <Container fluid className='main-content-container px-4'>
        <Row noGutters className='page-header py-4'>
          <PageTitle
            sm='4'
            title='Search Results'
            subtitle='Residents'
            className='text-sm-left'
          />
        </Row>
        <Row>
          <Col>
            <Card className='mb-4'>
              <Card.Header className='border-bottom'>
                <Row>
                  <Col>
                    <h6 className='m-0'>{typeof data !== 'undefined' && data.searchTenants.length} Resident(s) Found</h6>
                  </Col>
                  <Col />
                </Row>
              </Card.Header>
              <Card.Body className='p-0 pb-3'>
                {
                  data && <TenantsTable data={data.searchTenants} columns={columns} />
                }
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  } else {
    return <Redirect to='/login' />
  }
}

export default TenantsSearchResult
