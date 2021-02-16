import React from "react";
import TableRow from "./TableRow";

export default function Table({ tenants, columns,  }) {

  return (
    <table className="table mb-0">
      <thead className="bg-light">
        <tr>
          {
            columns.map((col, index) => {
              return (
                <th scope="col" className="border-0" key={index}>
                {col}
              </th>
              )
            })
          }
        </tr>
      </thead>
      {
        tenants.map((tenant, index) => {
          return <TableRow tenant={tenant} key={index} />;
        })}
    </table>
  );
}
