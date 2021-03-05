import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap'

import {
  BAN_VISITOR,
  MAKE_PERMANENT,
  REMOVE_BANNED_VISITOR,
  REMOVE_PERMANENT_VISITOR
} from '../../utils/graphql'
import { ToastMessageContext } from '../../context/toastMessage'

export default function ChangeVisitorStatus ({
  tenantId,
  visitorId,
  bannedVisitors,
  permanentVisitors
}) {
  const { setMessage } = useContext(ToastMessageContext)
  const isBanned = bannedVisitors.find(visitor => visitor.visitorId === visitorId)
  const isPermanent = permanentVisitors.find(visitor => visitor.visitorId === visitorId)

  const [buttonProps, setButtonProps] = useState({
    variant: isBanned && !!Object.keys(isBanned).length
      ? 'danger'
      : isPermanent && !!Object.keys(isPermanent).length
        ? 'success'
        : 'primary',
    title: isBanned && !!Object.keys(isBanned).length
      ? 'Banned'
      : isPermanent && !!Object.keys(isPermanent).length
        ? 'Permanent'
        : 'Regular'
  })

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

  const [submitBanVisitor] = useMutation(BAN_VISITOR, {
    variables: {
      tenantId,
      visitorId
    },
    onError (error) {
      console.log(error)
    },
    onCompleted () {
      handleSuccess(
        'Success. Visitor in now banned',
        'danger',
        'Banned'
      )
    }
  })

  const [submitPermanentVisitor] = useMutation(MAKE_PERMANENT, {
    variables: {
      tenantId,
      visitorId
    },
    onError (error) {
      console.log(error)
    },
    onCompleted () {
      handleSuccess(
        'Success. Visitor is now a permanent resident',
        'success',
        'Permanent'
      )
    }
  })

  const [removeFromBan] = useMutation(REMOVE_BANNED_VISITOR, {
    variables: {
      tenantId,
      visitorId
    },
    onError (error) {
      console.log(error)
    },
    onCompleted () {
      handleSuccess(
        'Success. Visitor is not Banned anymore',
        'primary',
        'Regular'
      )
    }
  })

  const [removeFromPermanent] = useMutation(REMOVE_PERMANENT_VISITOR, {
    variables: {
      tenantId,
      visitorId
    },
    onError (error) {
      console.log(error)
    },
    onCompleted () {
      handleSuccess(
        'Success. Visitor is not a permanent visitor anymore',
        'primary',
        'Regular'
      )
    }
  })

  if (isBanned) {
    return (
      <DropdownButton
        as={ButtonGroup}
        id={`dropdown-variants-${buttonProps.title}`}
        variant={buttonProps.variant}
        title={buttonProps.title}
        size='sm'
        drop='right'
      >
        <Dropdown.Item eventKey='1' onClick={submitPermanentVisitor}>Make Permanent</Dropdown.Item>
        <Dropdown.Item eventKey='1' onClick={removeFromBan}>Remove from Banned</Dropdown.Item>
      </DropdownButton>
    )
  }

  if (isPermanent) {
    return (
      <DropdownButton
        as={ButtonGroup}
        id={`dropdown-variants-${buttonProps.title}`}
        variant={buttonProps.variant}
        title={buttonProps.title}
        size='sm'
        drop='right'
      >
        <Dropdown.Item eventKey='1' onClick={submitBanVisitor}>Ban Visitor</Dropdown.Item>
        <Dropdown.Item eventKey='1' onClick={removeFromPermanent}>Remove from Permanent</Dropdown.Item>
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
      <Dropdown.Item eventKey='1' onClick={submitBanVisitor}>Ban Visitor</Dropdown.Item>
      <Dropdown.Item eventKey='2' onClick={submitPermanentVisitor}>Make Permanent</Dropdown.Item>
    </DropdownButton>
  )
}
