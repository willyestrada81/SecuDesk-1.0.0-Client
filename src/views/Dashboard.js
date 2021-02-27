import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'
import { Spinner, Card, Container, Row, Col } from 'react-bootstrap'

import { AuthContext } from '../context/auth'
import { FETCH_DASHBOARD } from '../utils/graphql'

import PageTitle from '../components/common/PageTitle'
import IncidentsByType from '../components/incidents/IncidentsByType'
import IncidentsOverview from '../components/incidents/IncidentsOverview'
import StatsCard from '../components/dashboard/StatsCard'
import SystemActivity from '../components/dashboard/SystemActivity'
import NewTenantForm from '../components/tenants/NewTenantForm'
import OpenIncidentModal from '../components/incidents/OpenIncidentModal'

import OpenModal from '../components/common/OpenModal'
import OpenVisitorModal from '../components/visitorsLogs/OpenVisitorModal'

function Dashboard () {
  const { user } = useContext(AuthContext)

  if (user) {
    const { loading, error, data } = useQuery(FETCH_DASHBOARD, {
      pollInterval: 10000,
      onError (err) {
        console.log(err)
      }
    })
    if (!loading && !data) {
      return (
        <Redirect
          to={{ pathname: '/error', state: { error: error.message } }}
        />
      )
    } else {
      const dashboard = () => {
        if (!loading) {
          const logs = data.getDashboard
          const {
            incidentsLastHour,
            incidentsBeforeLastHour,
            incidentsLast24Hours,
            incidentsBeforeLast24Hours,
            delivery,
            visitor,
            repairs,
            percentageOfIncreaseByHour,
            percentageOfIncreaseBy24Hours,
            percentageDelivery,
            percentageVisitor,
            percentageRepairs
          } = logs

          return (
            <Container fluid className='main-content-container px-4'>
              <Row noGutters className='page-header py-4'>
                <PageTitle
                  title='Dashboard'
                  subtitle='Dashboard'
                  className='text-sm-left mb-3'
                />
              </Row>
              <Row>
                <Col lg={12} xl={9}>
                  <Row>
                    <Col xl={4}>
                      <Card>
                        <Card.Title className='text-uppercase text-muted border-bottom pb-4 pl-2'>
                          Quick Links
                        </Card.Title>
                        <Card.Body>
                          <OpenModal
                            variant='link'
                            name='Create New Resident'
                            size='lg'
                            modalTitle='New Resident'
                            component={<NewTenantForm />}
                          />
                          <br />
                          <OpenIncidentModal size='lg' />
                          <OpenVisitorModal size='lg' variant='link' />
                          <br />
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xl={8}>
                      <Row>
                        <Col xl={6}>
                          <StatsCard
                            stats={{
                              name: 'Last Hour',
                              statNumber: incidentsLastHour.length,
                              percentage: percentageOfIncreaseByHour,
                              since: 'Since last hour'
                            }}
                          />
                          <StatsCard
                            stats={{
                              name: 'Today',
                              statNumber: incidentsLast24Hours.length,
                              percentage: percentageOfIncreaseBy24Hours,
                              since: 'Since yesterday'
                            }}
                          />
                        </Col>
                        <Col xl={6}>
                          <StatsCard
                            stats={{
                              name: 'Last Hour',
                              statNumber: incidentsLastHour.length,
                              percentage: percentageOfIncreaseByHour,
                              since: 'Since last hour'
                            }}
                          />
                          <StatsCard
                            stats={{
                              name: 'Last Hour',
                              statNumber: incidentsLastHour.length,
                              percentage: percentageOfIncreaseByHour,
                              since: 'Since last hour'
                            }}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className='mt-2'>
                    <Col xl={8}>
                      <IncidentsOverview
                        logs={[...visitor, ...repairs, ...delivery]}
                      />
                    </Col>
                    <Col xl={4}>
                      <IncidentsByType
                        chartData={{
                          title: 'Incidents By Types',
                          visitors: percentageVisitor,
                          deliveries: percentageDelivery,
                          repairs: percentageRepairs
                        }}
                        fullReport=''
                      />
                    </Col>
                  </Row>
                </Col>
                <Col lg={6} xl={3}>
                  <SystemActivity />
                </Col>
              </Row>
            </Container>
          )
        } else {
          return (
            <Spinner animation='border' role='status' className='mb-4'>
              <span className='sr-only'>Loading...</span>
            </Spinner>
          )
        }
      }

      return dashboard()
    }
  } else {
    return <Redirect to='/login' />
  }
}

export default Dashboard
