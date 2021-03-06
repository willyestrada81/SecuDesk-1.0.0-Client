import React, { useContext } from 'react'
import { Nav } from 'react-bootstrap'
import { AuthContext } from '../../../context/auth'

import SidebarNavItem from './SidebarNavItem'

function SidebarNavItems () {
  const { user } = useContext(AuthContext)
  const navItems = [
    {
      title: 'Dashboard',
      to: '/',
      htmlBefore: '<i class="material-icons">edit</i>',
      isSuperAdmin: false
    },
    {
      title: 'Residents',
      htmlBefore: '<i class="material-icons">apartment</i>',
      to: '/tenants',
      isSuperAdmin: false
    },
    {
      title: 'Packages',
      htmlBefore: '<i class="material-icons">local_shipping</i>',
      to: '/packages',
      isSuperAdmin: false
    },
    {
      title: 'Admin Panel',
      htmlBefore: '<i class="material-icons">settings</i>',
      to: '/admin-panel',
      isSuperAdmin: true
    }
  ]
  return (
    <div className=''>
      <Nav className='nav--no-borders flex-column ml-2 mt-2'>
        {navItems.map((item, idx) => (
          !user.isSuperAdmin && !item.isSuperAdmin &&
            <SidebarNavItem key={idx} item={item} />
        ))}
        {navItems.map((item, idx) => (
          user.isSuperAdmin && !item.isSuperAdmin &&
            <SidebarNavItem key={idx} item={item} />
        ))}
        {navItems.map((item, idx) => (
          user.isSuperAdmin && item.isSuperAdmin &&
            <SidebarNavItem key={idx} item={item} />
        ))}
      </Nav>
    </div>
  )
}

export default SidebarNavItems
