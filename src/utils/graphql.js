import gql from 'graphql-tag'

export const FETCH_LOGS_QUERY = gql`
{
  getIncidentLogs {
id,
    incidentType,
    createdAt,
    createdBy,
    tenant
  }
}
`

export const UPLOAD_FILE = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
      location
    }
  }
`

export const SEARCH_TENANT = gql`
mutation searchTenants($filter: String!) {
  searchTenants(filter: $filter) {
    id
    tenantFirstName
    tenantLastName
    tenantDateOfBirth
    apartment
    moveinDate
    tenantPhone
    tenantEmail
    tenantProfilePhoto
    incidentLogs {
      id
      incidentType
      createdBy
    }
    incidentCount
  }
}
`

export const SUBMIT_INCIDENT_MUTATION = gql`
mutation createLog($tenantId: String!, $incidentType: String!) {
  createIncidentLog(tenantId: $tenantId, incidentType: $incidentType) {
    id
  }
}
`

export const GET_SYSTEM_ACTIVITIES = gql`
{
  getSystemActivities {
id
    activityType
    createdBy
    createdAt
    message
    employeeId
  }
}
`

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
    firstName
    lastName
    organization
    id
    email
    username
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
  }
}
`

export const CREATE_TENANT = gql`
  mutation(
    $tenantFirstName: String!
    $tenantLastName: String!
    $tenantDateOfBirth: String!
    $apartment: String!
    $moveinDate: String!
    $tenantPhone: String!
    $tenantEmail: String!
    $tenantProfilePhoto: String
  ) {
    registerTenant(
      registerTenantInput: {
        tenantFirstName: $tenantFirstName
        tenantLastName: $tenantLastName
        tenantDateOfBirth: $tenantDateOfBirth
        apartment: $apartment
        moveinDate: $moveinDate
        tenantPhone: $tenantPhone
        tenantEmail: $tenantEmail
        tenantProfilePhoto: $tenantProfilePhoto
      }
    ) {
      id
      tenantFirstName
      tenantLastName
      tenantDateOfBirth
      apartment
      moveinDate
      tenantPhone
      tenantEmail
      tenantProfilePhoto
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
    employeeProfilePhoto
  }
}
`

export const GET_TENANT_BY_ID = gql`
query getTenantById($tenantId: ID!) {
  getTenantById(tenantId: $tenantId) {
    id
    tenantFirstName
    tenantLastName
    tenantPhone
    tenantEmail
    tenantDateOfBirth
    apartment
    moveinDate
    tenantProfilePhoto
    incidentLogs {
      id
      incidentType
      createdAt
      createdBy
      notes
    }
    bannedVisitors {
      visitorName
      visitorId
      changedDate
      changedBy
    }
    permanentVisitors {
      visitorName
      visitorId
      changedDate
      changedBy
    }
    incidentCount
  }
}
`

export const GET_EMPLOYEE_BY_ID = gql`
query getEemployeeById($employeeId: ID!) {
  getEmployeeById(employeeId: $employeeId){
    firstName
    lastName
    organization
    id
    email
    isAdmin
    gender
    hireDate
    bio
    jobTitle
    address
    city
    state
    zip
    employeeProfilePhoto
    mustResetPassword
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
      firstName
    }
  }
`

export const CREATE_VISITOR_LOG = gql`
  mutation createVisitorLog(
    $tenantId: ID!
    $NewVisitorInputs: NewVisitorInputs!
    ) {
    createVisitorLog(
      tenantId: $tenantId
      NewVisitorInputs: $NewVisitorInputs
    )
      {
        id
        visitorName
        visitorLastName
        createdAt
        notes
        visitsLogs {
          id
          visitDate
          createdBy
          employeeId
        }
  }
}
`

