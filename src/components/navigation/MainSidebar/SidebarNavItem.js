import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SidebarNavItem ({ item }) {
  return (
    <NavLink to={item.to} className='p-3 mb-1 text-muted' activeClassName='text-primary bold'>
      {item.htmlBefore && (
        <div
          className='d-inline-block item-icon-wrapper'
          dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
        />
      )}
      {item.title && <span className='ml-1 text-uppercase'>{item.title}</span>}
    </NavLink>
  )
}
