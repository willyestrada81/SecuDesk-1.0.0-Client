import gql from 'graphql-tag'

export const REGISTER_EMPLOYEE = gql`
mutation (
    $firstName: String!
    $lastName: String!
    $organization: String!
    $email: String!
    $gender: String
    $hireDate: String!
    $bio: String
    $jobTitle: String!
    $address: String!
    $city: String!
    $state: String!
    $zip: String!
    $employeeProfilePhoto: String
) {
  registerEmployee(
    RegisterEmployeeInput: {
      firstName: $firstName
      lastName: $lastName
      organization: $organization
      email: $email
      gender: $gender
      hireDate: $hireDate
      bio: $bio
      jobTitle: $jobTitle
      address: $address
      city: $city
      state: $state
      zip: $zip
      employeeProfilePhoto: $employeeProfilePhoto
    }
  ) {
    id
    firstName
    lastName
    organization
    email
    mustResetPassword
    isAdmin
    createdAt
    gender
    hireDate
    bio
    jobTitle
    address
    city
    state
    zip
    employeeProfilePhoto
    activationUrl
    isActivated
    status {
    isInactive
    deactivatedBy
    }
  }
}
`

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    email
    firstName
    createdAt
    token
    isAdmin
    isSuperAdmin
    employeeProfilePhoto
  }
}
`

export const GET_EMPLOYEE_BY_ID = gql`
query getEemployeeById($employeeId: ID!) {
  getEmployeeById(employeeId: $employeeId){
    id
    firstName
    lastName
    organization
    email
    mustResetPassword
    isAdmin
    createdAt
    gender
    hireDate
    bio
    jobTitle
    address
    city
    state
    zip
    employeeProfilePhoto
    activationUrl
    isActivated
    status {
    isInactive
    deactivatedBy
    }
  }
}
`

export const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee(
    $employeeId: ID!
    $RegisterEmployeeInput: RegisterEmployeeInput!
  ) {
    updateEmployee(
      employeeId: $employeeId
      RegisterEmployeeInput: $RegisterEmployeeInput
    ) {
      id
      firstName
      lastName
      organization
      email
      mustResetPassword
      isAdmin
      createdAt
      gender
      hireDate
      bio
      jobTitle
      address
      city
      state
      zip
      employeeProfilePhoto
      activationUrl
      isActivated
      status {
      isInactive
      deactivatedBy
      }
    }
  }
`

export const ACTIVATE_EMPLOYEE = gql`
mutation activateEmployee($activationCode: String!, $email: String!) {
  activateEmployee(activationCode: $activationCode, email: $email)
}`

export const RESET_PASSWORD = gql`
mutation resetPassword($email: String!, $password: String!, $confirmPassword: String!) {
  resetPassword(email: $email, password: $password, confirmPassword: $confirmPassword) {
    id
    firstName
    lastName
    organization
    email
    mustResetPassword
    isAdmin
    createdAt
    gender
    hireDate
    bio
    jobTitle
    address
    city
    state
    zip
    employeeProfilePhoto
    activationUrl
    isActivated
    status {
    isInactive
    deactivatedBy
    }
  }
}`

export const DEACTIVATE_EMPLOYEE = gql`
mutation deactivateEmployee($employeeId: ID!, $employeeEmail: String!) {
  deactivateEmployee(employeeId: $employeeId, employeeEmail: $employeeEmail) {
    id
    firstName
    lastName
    organization
    email
    mustResetPassword
    isAdmin
    createdAt
    gender
    hireDate
    bio
    jobTitle
    address
    city
    state
    zip
    employeeProfilePhoto
    activationUrl
    isActivated
    status {
    isInactive
    deactivatedBy
    }
  }
}`

export const GET_EMPLOYEES = gql`
{
  getEmployees {
    id
    firstName
    lastName
    organization
    email
    mustResetPassword
    isAdmin
    createdAt
    gender
    hireDate
    bio
    jobTitle
    address
    city
    state
    zip
    employeeProfilePhoto
    activationUrl
    isActivated
    status {
    isInactive
    deactivatedBy
    }
  }
}
`
