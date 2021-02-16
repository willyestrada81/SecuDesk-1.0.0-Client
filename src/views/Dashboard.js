import React, { useContext } from "react";
import { Container, Row, Col } from "shards-react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import { AuthContext } from "../context/auth";

import PageTitle from "../components/common/PageTitle";
import IncidentsByType from "../components/blog/IncidentsByType";
import IncidentsOverview from "../components/blog/IncidentsOverview";
import StatsCard from "../components/dashboard/StatsCard";

function Dashboard() {
  const { user } = useContext(AuthContext);

  if (user) {
    const { loading, data } = useQuery(FETCH_DASHBOARD, {
      pollInterval: 10000,
      onError(err) {
        console.log(err);
      }
    });
    if (!loading && typeof data === 'undefined'){
      return (<Redirect to="/error" />)
    } else {
      const dashboard = () => {
        if (!loading) {
          const logs = data.getDashboard;
          const {
            incidentsLastHour,
            incidentsBeforeLastHour,
            incidentsLast24Hours,
            incidentsBeforeLast24Hours,
            delivery,
            visitor,
            repairs,
            percentageOfIncreaseByHour,
            percentageOfIncreaseBy24Hours,
            percentageDelivery,
            percentageVisitor,
            percentageRepairs
          } = logs;
  
          return (
            <Container fluid className="main-content-container px-4">
              <Row noGutters className="page-header py-4">
                <PageTitle
                  title="Dashboard"
                  subtitle="Dashboard"
                  className="text-sm-left mb-3"
                />
              </Row>
              <Row className="mb-4">
                <StatsCard
                  stats={{
                    name: "Last Hour",
                    statNumber: incidentsLastHour.length,
                    percentage: percentageOfIncreaseByHour,
                    since: "Since last hour"
                  }}
                />
                <StatsCard
                  stats={{
                    name: "Today",
                    statNumber: incidentsLast24Hours.length,
                    percentage: percentageOfIncreaseBy24Hours,
                    since: "Since yesterday"
                  }}
                />
                <StatsCard
                  stats={{
                    name: "Pending Deliveries",
                    statNumber: 8,
                    percentage: 25,
                    since: "Since last hour"
                  }}
                />
                <StatsCard
                  stats={{
                    name: "Completed Deliveries",
                    statNumber: 12,
                    percentage: 50,
                    since: "Since yesterday"
                  }}
                />
              </Row>
              <Row>
                {/* Latest Incidents */}
                <Col lg="8" md="12" sm="12" className="mb-4">
                  <IncidentsOverview logs={[...visitor, ...repairs, ...delivery]}/>
                </Col>
  
                {/* Incidents by type */}
                <Col lg="4" md="6" sm="12" className="mb-4">
                  <IncidentsByType
                    chartData={{
                      title: "Incidents By Types",
                      visitors: percentageVisitor,
                      deliveries: percentageDelivery,
                      repairs: percentageRepairs
                    }}
                    fullReport={
                      delivery,
                      visitor,
                      repairs
                    }
                  />
                </Col>
              </Row>
            </Container>
          );
        } else
          return (
            <Spinner animation="border" role="status" className="mb-4">
              <span className="sr-only">Loading...</span>
            </Spinner>
          );
      };

      return dashboard();
    }
  } else {
    return <Redirect to="/login" />;
  }
}

Dashboard.propTypes = {
  /**
   * The small stats dataset.
   *
   */
};

Dashboard.defaultProps = {};

const FETCH_DASHBOARD = gql`
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
`;
export default Dashboard;
