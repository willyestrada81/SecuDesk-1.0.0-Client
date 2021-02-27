import React from 'react'
import { Col } from 'react-bootstrap'

export default function StatsCard ({
  stats: { name, statNumber, percentage, since }
}) {
  const getPercentage = () => {
    if (percentage < 0) {
      return (
        <p className='mt-3 mb-0 text-muted text-sm'>
          <span className='text-danger mr-2'>
            <i className='fa fa-arrow-down' /> {`${percentage || '0'}%`}
          </span>{' '}
          <span className='text-nowrap'>{percentage === null ? 'No data last hour t compare' : since}</span>
        </p>
      )
    } else {
      return (
        <p className='mt-3 mb-0 text-muted text-sm'>
          <span className='text-success mr-2'>
            <i className='fa fa-arrow-up' /> {`${percentage || '0'}%`}
          </span>{' '}
          <span className='text-nowrap'>{percentage === null ? 'No data last hour to compare' : since}</span>
        </p>
      )
    }
  }
  return (
    <Col auto='true' className='p-1'>
      <div className='card-stats mb-4 mb-xl-0 card'>
        <div className='card-body'>
          <div className='row'>
            <div className='col'>
              <h6 className='text-uppercase text-muted mb-0 card-title'>
                {name}
              </h6>
              <span className='h2 font-weight-bold mb-0'>{statNumber}</span>
            </div>
            <div className='col-auto col'>
              <span className='text-success mr-2'>
                <i className='far fa-chart-bar' />
              </span>
            </div>
          </div>
          {getPercentage()}
        </div>
      </div>
    </Col>
  )
}
