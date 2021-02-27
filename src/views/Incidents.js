import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Container,
  Row,
  Col
} from 'react-bootstrap'

import { AuthContext } from '../context/auth'
import PageTitle from '../components/common/PageTitle'
import ProfileIncidents from '../components/incidents/ProfileIncidents'

function Incidents (props) {
  let incidentLogs, tenantFirstName, tenantLastName, id, bannedVisitors, permanentVisitors
  if (typeof props.location.state !== 'undefined') {
    incidentLogs = props.location.state.incidentLogs
    tenantFirstName = props.location.state.tenantFirstName
    tenantLastName = props.location.state.tenantLastName
    id = props.location.state.id
    bannedVisitors = props.location.state.bannedVisitors
    permanentVisitors = props.location.state.permanentVisitors
  }

  const { user } = useContext(AuthContext)

  if (user) {
    return (
      <Container fluid className='main-content-container px-4'>
        <Row noGutters className='page-header py-4'>
          <PageTitle
            sm='4'
            title='Incident Logs'
            subtitle='Incidents'
            className='text-sm-left'
          />
        </Row>
        <Row>
          <Col>
            <ProfileIncidents
              incidentLogs={incidentLogs}
              tenantId={id}
              tenantName={`${tenantFirstName} ${tenantLastName}`}
              permanentVisitors={permanentVisitors}
              bannedVisitors={bannedVisitors}
            />
          </Col>
        </Row>
      </Container>
    )
  } else {
    return <Redirect to='/login' />
  }
}
export default Incidents
