import React, { useState } from 'react'

import { Tabs, Tab } from 'react-bootstrap'

export default function TabLayout ({ components }) {
  const [key, setKey] = useState('visitors')

  return (
    <Tabs
      id='controlled-tab-example'
      className='tab-padding'
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      {!!components.length &&
        components.map((component, index) => {
          return (
            <Tab key={index} eventKey={component.title} title={component.title.toUpperCase()}>
              {component.component}
            </Tab>
          )
        })}
    </Tabs>
  )
}
