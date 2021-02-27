import React from 'react'
import { Card } from 'react-bootstrap'

function EmployeeSummary ({ employeeData }) {
  const {
    firstName,
    lastName,
    jobTitle,
    employeeProfilePhoto, // eslint-disable-line
    bio
  } = employeeData

  return (
    <Card className='mb-4 pt-3'>
      <Card.Header className='border-bottom text-center'>
        <div className='mb-3 mx-auto'>
          <img
            className='rounded-circle'
            src={employeeProfilePhoto} // eslint-disable-line
            alt={firstName}
            width='110'
          />
        </div>
        <h4 className='mb-0 mt-2'>{`${firstName} ${lastName}`}</h4>
        <span className='text-muted d-block mb-2'>{jobTitle}</span>
      </Card.Header>
      <Card.Body>
        <div className='mt-3 text-center'>
          <strong className='text-muted d-block mb-2'>
            Bio
          </strong>
          <p className='color-gray'>{bio}</p>
        </div>
      </Card.Body>
    </Card>
  )
};

export default EmployeeSummary
