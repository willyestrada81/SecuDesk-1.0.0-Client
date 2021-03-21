import React, { useState, useRef } from 'react'

import { Button, Form, Modal } from 'react-bootstrap'

export default function AccountInvitationModal ({
  activationUrl,
  variant,
  customClassName,
  size,
  title
}) {
  const [lgShow, setLgShow] = useState(false)

  const [copySuccess, setCopySuccess] = useState('')
  const textAreaRef = useRef(null)

  function copyToClipboard (e) {
    textAreaRef.current.select()
    document.execCommand('copy')
    e.target.focus()
    setCopySuccess('Copied!')
  }

  return (
    <>
      <Button
        onClick={() => setLgShow(true)}
        variant={variant}
        className={customClassName}
        size={size}
      >
        {title}
      </Button>
      <Modal
        size='lg'
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby='example-modal-sizes-title-lg'
      >
        <Modal.Header closeButton>{title}</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control ref={textAreaRef} value={activationUrl} readOnly />
          </Form>
          <div className='mt-2'>
            <p className='text-success'>{copySuccess}</p>
          </div>
          <Button variant='primary' onClick={copyToClipboard}>
            Copy
          </Button>
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
