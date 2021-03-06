import React from 'react'
import { Navbar } from 'react-bootstrap'

function SidebarMainNavbar () {
  return (
    <div className='main-navbar'>
      <Navbar
        className='align-items-stretch bg-white flex-md-nowrap border-bottom p-0'
        type='light'
      >
        <div className='d-table m-auto'>
          <img
            id='logo-img'
            className='d-inline-block align-top mr-1'
            style={{ maxWidth: '120px' }}
            src={require('../../../assets/images/secudesk-logo.png')}
            alt='SecuDesk Logo'
          />
        </div>
        {/* eslint-disable-next-line */}
        <a className="toggle-sidebar d-sm-inline d-md-none d-lg-none">
          <i className='material-icons'>&#xE5C4;</i>
        </a>
      </Navbar>
    </div>
  )
}

export default SidebarMainNavbar
