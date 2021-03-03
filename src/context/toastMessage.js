import React, { createContext, useState } from 'react'

export const ToastMessageContext = createContext()

export function ToastMessageProvider (props) {
  const [message, setMessage] = useState({
    message: null,
    show: false,
    isError: Boolean
  })

  return (
    <ToastMessageContext.Provider value={{ message, setMessage }}>
      {props.children}
    </ToastMessageContext.Provider>
  )
}
