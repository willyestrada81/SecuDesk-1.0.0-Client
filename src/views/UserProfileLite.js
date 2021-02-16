import React, { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Container, Row, Col } from "shards-react";
import { Redirect } from "react-router-dom";

import { AuthContext } from "../context/auth";
import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";

function UserProfileLite() {
  const { user } = useContext(AuthContext);

  if (user) {
    const [getEmployee, { loading, data }] = useMutation(GET_EMPLOYEE_BY_ID, {
      variables: {
        employeeId: user.id
      },
      onError(err) {
        console.log(err.networkError);
      }
    });
    getEmployee()
    if (!loading && !data) {
      return <Redirect to="/error" />;
    }
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="User Profile"
            subtitle="Overview"
            md="12"
            className="ml-sm-auto mr-sm-auto"
          />
        </Row>
        <Row>
          <Col lg="4">
            {
              !loading && <UserDetails userDetails={data}/>
            }
            
          </Col>
          <Col lg="8">
            <UserAccountDetails />
          </Col>
        </Row>
      </Container>
    );
  } else {
    return <Redirect to="/login" />;
  }
}

const GET_EMPLOYEE_BY_ID = gql`
mutation getEemployeeById($employeeId: ID!) {
  getEmployeeById(employeeId: $employeeId){
    firstName
    lastName
    organization
    id
    email
    username
    isAdmin
    gender
    hireDate
    bio
    jobTitle
    address
    city
    state
    zip
    employee_profilePhoto
  }
}
`;
export default UserProfileLite;
