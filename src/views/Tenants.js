import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Redirect, Link } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import { AuthContext } from "../context/auth";
import PageTitle from "../components/common/PageTitle";
import Table from "../components/common/Table";

function Tenants() {
  const { user } = useContext(AuthContext);

  const columns = [
    "Resident",
    "First Name",
    "Last Name",
    "Apartment #",
    "Resident Since",
    "Phone",
    "Total of Incidents",
    "Add New Incident"
  ];

  if (user) {
    const { loading, data } = useQuery(FETCH_TENANTS_QUERY, {});
    if (!loading && typeof data === "undefined") {
      return <Redirect to="/error" />;
    }
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Resident Registry"
            subtitle="Registry"
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <Row>
                  <Col>
                    <h6 className="m-0">Active Residents</h6>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-end">
                      <Link
                        to="/new-tenant"
                        className="btn btn-info"
                        style={{ float: "right" }}
                      >
                        Add new Tenant
                      </Link>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                {
                  !loading && <Table tenants={data.getTenants} columns={columns}  />
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return <Redirect to="/login" />;
  }
}

const FETCH_TENANTS_QUERY = gql`
  {
    getTenants {
      id
      tenant_firstName
      tenant_lastName
      tenant_phone
      tenant_email
      tenant_DOB
      apartment
      moveinDate
      tenant_profilePhoto
      incident_logs {
        id
        incidentType
        createdAt
        createdBy
        notes
      }
      incidentCount
    }
  }
`;
export default Tenants;
