import React, { useContext } from 'react'
import { Toast } from 'react-bootstrap'
import { ToastMessageContext } from '../../context/toastMessage'

export default function ToastMessages () {
  const { message, setMessage } = useContext(ToastMessageContext)

  return (
    <div
      aria-live='polite'
      aria-atomic='true'
    >
      <div
        style={{
          position: 'absolute',
          top: '12%',
          right: '1.3%',
          zIndex: 20,
          minWidth: '19rem'
        }}
      >
        <Toast show={message.show} onClose={() => setMessage({ message: null, show: false })} delay={5000} autohide>
          <Toast.Header>
            <strong className='mr-auto'>System</strong>
          </Toast.Header>
          <Toast.Body className={`text-${message.isError ? 'danger' : 'success'} bold`}>{message.message}</Toast.Body>
        </Toast>
      </div>
    </div>
  )
}