export const FETCH_DASHBOARD = gql`
{
  getDashboard {
    incidentsLastHour {
      id
      tenant
      incidentType
      createdAt
      createdBy
    }
    incidentsBeforeLastHour {
      id
      tenant
      incidentType
      createdAt
      createdBy
    }
    incidentsLast24Hours {
      id
      tenant
      incidentType
      createdAt
      createdBy
    }
    incidentsBeforeLast24Hours {
      id
      tenant
      incidentType
      createdAt
      createdBy
    }
    delivery {
      id
      tenant
      incidentType
      createdAt
      createdBy
    }
    visitor {
      id
      tenant
      incidentType
      createdAt
      createdBy
    }
    repairs {
      id
      tenant
      incidentType
      createdAt
      createdBy
    }
    percentageOfIncreaseByHour
    percentageOfIncreaseBy24Hours
    percentageDelivery
    percentageVisitor
    percentageRepairs
  }
}
`

export const FETCH_TENANTS_QUERY = gql`
  {
    getTenants {
      id
      tenantFirstName
      tenantLastName
      tenantPhone
      tenantEmail
      tenantDateOfBirth
      apartment
      moveinDate
      tenantProfilePhoto
      incidentLogs {
        id
        incidentType
        createdAt
        createdBy
        notes
      }
      bannedVisitors {
        visitorName
        visitorId
        changedDate
        changedBy
      }
      permanentVisitors {
        visitorName
        visitorId
        changedDate
        changedBy
      }
      incidentCount
    }
  }
`
export const SEARCH_VISITOR = gql`
mutation searchVisitors($filter: String!) {
  searchVisitors(filter: $filter) {
    id
    visitorName
    visitorLastName
    createdAt
    notes
    visitsLogs {
      id
      visitDate
      createdBy
      employeeId
      tenantId
    }
  }
}`

export const GET_VISITORS_BY_TENANT_ID = gql`
query getVisitorsByTenantId($tenantId: ID!) {
  getVisitorsByTenantId(tenantId: $tenantId) {
    id
    visitorName
    visitorLastName
    createdAt
    notes
    visitsLogs {
      id
      visitDate
      createdBy
      employeeId
      tenantId
    }
  }
}
`
export const LOG_VISIT = gql`
mutation logVisit($tenantId: ID!, $visitorId: ID!) {
  logVisit(tenantId: $tenantId, visitorId: $visitorId) {
    id
    visitorName
    visitorLastName
    createdAt
    notes
    visitsLogs {
      id
      visitDate
      createdBy
      employeeId
      tenantId
    }
  }
}
`
export const BAN_VISITOR = gql`
mutation banVisitor($tenantId: ID!, $visitorId: ID!) {
  banVisitor(tenantId: $tenantId, visitorId: $visitorId) {
    id
    bannedVisitors {
        visitorName
        visitorId
        changedDate
        changedBy
      }
    permanentVisitors {
        visitorName
        visitorId
        changedDate
        changedBy
      }
  }
}
`

export const MAKE_PERMANENT = gql`
mutation makeVisitorPermanent($tenantId: ID!, $visitorId: ID!) {
  makeVisitorPermanent(tenantId: $tenantId, visitorId: $visitorId) {
    id
    bannedVisitors {
        visitorName
        visitorId
        changedDate
        changedBy
      }
    permanentVisitors {
        visitorName
        visitorId
        changedDate
        changedBy
      }
  }
}
`
export const REMOVE_BANNED_VISITOR = gql`
mutation removeBannedVisitor($tenantId: ID!, $visitorId: ID!) {
  removeBannedVisitor(tenantId: $tenantId, visitorId: $visitorId) {
    id
    bannedVisitors {
        visitorName
        visitorId
        changedDate
        changedBy
      }
    permanentVisitors {
        visitorName
        visitorId
        changedDate
        changedBy
      }
  }
}
`
export const REMOVE_PERMANENT_VISITOR = gql`
mutation removePermanentVisitor($tenantId: ID!, $visitorId: ID!) {
  removePermanentVisitor(tenantId: $tenantId, visitorId: $visitorId) {
    id
    bannedVisitors {
        visitorName
        visitorId
        changedDate
        changedBy
      }
    permanentVisitors {
        visitorName
        visitorId
        changedDate
        changedBy
      }
  }
}
`
