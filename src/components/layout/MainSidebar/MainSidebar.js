import React, { useContext } from 'react'
import { Col } from 'shards-react'

import { AuthContext } from '../../../context/auth'
import SidebarMainNavbar from './SidebarMainNavbar'
import SidebarNavItems from './SidebarNavItems'

const MainSidebar = () => {
  const { user } = useContext(AuthContext)

  if (user) {
    return (
      <Col
        tag='aside'
        className='main-sidebar px-0 col-12'
        lg={{ size: 2 }}
        md={{ size: 3 }}
      >
        <SidebarMainNavbar />
        <SidebarNavItems />
      </Col>
    )
  } else {
    return (
      <div />
    )
  }
}

export default MainSidebar
