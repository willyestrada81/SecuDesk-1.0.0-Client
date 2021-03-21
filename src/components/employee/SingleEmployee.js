import React from 'react'
import { Link } from 'react-router-dom'

import { Image, Dropdown } from 'react-bootstrap'
import ResetPasswordConfirmationModal from './ResetPasswordConfirmationModal'
import EmployeeStatus from './EmployeeStatus'

export default function SingleEmployee ({ employee }) {
  const {
    id,
    firstName,
    lastName,
    organization,
    email,
    mustResetPassword,
    isAdmin,
    createdAt,
    gender,
    hireDate,
    bio,
    jobTitle,
    address,
    city,
    state,
    zip,
    employeeProfilePhoto,
    activationUrl,
    isActivated,
    status: {
      isInactive
    }
  } = employee

  return (
    <tbody
      key={id}
    >
      <tr>
        <td>
          <Image
            src={employeeProfilePhoto}
            alt='tenant Avatar'
            roundedCircle
            className='tenant-avatar'
          />
        </td>
        <td>
          <Link
            to={{
              pathname: '/user-profile',
              state: {
                id
              }
            }}
          >
            {firstName}
          </Link>
        </td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td><EmployeeStatus employeeId={id} isActivated={isActivated} isInactive={isInactive} activationUrl={activationUrl } /></td>
        <td className='text-start'>
          <Dropdown>
            <Dropdown.Toggle
              variant='link'
              id='addTenantLog'
              className='p-0'
            >
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  className='bi bi-plus-square-fill'
                  viewBox='0 0 16 16'
                >
                  <path d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z' />
                </svg>
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <ResetPasswordConfirmationModal
                employeeId={id} employeeName={`${firstName} ${lastName}`}
              />
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    </tbody>
  )
}
