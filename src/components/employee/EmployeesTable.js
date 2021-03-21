import React from 'react'
import SingleEmployee from './SingleEmployee'

export default function EmployeesTable ({ data, columns }) {
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
          data.map((employee, index) => {
            return <SingleEmployee employee={employee} key={index} />
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
