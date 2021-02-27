import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import EmployeeDetailsFormReadOnly from './EmployeeDetailsFormReadOnly'
import CreateEmployeeModal from './CreateEmployeeModal'

const UserAccountDetails = ({ employeeData }) => (
  <Card className='mb-4'>
    <Card.Header className='border-bottom pl-2'>
      <Row>
        <Col>
          <h5 className='m-0'>Account Details</h5>
        </Col>
        <Col>
          <div className='d-flex justify-content-end'>
            <CreateEmployeeModal title='Update Account' customClassName='float-left' employeeData={employeeData} />
          </div>
        </Col>
      </Row>
    </Card.Header>
    <Card.Body>
      <EmployeeDetailsFormReadOnly employeeData={employeeData} />
    </Card.Body>
  </Card>
)

export default UserAccountDetails
