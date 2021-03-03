import React from 'react'
import SingleTenant from './SingleTenant'

export default function TenantsTable ({ data, columns }) {
  if (data.length) {
    return (
      <table className='table mb-0'>
        <thead className='bg-light'>
          <tr>
            {
              columns.map((col, index) => {
                return (
                  <th scope='col' className='border-0 text-center' key={index}>
                    {col}
                  </th>
                )
              })
            }
          </tr>
        </thead>
        {
          data.map((tenant, index) => {
            return <SingleTenant tenant={tenant} key={index} />
          })
        }
      </table>
    )
  } else {
    return (
      <h6 className='color-gray mt-2'>No residents registered</h6>
    )
  }
}
