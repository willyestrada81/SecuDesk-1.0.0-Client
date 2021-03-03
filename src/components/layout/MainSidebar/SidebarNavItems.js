import React from 'react'
import { Nav } from 'shards-react'

import SidebarNavItem from './SidebarNavItem'

function SidebarNavItems () {
  const navItems = [
    {
      title: 'Dashboard',
      to: '/',
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ''
    },
    {
      title: 'Residents',
      htmlBefore: '<i class="material-icons">apartment</i>',
      to: '/tenants'
    },
    {
      title: 'Packages',
      htmlBefore: '<i class="material-icons">local_shipping</i>',
      to: '/packages'
    }
  ]

  return (
    <div className='nav-wrapper'>
      <Nav className='nav--no-borders flex-column'>
        {navItems.map((item, idx) => (
          <SidebarNavItem key={idx} item={item} />
        ))}
      </Nav>
    </div>
  )
}

export default SidebarNavItems
