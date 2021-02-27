import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import { Redirect } from 'react-router-dom'
import { Table, Spinner } from 'react-bootstrap'

import { GET_VISITORS_BY_TENANT_ID } from '../../utils/graphql'
// import VisitorStatus from './VisitorStatus'
import ChangeVisitorStatus from './ChangeVisitorStatus'

export default function VisitorsLogs ({
  tenantId,
  bannedVisitors,
  permanentVisitors
}) {
  if (!tenantId) return <Redirect to='/error' state='ERROR. No tenant id provided' />

  const { loading, data } = useQuery(GET_VISITORS_BY_TENANT_ID, {
    variables: {
      tenantId
    }
  })
  if (loading) {
    return (
      <Spinner
        as='span'
        animation='border'
        size='sm'
        role='status'
        aria-hidden='true'
      />
    )
  }

  if (!loading) console.log(data)
  return (
    !loading && data.getVisitorsByTenantId.length
      ? (
        <Table responsive striped bordered hover className='mt-2'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Status</th>
              <th>Date Created</th>
              <th>Notes</th>
              <th>Logged By Employee</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              data.getVisitorsByTenantId.map((visitors) => {
                const {
                  id,
                  visitorName,
                  visitorLastName,
                  createdBy,
                  notes,
                  createdAt
                } = visitors
                return (
                  <tr key={id}>
                    <td>{visitorName}</td>
                    <td>{visitorLastName}</td>
                    <td>
                      <ChangeVisitorStatus
                        tenantId={tenantId}
                        visitorId={id}
                        bannedVisitors={bannedVisitors}
                        permanentVisitors={permanentVisitors}
                      />
                    </td>
                    <td>{moment(createdAt).format('LLL')}</td>
                    <td>{notes}</td>
                    <td>{createdBy}</td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
        )
      : (
        <h6 className='mt-4 p-2'> <strong>No Visitors registered</strong></h6>
        )
  )
}
