import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap'

import { AuthContext } from '../context/auth'
import PageTitle from '../components/common/PageTitle'
import TenantsTable from '../components/tenants/TenantsTable'
import OpenModal from '../components/common/OpenModal'
import NewTenantForm from '../components/tenants/NewTenantForm'

import { FETCH_TENANTS_QUERY } from '../utils/graphql'

function Tenants () {
  const { user } = useContext(AuthContext)

  const columns = [
    'Resident',
    'First Name',
    'Last Name',
    'Apartment #',
    'Resident Since',
    'Phone',
    'Visitor/Incident Logs',
    'Add Visitor/Incident'
  ]

  if (user) {
    const { loading, data } = useQuery(FETCH_TENANTS_QUERY, {})
    if (loading) return <Spinner animation='border' />
    if (!loading && typeof data === 'undefined') {
      return <Redirect to='/error' />
    }
    return (
      <Container fluid className='main-content-container px-4'>
        <Row noGutters className='page-header py-4'>
          <PageTitle
            sm='4'
            title='Resident Registry'
            subtitle='Registry'
            className='text-sm-left'
          />
        </Row>
        <Row>
          <Col>
            <Card className='mb-4'>
              <Card.Header className='border-bottom'>
                <Row>
                  <Col>
                    <h6 className='m-0'>Active Residents</h6>
                  </Col>
                  <Col>
                    <div className='d-flex justify-content-end'>
                      <OpenModal
                        variant='primary'
                        name='Create New Resident'
                        size='md'
                        modalTitle='New Resident'
                        component={<NewTenantForm />}
                        showIcon
                      />
                    </div>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className='p-0 pb-3'>
                {
                  !loading && <TenantsTable data={data.getTenants} columns={columns} />
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

export default Tenants
