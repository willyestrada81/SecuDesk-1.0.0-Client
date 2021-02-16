import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Redirect, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Alert
} from "shards-react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import PageTitle from "../components/common/PageTitle";
import { Table } from "react-bootstrap";

function Incidents(props) {
  let incidentLogs, tenant_firstName, tenant_lastName, id;
  if (typeof props.location.state !== "undefined") {
    incidentLogs = props.location.state.incidentLogs;
    tenant_firstName = props.location.state.tenant_firstName;
    tenant_lastName = props.location.state.tenant_lastName;
    id = props.location.state.id;
  }

  const { user } = useContext(AuthContext);

  if (user) {
    if (incidentLogs) {
      return (
        <Container fluid className="main-content-container px-4">
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              title={"Incident Logs"}
              subtitle="Incidents"
              className="text-sm-left"
            />
          </Row>
          <Row>
            <Col>
              <Card small className="mb-4">
                <CardHeader className="border-bottom">
                  <Row>
                    <Col>
                      <h6 className="m-0">{`${tenant_firstName}'s Incidents`}</h6>
                    </Col>
                    <Col>
                      <div className="d-flex justify-content-end">
                        <Link
                          className="btn btn-info"
                          to={{
                            pathname: `/new-incident/${id}`,
                            state: {
                              tenant_firstName,
                              tenant_lastName
                            }
                          }}
                        >
                          Log a New Incident
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                  <Table responsive striped bordered hover>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Incident Type</th>
                        <th>Created by</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {incidentLogs.map((incident) => {
                        const {
                          id,
                          createdAt,
                          createdBy,
                          incidentType,
                          notes
                        } = incident;
                        return (
                          <tr key={id}>
                            <td>{moment(createdAt).format("LLL")}</td>
                            <td>{incidentType}</td>
                            <td>{createdBy}</td>
                            <td>{notes}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (
        <div>
          <Alert danger className="mb-2 alert danger">
            <i className="fa fa-info mx-2"></i> No incident logs found for this
            resident.
          </Alert>
          <Redirect to="/tenants" />
        </div>
      );
    }
  } else {
    return <Redirect to="/login" />;
  }
}
export default Incidents;
