import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useMutation } from '@apollo/react-hooks'

import { SEARCH_TENANT } from '../../utils/graphql'

export default function SearchTenantForm (props) {
  const [searchTerm, setSearchTerm] = useState('')

  const [submitSearch] = useMutation(SEARCH_TENANT, {
    variables: {
      filter: searchTerm
    },
    onError (err) {
      console.log(err.networkError)
    },
    onCompleted (data) {
      props.setSearchResult(data)
      props.history.push('/search-result', { data })
    }
  })
  const submitQuery = () => {
    submitSearch()
    setSearchTerm('')
  }

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        submitQuery()
      }}
      noValidate
    >
      <Form.Row className='align-items-center mb-4'>
        <Col>
          <Form.Control
            placeholder='Search Residents by First Name, Last Name, Phone, Apt'
            name='searchForm'
            type='text'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            required
          />

        </Col>
        <Col>
          <Button type='submit' disabled={searchTerm.trim() === ''}>
            Submit
          </Button>
        </Col>
      </Form.Row>
    </Form>
  )
}
