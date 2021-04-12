import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { Redirect } from 'react-router-dom'

import { Image, Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useQuery } from '@apollo/react-hooks'

import { GET_TENANT_BY_ID } from '../utils/graphql'
import PageTitle from '../components/common/PageTitle'
import ProfileIncidents from '../components/incidents/ProfileIncidents'

function Tenant (props) {
  const { user } = useContext(AuthContext)

  if (user) {
    if (props.match.params.id) {
      const tenantId = props.match.params.id

      const { loading, error, data } = useQuery(GET_TENANT_BY_ID, {
        variables: {
          tenantId
        }
      })

      if (loading) return <p>loading</p>
      if (error) return <Redirect to='/error' />
      return (
        !loading && (
          <Container fluid className='main-content-container px-4'>
            <Row noGutters className='page-header py-4'>
              <PageTitle
                sm='4'
                title='Resident Profile'
                subtitle='Resident'
                className='text-sm-left'
              />
            </Row>
            <Row>
              <Col sm={12}>
                <Card>
                  <Card.Header className='border-bottom'>
                    <Row>
                      <Col sm={1.5}>

                        <Image
                          src={data.getTenantById.tenantProfilePhoto}
                          style={{ height: '80px' }}
                          alt=''
                          className='rounded-circle'
                        />
                      </Col>
                      <Col sm={2}>
                        <h4 className='m-0'>{`${data.getTenantById.tenantFirstName} ${data.getTenantById.tenantLastName}`}</h4>
                      </Col>
                      <Col>
                        <div className='d-flex justify-content-end'>
                          <Button
                            className='btn btn-info'
                            to={{
                              pathname: '#',
                              state: {
                                data: data.getTenantById
                              }
                            }}
                          >
                            Edit Resident Profile
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Header>
                  <Card.Body>

                    <Row className='p-4'>
                      <Col>
                        <Card.Subtitle className='mb-2 mt-1 text-muted'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fillRule='currentColor'
                            className='bi bi-envelope-fill mr-2'
                            viewBox='0 0 16 16'
                          >
                            <path d='M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z' />
                          </svg>
                          {data.getTenantById.tenantEmail}
                        </Card.Subtitle>
                        <div className='mb-1 text-muted'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fillRule='currentColor'
                            className='bi bi-telephone-fill mr-2'
                            viewBox='0 0 16 16'
                          >
                            <path
                              fillRule='evenodd'
                              d='M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z'
                            />
                          </svg>
                          <strong>Phone:</strong>
                          {data.getTenantById.tenantPhone}
                        </div>
                        <div className='mb-1'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fillRule='currentColor'
                            className='bi bi-house-door-fill mr-2'
                            viewBox='0 0 16 16'
                          >
                            <path d='M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z' />
                          </svg>
                          <strong>Apt/Address:</strong>
                          {data.getTenantById.apartment}
                        </div>
                        <div className='mb-1'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fillRule='currentColor'
                            className='bi bi-people-fill mr-2'
                            viewBox='0 0 16 16'
                          >
                            <path d='M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
                            <path
                              fillRule='evenodd'
                              d='M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z'
                            />
                            <path d='M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z' />
                          </svg>
                          <strong>Resident since:</strong>
                        </div>
                      </Col>
                      <Col
                        className='text-center'
                        style={{ alignSelf: 'center' }}
                      >
                        <div>
                          <p className='text-muted mb-0 mt-3'>
                            Today's Incidents
                          </p>
                          <h2 className='font-weight-normal mb-3'>
                            <small className='mdi mdi-checkbox-blank-circle text-success align-middle mr-1' />
                            <span>{data.getTenantById.incidentCount}</span>
                          </h2>
                        </div>
                      </Col>
                      <Col
                        className='text-center'
                        style={{ alignSelf: 'center' }}
                      >
                        <div>
                          <p className='text-muted mb-0 mt-3'>
                            Today's Incidents
                          </p>
                          <h2 className='font-weight-normal mb-3'>
                            <small className='mdi mdi-checkbox-blank-circle text-success align-middle mr-1' />
                          </h2>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className='mt-4'>
              <Col>
                <ProfileIncidents
                  incidentLogs={data.getTenantById.incidentLogs}
                  tenantId={tenantId}
                  tenantName={`${data.getTenantById.tenantFirstName} ${data.getTenantById.tenantLastName}`}
                  bannedVisitors={data.getTenantById.bannedVisitors}
                  permanentVisitors={data.getTenantById.permanentVisitors}
                />
              </Col>
            </Row>
          </Container>
        )
      )
    }
  } else {
    return <Redirect to='/login' />
  }
}

export default Tenant
