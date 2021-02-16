import React, { useState } from "react";
import {
  Card,
  CardBody,
  FormTextarea
} from "shards-react";

import { Form, Button, Col, FormGroup } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export default function NewIncident({tenantId}) {
  const [errors, setErrors] = useState({});

  const [incidentType, setIncident] = useState("");

  const [
    submitIncidentLog,
    { loading, data  }
  ] = useMutation(SUBMIT_INCIDENT_MUTATION, {
    variables: {
      tenantId: tenantId,
      incidentType
    },
    onError(err) {
      console.log(err.networkError);
    }
  });
  const submitIncident = () => {
    submitIncidentLog();
  };
      return (
            <Col lg="6" sm="12" className="mb-4" key="1">
              <Card small className="card-post card-post--aside card-post--1">
                <CardBody>
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
                      <FormTextarea placeholder="Notes..." />
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
      );
}

const SUBMIT_INCIDENT_MUTATION = gql`
  mutation createLog($tenantId: ID!, $incidentType: String!) {
    createIncidentLog(tenantId: $tenantId, incidentType: $incidentType) {
      id
    }
  }
`;
