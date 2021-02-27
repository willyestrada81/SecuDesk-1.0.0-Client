import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Row, Col, Card, CardHeader, CardBody } from 'shards-react'

import { AuthContext } from '../context/auth'
import PageTitle from '../components/common/PageTitle'
import Table from '../components/common/Table'

function TenantsSearchResult (props) {
  const { user } = useContext(AuthContext)

  const { data } = props.location.state
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
        {/* Page Header */}
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
            <Card small className='mb-4'>
              <CardHeader className='border-bottom'>
                <Row>
                  <Col>
                    <h6 className='m-0'>{typeof data !== 'undefined' && data.searchTenants.length} Resident(s) Found</h6>
                  </Col>
                  <Col />
                </Row>
              </CardHeader>
              <CardBody className='p-0 pb-3'>
                {
                  data && <Table data={data.searchTenants} columns={columns} />
                }
              </CardBody>
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
