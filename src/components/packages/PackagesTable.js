import React from 'react'
import SinglePackage from './SinglePackage'

export default function PackagesTable ({ data, columns }) {
  if (data.length) {
    return (
      <table className='table mb-0'>
        <thead className='bg-light'>
          <tr>
            {
              columns.map((col, index) => {
                return (
                  <th scope='col' className='border-0' key={index}>
                    {col}
                  </th>
                )
              })
            }
          </tr>
        </thead>
        {
          data.map((singlePackage, index) => {
            return <SinglePackage singlePackage={singlePackage} key={index} />
          })
        }
      </table>
    )
  } else {
    return (
      <h6 className='color-gray mt-2'>No packages received yet.</h6>
    )
  }
}
