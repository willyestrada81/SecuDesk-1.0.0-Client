import gql from 'graphql-tag';

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
`;
