import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import { Button, Modal, Spinner } from 'react-bootstrap'

import { GET_VISITS_LOGS_BY_TENANT_ID } from '../../utils/graphql'

export default function VisitsLogsModal ({ tenantId, visitorId }) {
  const [lgShow, setLgShow] = useState(false)

  const handleCloseModal = () => {
    setLgShow(false)
  }

  const { loading, data } = useQuery(GET_VISITS_LOGS_BY_TENANT_ID, {
    variables: {
      tenantId,
      visitorId
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
    <>
      <span onClick={() => setLgShow(true)} className='text-center'>
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='primary' className='bi bi-arrow-up-right-square-fill' viewBox='0 0 16 16'>
          <path d='M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803L10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z' />
        </svg>
      </span>
      <Modal
        size='md'
        show={lgShow}
        onHide={handleCloseModal}
        aria-labelledby='visitor-modal'
      >
        <Modal.Header className='h5' closeButton>Visits Logs</Modal.Header>
        <Modal.Body>
          {
            !loading && data.getTenantVisitLogs.visitsLogs.filter(log => {
              return log.tenantId === tenantId
            }).map((date, index) => {
              return (
                <p key={index} className='text-success'>
                  <strong>{moment(date.visitDate).format('LLL')}</strong>
                </p>
              )
            })
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
