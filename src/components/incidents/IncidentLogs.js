import React from 'react'
import moment from 'moment'
import { Table } from 'react-bootstrap'

export default function IncidentLogs ({ incidentLogs }) {
  return incidentLogs && incidentLogs.length
    ? (
      <Table responsive striped bordered hover className='mt-2'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Incident Type</th>
            <th>Created by</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {incidentLogs.map((incident) => {
            const { id, createdAt, createdBy, incidentType, notes } = incident
            return (
              <tr key={id}>
                <td>{moment(createdAt).format('LLL')}</td>
                <td>{incidentType}</td>
                <td>{createdBy}</td>
                <td>{notes}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      )
    : (
      <h6 className='mt-4 p-2'> <strong>No Incidents Logs</strong></h6>
      )
}
