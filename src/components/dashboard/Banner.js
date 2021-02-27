import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'

export default function Banner ({ bannerTextMain, bannerText }) {
  return (
    <Row className='mt-3'>
      <Col auto='true'>
        <Card className='mb-3' fluid>
          <Card.Body className='p-3'>
            <p className='fs--1 mb-0'>
              {bannerTextMain}{' '}
              <strong>{bannerText}</strong>
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
