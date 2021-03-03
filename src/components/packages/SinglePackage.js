import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import ChangePackageStatus from './ChangePackageStatus'

export default function SinglePackage ({ singlePackage }) {
  const {
    id,
    receivedDate,
    receivedByEmployeeId,
    receivedByEmployee,
    recipientName,
    recipientId,
    notes,
    isDelivered
  } = singlePackage

  return (
    <tbody
      key={id}
    >
      <tr>
        <td>{id}</td>
        <td>{moment(receivedDate).format('MM-DD-YYYY')}</td>
        <td>{receivedByEmployee}</td>
        <td>
          <Link
            to={{
              pathname: `/tenant/${recipientId}`
            }}
          >
            {recipientName}
          </Link>
        </td>
        <td>
          <ChangePackageStatus
            tenantId={recipientId}
            packageId={id}
            isDelivered={isDelivered}
          />
        </td>
        <td>{notes}</td>
      </tr>
    </tbody>
  )
}
