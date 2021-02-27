import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Image, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap'
import NewIncidentForm from '../incidents/NewIncidentForm'
import NewVisitorForm from '../visitorsLogs/NewVisitLogForm'

export default function TableRow ({ tenant }) {
  const {
    id,
    tenantFirstName,
    tenantLastName,
    apartment,
    moveinDate,
    tenantPhone,
    incidentLogs,
    tenantProfilePhoto,
    bannedVisitors,
    permanentVisitors
  } = tenant

  return (
    <tbody
      key={id}
      className='text-center'
    >
      <tr>
        <td>
          <Image
            src={tenantProfilePhoto}
            alt='tenant Avatar'
            roundedCircle
            className='tenant-avatar'
          />
        </td>
        <td>
          <Link
            to={{
              pathname: `/tenant/${id}`
            }}
          >
            {tenantFirstName}
          </Link>
        </td>
        <td>{tenantLastName}</td>
        <td>{apartment}</td>
        <td>{moment(moveinDate).format('MM-DD-YYYY')}</td>
        <td>{tenantPhone}</td>
        <td>
          <OverlayTrigger
            key='right'
            placement='right'
            overlay={
              <Tooltip id='tooltip-right'>
                <strong>See Visitors/Incidents Logs</strong>
              </Tooltip>
            }
          >
            <Link
              to={{
                pathname: '/incident-logs',
                state: {
                  id,
                  tenantFirstName,
                  tenantLastName,
                  incidentLogs,
                  bannedVisitors,
                  permanentVisitors
                }
              }}
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' className='bi bi-arrow-up-right-square-fill' viewBox='0 0 16 16'>
                <path d='M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803L10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z' />
              </svg>
            </Link>
          </OverlayTrigger>
        </td>
        <td className='text-center'>
          <Dropdown>
            <OverlayTrigger
              key='right'
              placement='right'
              overlay={
                <Tooltip id='tooltip-right'>
                  <strong>Add Visitor/Incident Log</strong>
                </Tooltip>
              }
            >
              <Dropdown.Toggle
                variant='link'
                id='addTenantLog'
                className='p-0'
              >
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    fill='currentColor'
                    className='bi bi-plus-square-fill'
                    viewBox='0 0 16 16'
                  >
                    <path d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z' />
                  </svg>
                </span>
              </Dropdown.Toggle>
            </OverlayTrigger>
            <Dropdown.Menu>
              <NewIncidentForm
                tenantId={id}
                tenantFirstName={tenantFirstName}
                buttonText='New Incident'
                showAsLink
              />
              <NewVisitorForm
                tenantId={tenant.id}
                tenantFirstName={tenant.tenantFirstName}
                buttonText='New Visitor'
                title='Add a Visitor'
                size='md'
                variant='link'
                showAsLink
              />
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    </tbody>
  )
}
