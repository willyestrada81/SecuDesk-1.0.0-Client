import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function OpenModal ({ variant, name, size, modalTitle, component }) {
  const [lgShow, setLgShow] = useState(false)

  return (
    <>
      <Button onClick={() => setLgShow(true)} size={size} variant={variant}>{name}</Button>
      <Modal
        size='lg'
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby='modal'
      >
        <Modal.Header closeButton>
          <Modal.Title id='modal'>
            {modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {component}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setLgShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
