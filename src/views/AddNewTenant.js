import React, { useState, useContext } from "react";
import { Container } from "shards-react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";

import PageTitle from "../components/common/PageTitle";

import { useForm } from "../utils/hooks";

function AddNewTenant() {
  let message;
  let tenant_profilePhoto;

  const { user } = useContext(AuthContext);

  const [file, setFile] = useState("");
  const [submitFiles, { loading, data, error }] = useMutation(UPLOAD_FILE, {
    variables: {
      file: file,
    },
    onError(err) {
      console.log(err.networkError);
    }
  });

  if (data) {
    tenant_profilePhoto = data.singleUpload.location
    message = (
      <Alert key="message" variant="success">
        File uploaded successfully!
      </Alert>
    );
  }
  if (error) {
    message = (
      <Alert key="message" variant="danger">
        Something went wrong, please try again!
      </Alert>
    );
  }

  const submitFileToUpload = () => {
    submitFiles();
  };

  const [errors, setErrors] = useState({});
  console.log("LOCATION", tenant_profilePhoto)
  const { onChange, onSubmit, values } = useForm(createTenant, {
    tenant_firstName: "",
    tenant_lastName: "",
    tenant_DOB: "",
    apartment: "",
    moveinDate: "",
    tenant_phone: "",
    tenant_email: "",
    tenant_profilePhoto: ""
  });

  const [addTenant] = useMutation(CREATE_TENANT, {
    onError(err) {
      // err.graphQLErrors[0].length &&
      //   setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    onCompleted() {
      redirect();
    },
    variables: {...values, tenant_profilePhoto},
  });

  function createTenant() {
    addTenant();
    redirect();
  }

  function redirect() {
    return <Redirect to="/tenants" />;
  }

  if (user) {
  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Add New Resident"
          subtitle="New Resident"
          className="text-sm-left"
        />
      </Row>
<Row>
<Col lg="4">
<Form
      onSubmit={(e) => {
        e.preventDefault();
        submitFileToUpload();
      }}
      noValidate
      className="card"
    >
      <Form.Label column sm="4">
        <strong className="text-muted">Profile Photo</strong>
      </Form.Label>
      <Form.File
        name={"document"}
        type={"file"}
        onChange={({ target: { files } }) => {
          setFile(files[0]);
        }}
      />
      <Form.Group className="mb-0 mt-4">
        <Button theme="accent" type="submit" disabled={!file}>
          {loading ? "Loading…" : "Upload"}
        </Button>
      </Form.Group>
<Form.Group className="mt-6">
Sucessss
      {message}
</Form.Group>

    </Form>
      </Col>
      <Col lg="8">
      <Form
        onSubmit={onSubmit}
        noValidate
        className="card p-10"
      >
        <Form.Row>
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label column sm="4">
              <strong className="text-muted">First Name</strong>
            </Form.Label>
            <Form.Control
              placeholder="John.."
              name="tenant_firstName"
              type="text"
              value={values.tenant_firstName}
              error={errors.tenant_firstName || ""}
              onChange={onChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label column sm="4">
              <strong className="text-muted">Last Name</strong>
            </Form.Label>
            <Form.Control
              placeholder="Doe.."
              name="tenant_lastName"
              type="text"
              value={values.tenant_lastName}
              error={errors.tenant_lastName || ""}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridDOB">
            <Form.Label column sm="6">
              <strong className="text-muted">Date of birth</strong>
            </Form.Label>
            <Form.Control
              name="tenant_DOB"
              type="date"
              value={values.tenant_DOB}
              error={errors.tenant_DOB || ""}
              onChange={onChange}
              required
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label column sm="4">
              <strong className="text-muted">Email</strong>
            </Form.Label>
            <Form.Control
              placeholder="john.doe@gmail.com"
              name="tenant_email"
              type="email"
              value={values.tenant_email}
              error={errors.tenant_email || ""}
              onChange={onChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPhone">
            <Form.Label column sm="4">
              <strong className="text-muted">Phone</strong>
            </Form.Label>
            <Form.Control
              placeholder="555-555-5555"
              name="tenant_phone"
              type="phone"
              value={values.tenant_phone}
              error={errors.tenant_phone || ""}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridApartment">
            <Form.Label column sm="4">
              <strong className="text-muted">Apartment</strong>
            </Form.Label>
            <Form.Control
              placeholder="111"
              name="apartment"
              type="number"
              value={values.apartment}
              error={errors.apartment || ""}
              onChange={onChange}
              required
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
        <Form.Group as={Col} controlId="formGridMoveInDate">
            <Form.Label column sm="4">
              <strong className="text-muted">Move in date</strong>
            </Form.Label>
            <Form.Control
              label="Move in Date"
              name="moveinDate"
              type="date"
              value={values.moveinDate}
              error={errors.moveinDate || ""}
              onChange={onChange}
              required
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Row>
      </Form>
      </Col>
</Row>
      
      
    </Container>
  )
      }else {
        return <Redirect to="/login" />;
      };
}

const CREATE_TENANT = gql`
  mutation(
    $tenant_firstName: String!
    $tenant_lastName: String!
    $tenant_DOB: String!
    $apartment: String!
    $moveinDate: String!
    $tenant_phone: String!
    $tenant_email: String!
    $tenant_profilePhoto: String
  ) {
    registerTenant(
      registerTenantInput: {
        tenant_firstName: $tenant_firstName
        tenant_lastName: $tenant_lastName
        tenant_DOB: $tenant_DOB
        apartment: $apartment
        moveinDate: $moveinDate
        tenant_phone: $tenant_phone
        tenant_email: $tenant_email
        tenant_profilePhoto: $tenant_profilePhoto
      }
    ) {
      id
      tenant_firstName
      tenant_lastName
      tenant_DOB
      apartment
      moveinDate
      tenant_phone
      tenant_email
      tenant_profilePhoto
    }
  }
`;

const UPLOAD_FILE = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
      location
    }
  }
`;
export default AddNewTenant;
