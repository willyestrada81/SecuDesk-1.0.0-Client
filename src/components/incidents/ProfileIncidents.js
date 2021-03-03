import React from 'react'
import { Card, Col, Dropdown, Row } from 'react-bootstrap'
import NewIncidentForm from '../incidents/NewIncidentForm'
import NewVisitLogForm from '../visitorsLogs/NewVisitLogForm'
import TabLayout from '../common/TabLayout'
import IncidentLogs from './IncidentLogs'
import VisitorsLogs from '../visitorsLogs/VisitorsLogs'
import PackagesByTenant from '../packages/PackagesByTenant'
import NewPackageForm from '../packages/NewPackageForm'

export default function ProfileIncidents ({
  incidentLogs,
  tenantId,
  tenantName,
  bannedVisitors,
  permanentVisitors
}) {
  const components = [
    {
      component: (
        <VisitorsLogs
          key='visitors'
          tenantId={tenantId}
          bannedVisitors={bannedVisitors}
          permanentVisitors={permanentVisitors}
        />
      ),
      title: 'visitors'
    },
    {
      component: <IncidentLogs key='incidents' incidentLogs={incidentLogs} />,
      title: 'incidents'
    },
    {
      component: <PackagesByTenant key='packages' tenantId={tenantId} />,
      title: 'packages'
    }
  ]

  return (
    <Card className='mb-4'>
      <Card.Header className='p-0'>
        <Row>
          <Col>
            <h6 className='m-0'>{`${tenantName}'s Incidents`}</h6>
          </Col>
          <Col>
            <div className='d-flex justify-content-end'>
              <Dropdown>
                <Dropdown.Toggle
                  variant='primary'
                  id='addTenantLog'
                  className='pl-2'
                >
                  <span>
                    ADD
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='22'
                      height='22'
                      fill='currentColor'
                      className='bi bi-plus pl-2'
                      viewBox='0 0 16 18'
                    >
                      <path d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z' />
                    </svg>
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <NewIncidentForm
                    tenantId={tenantId}
                    tenantName={tenantName}
                    buttonText='New Incident'
                    showAsLink
                  />
                  <NewVisitLogForm
                    tenantId={tenantId}
                    tenantName={tenantName}
                    buttonText='Log new visit'
                    size='md'
                    variant='link'
                  />
                  <NewPackageForm
                    tenantId={tenantId}
                    tenantName={tenantName}
                    buttonText='Log new package'
                    showAsLink
                  />
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body className='p-0 pb-3'>
        <TabLayout components={components} />
      </Card.Body>
    </Card>
  )
}
