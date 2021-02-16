import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withRouter } from "react-router";

import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput
} from "shards-react";

function NavbarSearch(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const [submitSearch] = useMutation(SEARCH_TENANT, {
    variables: {
      filter: searchTerm
    },
    onError(err) {
      console.log(err.networkError);
    },
    onCompleted(data) {
      props.history.push('/search-result', { data })
    }
  });
  const submitQuery = () => {
    submitSearch();
    setSearchTerm('');
  };

  return (
    <Form
      className="main-navbar__search w-100 d-none d-md-flex d-lg-flex"
      onSubmit={e => {
        e.preventDefault();
        submitQuery();
      }}
      noValidate
    >
      <InputGroup seamless className="ml-3">
        <InputGroupAddon type="prepend">
          <InputGroupText>
            <i className="material-icons">search</i>
          </InputGroupText>
        </InputGroupAddon>
        <FormInput
          className="navbar-search"
          placeholder="Search Residents by First Name, Last Name, Phone, Apt"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
          required
        />
      </InputGroup>
    </Form>
  );
}

const SEARCH_TENANT = gql`
  mutation searchTenants($filter: String!) {
    searchTenants(filter: $filter) {
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

export default withRouter(NavbarSearch);
