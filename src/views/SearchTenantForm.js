import React, { useState, useContext } from "react";
import { Container, Card, CardHeader, CardBody } from "shards-react";

import { Form, Button, Row, Col, FormGroup } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";

import PageTitle from "../components/common/PageTitle";
import NewIncidentByTenantId from "./NewIncidentByTenantId";

export default function SearchTenantForm() {
  const { user } = useContext(AuthContext);
  // const commentInputRef = useRef(null);
  // const [errors, setErrors] = useState({});

  const [apartment, setApartment] = useState("");

  const [submitSearchTenant, { loading, data }] = useMutation(
    SEARCH_TENANT_BY_APARTMENT,
    {
      variables: {
        apartment
      },
      onError(err) {
        console.log(err.networkError);
      }
    }
  );
  const submitSearch = () => {
    submitSearchTenant();
  };

  if (user) {
    if (!loading && data) {
      const {
        id,
        tenant_firstName,
        tenant_lastName
      } = data.getTenantByApartment;
      return (
        <NewIncidentByTenantId
          tenantId={id}
          tenant_firstName={tenant_firstName}
          tenant_lastName={tenant_lastName}
        />
      );
    } else {
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
            <Col lg="6" sm="12" className="mb-4" key="1">
              <Card small className="h-100">
                <CardHeader className="border-bottom">
                  <h6 className="m-0">Search Resident by Apartement No.</h6>
                </CardHeader>

                <CardBody className="d-flex flex-column">
                  <Form
                    onSubmit={e => {
                      e.preventDefault();
                      submitSearch();
                    }}
                    noValidate
                    className="quick-post-form"
                  >
                    <Form.Group as={Col} controlId="formGridApartment">
                      <Form.Control
                        placeholder="123"
                        className="mt-3"
                        name="apartment"
                        type="text"
                        value={apartment}
                        onChange={event => setApartment(event.target.value)}
                        required
                      />
                    </Form.Group>

                    <FormGroup className="mb-0">
                      <Button theme="accent" type="submit">
                        {/* disabled={incidentType.trim() === ''} */}
                        Search
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
  } else {
    return <Redirect to="/" />;
  }
}

const SEARCH_TENANT_BY_APARTMENT = gql`
  mutation getTenantByApartment($apartment: String!) {
    getTenantByApartment(apartment: $apartment) {
      id
      tenant_firstName
      tenant_lastName
      tenant_DOB
      apartment
      moveinDate
      tenant_phone
      tenant_email
      tenant_profilePhoto
      incident_logs {
        id
        incidentType
        createdBy
      }
      incidentCount
    }
  }
`;
