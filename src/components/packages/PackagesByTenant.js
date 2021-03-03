import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import { Redirect } from 'react-router-dom'
import { Table, Spinner } from 'react-bootstrap'

import { GET_PACKAGE_BY_TENANT_ID } from '../../utils/graphql'
import ChangePackageStatus from './ChangePackageStatus'

export default function PackagesByTenant ({
  tenantId
}) {
  if (!tenantId) return <Redirect to='/error' state='ERROR. No tenant id provided' />

  const { loading, data } = useQuery(GET_PACKAGE_BY_TENANT_ID, {
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

  return (
    !loading && data.getPackagesByTenantId.length
      ? (
        <Table responsive striped bordered hover className='mt-2'>
          <thead>
            <tr>
              <th>Package Id</th>
              <th>Received Date</th>
              <th>Received By Employee</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              data.getPackagesByTenantId.map((tenantPackages) => {
                const {
                  id,
                  receivedDate,
                  receivedByEmployeeId,
                  receivedByEmployee,
                  recipientName,
                  recipientId,
                  notes,
                  isDelivered,
                  delivery
                } = tenantPackages
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{moment(receivedDate).format('LLL')}</td>
                    <td>{receivedByEmployee}</td>
                    <td>
                      <ChangePackageStatus
                        tenantId={tenantId}
                        packageId={id}
                        isDelivered={isDelivered}
                      />
                    </td>
                    <td>{notes}</td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
        )
      : (
        <h6 className='mt-4 p-2'> <strong>No Packages Registered yet</strong></h6>
        )
  )
}
