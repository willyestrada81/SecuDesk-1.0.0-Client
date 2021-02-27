import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap'

import { BAN_VISITOR, MAKE_PERMANENT, REMOVE_BANNED_VISITOR, REMOVE_PERMANENT_VISITOR } from '../../utils/graphql'

export default function ChangeVisitorStatus ({
  tenantId,
  visitorId,
  bannedVisitors,
  permanentVisitors
}) {
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

  const [submitBanVisitor] = useMutation(BAN_VISITOR, {
    variables: {
      tenantId,
      visitorId
    },
    onError (error) {
      console.log(error)
    },
    onCompleted () {
      setButtonProps({
        variant: 'danger',
        title: 'Banned'
      })
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
      setButtonProps({
        variant: 'success',
        title: 'Permanent'
      })
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
      setButtonProps({
        variant: 'primary',
        title: 'Regular'
      })
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
      setButtonProps({
        variant: 'primary',
        title: 'Regular'
      })
    }
  })

  // const banVisitor = () => {
  //   submitBanVisitor()
  // }

  // const makePermanent = () => {
  //   submitPermanentVisitor()
  // }

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
