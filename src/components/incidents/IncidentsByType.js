import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Pie } from 'react-chartjs-2'
import moment from 'moment'

import { Card } from 'react-bootstrap'

import { GET_INCIDENT_CUSTOM_FIELDS, FETCH_LOGS_QUERY } from '../../utils/graphql'

export default function IncidentsByType () {
  const { loading, data } = useQuery(GET_INCIDENT_CUSTOM_FIELDS)
  const { loading: logsLoading, data: logsData } = useQuery(FETCH_LOGS_QUERY, {
    pollInterval: 10000,
    onError (err) {
      console.log(err)
    }
  })

  let customFields

  const incidentsByType = []

  if (!loading && data && data.getCustomFields && !logsLoading && logsData) {
    customFields = data.getCustomFields.map(field => field.fieldName)

    const incidentsLastDay = logsData.getIncidentLogs.filter(d => moment(d.createdAt).isAfter(moment().startOf('day')))

    const total = []

    for (let i = 0; i < customFields.length; i++) {
      const item = incidentsLastDay.filter(d => d.incidentType === customFields[i])
      total.push(item.length)
    }

    const totals = total.reduce((a, b) => a + b, 0)

    for (let i = 0; i < customFields.length; i++) {
      const item = incidentsLastDay.filter(d => d.incidentType === customFields[i])
      incidentsByType[i] = item.length === 0 ? 0 : ((item.length / totals) * 100).toFixed(2)
    }
  }

  const state = {
    labels: customFields,
    datasets: [
      {
        label: 'Incidents By Type',
        backgroundColor: [
          'rgb(0, 62, 128)',
          'rgb(0, 86, 179)',
          'rgb(0, 111, 230)',
          'rgb(26, 136, 255)',
          'rgb(77, 163, 255)'
        ],
        hoverBackgroundColor: [
          'rgb(77, 163, 255)',
          'rgb(26, 136, 255)',
          'rgb(0, 111, 230)',
          'rgb(0, 86, 179)',
          'rgb(0, 62, 128)'
        ],
        data: incidentsByType
      }
    ]
  }

  return (
    <Card className='h-100'>
      <Card.Header className='border-bottom pl-2'>
        <h5 className='m-0'>Incident By Types</h5>
      </Card.Header>
      <Card.Body className='d-flex py-0'>
        {(!incidentsByType.length)
          ? (<strong className='text-muted d-block m-2'>No data history to display</strong>)
          : (
            <Pie
              data={state}
              options={{
                title: {
                  display: true,
                  fontSize: 20
                },
                legend: {
                  display: true,
                  position: 'top'
                },
                maintainAspectRatio: false
              }}
              width={500}
              height={350}
            />
            )}
      </Card.Body>
      <Card.Footer className='border-top mt-2' />
    </Card>
  )
}
