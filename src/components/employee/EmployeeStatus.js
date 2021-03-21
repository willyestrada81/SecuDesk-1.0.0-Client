import React, { useState, useContext } from 'react'
import { Button, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap'

import { ToastMessageContext } from '../../context/toastMessage'
import AccountInvitationModal from './AccountInvitationModal'
import DeactivateEmployeeModal from './DeactivateEmployeeModal'

import { AuthContext } from '../../context/auth'

export default function EmployeeStatus ({
  employeeId,
  isActivated,
  isInactive,
  activationUrl
}) {
  const { user: { id } } = useContext(AuthContext)
  const { setMessage } = useContext(ToastMessageContext)

  const [buttonProps, setButtonProps] = useState({
    variant: isInactive
      ? 'danger'
      : isActivated
        ? 'success'
        : 'warning',
    title: isActivated && !isInactive
      ? 'Active'
      : isInactive
        ? 'Inactive'
        : 'Pending Activation'
  })

  const getActivationUrl = () => {
    return (typeof window !== 'undefined')
      ? window.location.protocol + '//' + window.location.host + activationUrl
      : activationUrl
  }

  const handleSuccess = (message, variant, title) => {
    setMessage({
      message,
      show: true,
      isError: false
    })
    setButtonProps({
      variant,
      title
    })
  }

  const hundleError = (error) => {
    setMessage({
      message: `Error. ${error || error.message}`,
      show: true,
      isError: true
    })
  }

  if (isInactive) {
    return (
      <Button
      // <DropdownButton
        as={ButtonGroup}
        id={`dropdown-variants-${buttonProps.title}`}
        variant={buttonProps.variant}
        size='sm'
        drop='right'
      >
        {buttonProps.title}
        {/* > */}
        {/* <Dropdown.Item eventKey='1' onClick={activateEmployee}>Make Permanent</Dropdown.Item>
        <Dropdown.Item eventKey='1' onClick={removeFromBan}>Remove from Banned</Dropdown.Item> */}
        {/* </DropdownButton> */}
      </Button>
    )
  }

  if (isActivated) {
    return (
      <DropdownButton
        as={ButtonGroup}
        id={`dropdown-variants-${buttonProps.title}`}
        variant={buttonProps.variant}
        title={buttonProps.title}
        size='sm'
        drop='right'
        disabled={id === employeeId}
      >
        <Dropdown.Item eventKey='1' className='text-danger'>
          <DeactivateEmployeeModal employeeId={employeeId} handleSuccess={handleSuccess} hundleError={hundleError} />
        </Dropdown.Item>
      </DropdownButton>
    )
  }
  return (
    <DropdownButton
      as={ButtonGroup}
      id={`dropdown-variants-${buttonProps.title}`}
      variant={buttonProps.variant}
      title={buttonProps.title}
      size='sm'
      drop='right'
    >
      <Dropdown.Item eventKey='1'>
        <AccountInvitationModal
          buttonText='Copy Invitation URL'
          title='Copy Invitation URL'
          size='sm'
          variant='link'
          activationUrl={getActivationUrl()}
        />
      </Dropdown.Item>
    </DropdownButton>
  )
}
