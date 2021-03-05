import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { withRouter } from 'react-router'
import { SEARCH_TENANT } from '../../../utils/graphql'

import {
  Form
} from 'react-bootstrap'

function NavbarSearch (props) {
  const [searchTerm, setSearchTerm] = useState('')

  const [submitSearch] = useMutation(SEARCH_TENANT, {
    variables: {
      filter: searchTerm
    },
    onError (err) {
      console.log(err.networkError)
    },
    onCompleted (data) {
      props.history.push('/search-result', { data })
    }
  })
  const submitQuery = () => {
    submitSearch()
    setSearchTerm('')
  }

  return (
    <Form
      className='main-navbar__search w-100 d-none d-md-flex d-lg-flex'
      onSubmit={e => {
        e.preventDefault()
        submitQuery()
      }}
      noValidate
    >
      <Form.Group className='ml-3 mt-2' style={{ width: '100%', display: 'flex' }}>
        <span className='input-group-text no-border'>
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-search' viewBox='0 0 16 16'>
            <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
          </svg>
        </span>
        <Form.Control
          className='navbar-search p-2'
          placeholder='Search Residents by First Name, Last Name, Phone, Apt'
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
          required
        />
      </Form.Group>
    </Form>
  )
}

export default withRouter(NavbarSearch)
