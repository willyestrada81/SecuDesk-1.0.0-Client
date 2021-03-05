import React, { useContext } from 'react'
import classNames from 'classnames'
import { Container, Navbar } from 'shards-react'

import NavbarSearch from './NavbarSearch'
import NavbarActions from './NavbarActions'
import { AuthContext } from '../../../context/auth'

const MainNavbar = () => {
  const classes = classNames(
    'main-navbar',
    'bg-white'
  )

  const { user } = useContext(AuthContext)

  if (user) {
    return (
      <div className={classes}>
        <Container className='p-0'>
          <Navbar type='light' className='align-items-stretch flex-md-nowrap p-0'>
            <NavbarSearch />
            <NavbarActions />
          </Navbar>
        </Container>
      </div>
    )
  } else {
    return (
      <div />
    )
  }
}

export default MainNavbar
