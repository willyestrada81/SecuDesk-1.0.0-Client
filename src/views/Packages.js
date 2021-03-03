import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap'

import { AuthContext } from '../context/auth'
import PageTitle from '../components/common/PageTitle'
import PackagesTable from '../components/packages/PackagesTable'
import OpenNewPackageModal from '../components/packages/OpenNewPackageModal'

import { GET_PACKAGES } from '../utils/graphql'

function Packages () {
  const { user } = useContext(AuthContext)

  const columns = [
    'Package Id',
    'Received Date',
    'Received By',
    'Recipient/Resident',
    'Status',
    'Notes'
  ]

  if (user) {
    const { loading, data, error } = useQuery(GET_PACKAGES, {})
    if (loading) return <Spinner animation='border' />
    if (!loading && typeof data === 'undefined') {
      return <Redirect to='/error' state={error.message} />
    }
    return (
      <Container fluid className='main-content-container px-4'>
        <Row noGutters className='page-header py-4'>
          <PageTitle
            sm='4'
            title='Packages List'
            subtitle='Packages'
            className='text-sm-left'
          />
        </Row>
        <Row>
          <Col>
            <Card className='mb-4'>
              <Card.Header className='border-bottom'>
                <Row>
                  <Col>
                    <h6 className='m-0'>Recent Packages</h6>
                  </Col>
                  <Col>
                    <div className='d-flex justify-content-end'>
                      <OpenNewPackageModal size='md' variant='primary' />
                    </div>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className='p-0 pb-3'>
                {
                  !loading && <PackagesTable data={data.getPackages} columns={columns} />
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

export default Packages
