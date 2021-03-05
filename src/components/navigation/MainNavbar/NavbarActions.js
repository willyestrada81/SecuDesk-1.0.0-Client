import React, { useContext } from 'react'

import { Dropdown, Image } from 'react-bootstrap'
import { AuthContext } from '../../../context/auth'
import NewTenantForm from '../../tenants/NewTenantForm'
import OpenModal from '../../common/OpenModal'
import OpenIncidentModal from '../../incidents/OpenIncidentModal'
import OpenVisitorModal from '../../visitorsLogs/OpenVisitorModal'
import OpenNewPackageModal from '../../packages/OpenNewPackageModal'

function NavbarActions () {
  const { user, logout } = useContext(AuthContext)

  return (
    <>
      <Dropdown className='border-right p-2'>
        <Dropdown.Toggle variant='primary' id='quick-links'>
          CREATE
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='22'
              height='22'
              fill='currentColor'
              className='bi bi-plus'
              viewBox='0 0 16 18'
            >
              <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
            </svg>
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ minWidth: '200px' }}>
          <OpenModal
            variant='link'
            name='Create New Resident'
            size='md'
            modalTitle='New Resident'
            component={<NewTenantForm />}
          />
          <OpenIncidentModal size='md' />
          <OpenVisitorModal size='md' variant='link' />
          <OpenNewPackageModal size='md' variant='link' />
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant='link' id='user-settings'>
          <Image
            src={user.employeeProfilePhoto}
            alt='User Avatar'
            roundedCircle
            className='user-avatar'
          />
          <span className='pl-1'>
            {typeof user !== 'undefined' && user.firstName}
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            className='text-info'
            onClick={(event) => (window.location.href = '/user-profile')}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-gear'
              viewBox='0 0 16 16'
            >
              <path d='M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z' />
              <path d='M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z' />
            </svg>
            <span className='pl-2 text-info' to='/user-profile'>
              My Account
            </span>
          </Dropdown.Item>
          <Dropdown.Item className='text-danger' onClick={logout}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-box-arrow-in-right'
              viewBox='0 0 16 16'
            >
              <path
                fillRule='evenodd'
                d='M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z'
              />
              <path
                fillRule='evenodd'
                d='M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z'
              />
            </svg>
            <span className='pl-2'>Logout</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default NavbarActions
