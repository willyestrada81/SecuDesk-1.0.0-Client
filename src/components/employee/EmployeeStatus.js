import React, { useState, useContext } from 'react'
import { Button, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap'

import { ToastMessageContext } from '../../context/toastMessage'
import AccountInvitationModal from './AccountInvitationModal'
import DeactivateEmployeeModal from './DeactivateEmployeeModal'

export default function EmployeeStatus ({
  employeeId,
  isActivated,
  isInactive,
  activationUrl
}) {
  const { setMessage } = useContext(ToastMessageContext)

  const [buttonProps, setButtonProps] = useState({
    variant: isInactive
      ? 'danger'
      : isActivated
        ? 'success'
        : 'warning',
    title: isActivated
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
      >
        <Dropdown.Item eventKey='1' className='text-danger'>
          <DeactivateEmployeeModal employeeId={employeeId} handleSuccess={handleSuccess} />
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
