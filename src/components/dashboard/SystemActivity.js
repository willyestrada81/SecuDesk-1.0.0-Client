import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'

import { GET_SYSTEM_ACTIVITIES } from '../../utils/graphql'
import { Card, Row, Col, Spinner } from 'react-bootstrap'

export default function SystemActivity () {
  const { loading, data } = useQuery(GET_SYSTEM_ACTIVITIES, {
    pollInterval: 10000,
    onError (err) {
      console.log(err)
    }
  })

  if (loading) return <Spinner animation='border' />

  let activities

  if (!loading && data.getSystemActivities) {
    const sortedActivities = data.getSystemActivities
      .slice()
      .sort((a, b) => moment(b.createdAt) - moment(a.createdAt))

    const sorted = sortedActivities.slice(0, 12).map((activity) => {
      return (
        <div item={activity} key={activity.id}>
          <div className='mb-2'>
            <div className='ml-3'>
              <p className='mb-1 mt-1 color-gray bold'>{activity.message}</p>
              <p className='fw-lighter lh-base color-light-gray light mb-0 inline mr-2 italics'>
                {activity.createdBy}
              </p>
              <p className='text muted color-light-gray light inline italics'>
                - {moment(activity.createdAt).fromNow()}
              </p>
            </div>
          </div>
          <hr className='border-100 m-1' />
        </div>
      )
    })
    activities = sorted
  }

  return (
    <Card
      style={{ boxShadow: 'none', padding: '0' }}
      text='dark'
    >
      <Card.Header>
        <h5 className='m-0'>System Activities</h5>
      </Card.Header>
      <Card.Body>
        {activities}
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col />
          <Col className='text-right view-report'>
            {/* eslint-disable-next-line */}
            <a href="#">View full report &rarr;</a>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  )
}
