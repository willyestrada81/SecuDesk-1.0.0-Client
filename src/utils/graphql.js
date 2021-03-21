import gql from 'graphql-tag'

export const FETCH_LOGS_QUERY = gql`
{
  getIncidentLogs {
    id,
    incidentType,
    createdAt,
    createdBy,
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
      notes
      createdAt
      createdBy
      employeeId
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
  }
}
`

export const SUBMIT_INCIDENT_MUTATION = gql`
mutation createIncidentLog($tenantId: String!, $incidentType: String!) {
  createIncidentLog(tenantId: $tenantId, incidentType: $incidentType) {
    id
    incidentType
    createdAt
    createdBy
    notes
    employeeId
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
      incidentLogs {
        id
        incidentType
        notes
        createdAt
        createdBy
        employeeId
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

export const GET_VISITS_LOGS_BY_TENANT_ID = gql`
query getTenantVisitLogs($tenantId: ID!, $visitorId: ID!) {
  getTenantVisitLogs(tenantId: $tenantId, visitorId: $visitorId) {
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

export const GET_PACKAGES = gql`
query getPackages {
  getPackages {
    id
    receivedDate
    receivedByEmployeeId
    receivedByEmployee
    recipientName
    recipientId
    notes
    isDelivered
    delivery {
      deliveredByEmployeeId
      receivedByTenantId
      deliveryDate
      receivedByEmployee
      receivedByTenant
      notes
    }
  }
}
`

export const DELIVER_PACKAGE = gql`
mutation deliverPackage($packageId: ID!, $tenantId: ID!, $notes: String) {
  deliverPackage(packageId: $packageId, tenantId: $tenantId, notes: $notes) {
    id
    receivedDate
    receivedByEmployeeId
    receivedByEmployee
    recipientName
    recipientId
    notes
    isDelivered
    delivery {
      deliveredByEmployeeId
      receivedByTenantId
      deliveryDate
      receivedByEmployee
      receivedByTenant
      notes
    }
  }
}
`
export const GET_PACKAGE_BY_ID = gql`
query getPackageById($packageId: ID!) {
  getPackages(packageId: $packageId) {
    id
    receivedDate
    receivedByEmployeeId
    receivedByEmployee
    recipientName
    recipientId
    notes
    isDelivered
    delivery {
      deliveredByEmployeeId
      receivedByTenantId
      deliveryDate
      receivedByEmployee
      receivedByTenant
      notes
    }
  }
}
`
export const GET_PACKAGE_BY_TENANT_ID = gql`
query getPackagesByTenantId($tenantId: ID!) {
  getPackagesByTenantId(tenantId: $tenantId) {
    id
    receivedDate
    receivedByEmployeeId
    receivedByEmployee
    recipientName
    recipientId
    notes
    isDelivered
    delivery {
      deliveredByEmployeeId
      receivedByTenantId
      deliveryDate
      receivedByEmployee
      receivedByTenant
      notes
    }
  }
}
`
export const GET_INCIDENT_CUSTOM_FIELDS = gql`
{
  getCustomFields {
    id
    createdBy
    createdAt
    employeeId
    fieldName
  }
}
`

export const CREATE_CUSTOM_FIELD = gql`
mutation createCustomField($fieldName: String!) {
  createCustomField(fieldName: $fieldName) {
    id
    createdBy
    createdAt
    employeeId
    fieldName
  }
}
`

export const CREATE_NEW_PACKAGE = gql`
mutation createNewPackage($tenantId: ID!, $isDelivered: Boolean, $notes: String) {
  createNewPackage(tenantId: $tenantId, isDelivered: $isDelivered, notes: $notes) {
    id
    receivedDate
    receivedByEmployeeId
    receivedByEmployee
    recipientName
    recipientId
    notes
    isDelivered
    delivery {
      deliveredByEmployeeId
      receivedByTenantId
      deliveryDate
      receivedByEmployee
      receivedByTenant
      notes
    }
  }
}
`
