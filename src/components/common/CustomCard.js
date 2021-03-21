import React from 'react'

import { Card } from 'react-bootstrap'

export default function CustomCard ({ cardClass, cardBodyClass, title, content, component }) {
  return (
    <Card className={cardClass}>
      <Card.Body className={cardBodyClass}>
        <h5 className='text-primary'>{title}</h5>
        <p className='text-secondary text-md'>{content}</p>
        {component && component}
      </Card.Body>
    </Card>
  )
}
