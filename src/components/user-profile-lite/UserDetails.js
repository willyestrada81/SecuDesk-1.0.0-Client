import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";
import UploadFileModal from '../common/UploadFileModal'

function UserDetails ({ userDetails }) {
  const {
    firstName,
    lastName,
    jobTitle,
    employee_profilePhoto,
    bio,
    id
  } = userDetails.getEmployeeById

  return (
  <Card small className="mb-4 pt-3">
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <img
          className="rounded-circle"
          src={employee_profilePhoto}
          alt={firstName}
          width="110"
        />
      </div>
        <UploadFileModal employeeId={id}></UploadFileModal>
      <h4 className="mb-0 mt-2">{`${firstName} ${lastName}`}</h4>
      <span className="text-muted d-block mb-2">{jobTitle}</span>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="px-4">

      </ListGroupItem>
      <ListGroupItem className="p-4">
        <strong className="text-muted d-block mb-2">
          Bio
        </strong>
        <span>{bio}</span>
      </ListGroupItem>
    </ListGroup>
  </Card>
  )};

UserDetails.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};

UserDetails.defaultProps = {
  userDetails: {
    name: "Sierra Brooks",
    avatar: require("./../../images/avatars/0.jpg"),
    jobTitle: "Project Manager",
    performanceReportTitle: "Workload",
    performanceReportValue: 74,
    metaTitle: "Description",
    metaValue:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
  }
};

export default UserDetails;
