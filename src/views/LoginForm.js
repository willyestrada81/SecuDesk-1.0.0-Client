import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';

import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";

function LoginForm() {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: ""
  });

  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, { data: { login } }) {
      context.login(login);
    },
    onError(err) {
      setErrors(err);
    },
    variables: values
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="login-bg">
    <Container>
      <Row >
        <Col className="d-flex flex-direction: column justify-content-center">
          <Form  onSubmit={onSubmit} noValidate className="col-sm-4" style={{marginTop: "10%"}}>
            <div className="log-box">
              <Image src={require('../images/secudesk-logo.png')} className="logo-img"></Image>
            </div>
            <h4 className="mb-4" style={{textAlign: "center"}}>Sign in to your account</h4>
            <Form.Row>
              <Col>
              {!!Object.keys(errors).length && 
                  <span className="ml-2 text-danger">{errors.message}</span>
                  }
                <Form.Control
                  style={{backgroundColor:"rgba(255, 255, 255, 0.4)"}}
                  className="p-2"
                  label="Username"
                  placeholder="Username.."
                  name="username"
                  type="text"
                  value={values.username}
                  error={errors.username ? errors.username : ""}
                  onChange={onChange}
                  />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
              <Form.Control
                  style={{backgroundColor:"rgba(255, 255, 255, 0.4)"}}
                  className="my-2 p-2"
                  label="Password"
                  placeholder="Password.."
                  name="password"
                  type="password"
                  value={values.password}
                  error={errors.password ? errors.password : ""}
                  onChange={onChange}
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
              <Button
              variant="info"
              type="submit"
              block
              className="my-3"
              >
                Login
              </Button>
              </Col>
            </Form.Row>
            <Link to={'/reset-password'} className="custom-link">Forgot password?</Link>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      firstName
      username
      createdAt
      token
      isAdmin
      employee_profilePhoto
    }
  }
`;

export default LoginForm;
