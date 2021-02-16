import React, { useState } from "react";
import { Button, FormGroup, Form, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

function CustomFileUpload() {
  let message;
  const [file, setFile] = useState("");
  const [submitFiles, { loading, data, error }] = useMutation(UPLOAD_FILE, {
    variables: {
      file: file,
    },
    onError(err) {
      console.log(err.networkError);
    },
    onCompleted(data) {
      console.log(data);
    },
  });

  if (data) {
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
  console.log("Messageee", message)
  const submitFileToUpload = () => {
    submitFiles();
  };
  return (
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
      <FormGroup className="mb-0 mt-4">
        <Button theme="accent" type="submit" disabled={!file}>
          {loading ? "Loading…" : "Upload"}
        </Button>
      </FormGroup>
<Form.Group className="mt-6">
Sucessss
      {message}
</Form.Group>

    </Form>
  );
}

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
export default CustomFileUpload;
