import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from 'moment'

import { Image } from "react-bootstrap";

export default function TableRow({tenant}) {
  const [showLink, setShowLink] = useState(false)
  const {
    id,
    tenant_firstName,
    tenant_lastName,
    apartment,
    moveinDate,
    tenant_phone,
    incidentCount,
    incident_logs,
    tenant_profilePhoto
  } = tenant

  return (
    <tbody key={id} onMouseEnter={() => {setShowLink(true)}} onMouseLeave={() => {setShowLink(false)}}>
      <tr>
        <td>
        <Image
              src={tenant_profilePhoto}
              alt="tenant Avatar"
              roundedCircle
              className="tenant-avatar"
            />
        </td>
        <td>{tenant_firstName}</td>
        <td>{tenant_lastName}</td>
        <td>{apartment}</td>
        <td>{moment(moveinDate).format("MM-DD-YYYY")}</td>
        <td>{tenant_phone}</td>
        {incidentCount === 0 ? (
          <td>{incidentCount}</td>
        ) : (
          <td>
            {
              <Link
                to={{
                  pathname: "/incident-logs",
                  state: {
                    id,
                    tenant_firstName,
                    tenant_lastName,
                    incidentLogs: incident_logs
                  }
                }}
              >
                {incidentCount}
              </Link>
            }
          </td>
        )}
        <td>
          { showLink &&
            <Link
              to={{
                pathname: `/new-incident/${id}`,
                state: {
                  tenant_firstName,
                  tenant_lastName
                }
              }}
            >
              New Incident
            </Link>
          }
        </td>
      </tr>
    </tbody>
  );
}