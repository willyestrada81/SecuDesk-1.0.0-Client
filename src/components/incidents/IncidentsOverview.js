import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Card, Spinner } from 'react-bootstrap'
import moment from 'moment'
import { FETCH_LOGS_QUERY } from '../../utils/graphql'

// import RangeDatePicker from '../common/RangeDatePicker'

export default function IncidentsOverview () {
  const { loading, data } = useQuery(FETCH_LOGS_QUERY, {
    pollInterval: 10000,
    onError (err) {
      console.log(err)
    }
  })
  if (!loading && !data) {
    return (
      <Spinner animation='border' role='status' className='mb-4'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    )
  }
  return (
    <Card className='h-100'>
      <Card.Header className='border-bottom'>
        <h5 className='m-0'>Latest Incidents</h5>
      </Card.Header>
      <Card.Body className='pt-0'>
        {/* <Row className='border-bottom py-2 bg-light'>
          <Col sm='6' className='d-flex mb-2 mb-sm-0'>
            <RangeDatePicker />
          </Col>
          <Col>
            <Button
              size='sm'
              className='d-flex btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0'
            >
              View Full Report &rarr;
            </Button>
          </Col>
        </Row> */}
        <table className='table mb-0'>
          <thead className='bg-light'>
            <tr>
              <th scope='col' className='border-0'>
                Incident Type
              </th>
              <th scope='col' className='border-0'>
                Created at
              </th>
              <th scope='col' className='border-0'>
                Created by
              </th>
            </tr>
          </thead>
          {!loading && data.getIncidentLogs
            ? (data.getIncidentLogs.slice(0, 7).map((log, index) => {
                const { id, incidentType, createdAt, createdBy } = log
                return (
                  <tbody key={id}>
                    <tr>
                      <td>{incidentType}</td>
                      <td>{moment(createdAt).format('LLL')}</td>
                      <td>{createdBy}</td>
                    </tr>
                  </tbody>
                )
              })
              )
            : (
              <tbody>
                <tr>
                  <td>
                    <strong className='text-muted d-block m-2'>
                      No data history to display
                    </strong>
                  </td>
                </tr>
              </tbody>
              )}
        </table>
      </Card.Body>
    </Card>
  )
}
