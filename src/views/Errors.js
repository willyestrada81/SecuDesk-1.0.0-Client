import React from 'react'
import { Container, Button } from 'shards-react'

export default function Errors (props) {
  function goBack () {
    props.history.goBack()
  }
  return (
    <Container fluid className='main-content-container px-4 pb-4'>
      <div className='error'>
        <div className='error__content'>
          <h2>500</h2>
          <h3>Something went wrong!</h3>
          <p>{props.location.state
            ? props.location.state.error
            : 'There was a problem on our end. Please try again later.'}
          </p>
          <Button pill onClick={goBack}>&larr; Go Back</Button>
        </div>
      </div>
    </Container>
  )
}
