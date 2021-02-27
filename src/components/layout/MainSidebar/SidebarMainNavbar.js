import React from 'react'
import { Navbar, NavbarBrand } from 'shards-react'

function SidebarMainNavbar () {
  return (
    <div className='main-navbar'>
      <Navbar
        className='align-items-stretch bg-white flex-md-nowrap border-bottom p-0'
        type='light'
      >
        <NavbarBrand
          className='w-100 mr-0'
          href='/'
          style={{ lineHeight: '25px' }}
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
        </NavbarBrand>
        {/* eslint-disable-next-line */}
        <a className="toggle-sidebar d-sm-inline d-md-none d-lg-none">
          <i className='material-icons'>&#xE5C4;</i>
        </a>
      </Navbar>
    </div>
  )
}

export default SidebarMainNavbar
