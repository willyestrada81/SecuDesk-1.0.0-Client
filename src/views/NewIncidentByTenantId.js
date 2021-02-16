import React, { useState } from "react";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  FormTextarea
} from "shards-react";

import { Form, Button, Row, Col, FormGroup } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import PageTitle from "../components/common/PageTitle";

export default function NewIncidentByTenantId(props) {
  const id =
    typeof props.match === "undefined" ? props.tenantId : props.match.params.id;
  const tenant_firstName =
    typeof props.match === "undefined"
      ? props.tenant_firstName
      : props.location.state.tenant_firstName;
  const tenant_lastName =
    typeof props.match === "undefined"
      ? props.tenant_lastName
      : props.location.state.tenant_lastName;

  // const commentInputRef = useRef(null);
  // const [errors, setErrors] = useState({});

  const [incidentType, setIncident] = useState("");

  const [submitIncidentLog] = useMutation(
    SUBMIT_INCIDENT_MUTATION,
    {
      variables: {
        tenantId: id,
        incidentType
      },
      onError(err) {
        console.log(err.networkError);
      }
    }
  );
  const submitIncident = () => {
    submitIncidentLog();
  };
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Log a New Incident"
          subtitle="New Incident"
          className="text-sm-left mb-3"
        />
      </Row>
      <Row>
        <Col lg="4" md="6" sm="12" className="mb-4">
          <Card small className="h-100">
            <CardHeader className="border-bottom">
              <h6 className="m-0">
                {`New Incident for ${tenant_firstName} ${tenant_lastName}`}{" "}
              </h6>
            </CardHeader>

            <CardBody className="d-flex flex-column">
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  submitIncident();
                }}
                noValidate
                className="quick-post-form"
              >
                <Form.Control
                  as="select"
                  className="mr-sm-2 mb-2"
                  id="inlineFormCustomSelect"
                  custom
                  onChange={event => setIncident(event.target.value)}
                >
                  <option value="">Choose...</option>
                  <option value="Visitor">Visitor</option>
                  <option value="Repairs">Repairs</option>
                  <option value="Delivery">Delivery</option>
                </Form.Control>

                <FormGroup>
                  <FormTextarea
                  placeholder="Notes..."
                  />
                </FormGroup>

                <FormGroup className="mb-0">
                  <Button
                    theme="accent"
                    type="submit"
                    disabled={incidentType.trim() === ""}
                  >
                    Submit
                  </Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

const SUBMIT_INCIDENT_MUTATION = gql`
  mutation createLog($tenantId: String!, $incidentType: String!) {
    createIncidentLog(tenantId: $tenantId, incidentType: $incidentType) {
      id
    }
  }
`;
