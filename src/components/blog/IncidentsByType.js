import React from "react";
import { Pie } from "react-chartjs-2";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  FormSelect,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";

export default function IncidentsByType({chartData, fullReport}) {
  const state = {
    labels: ["Repairs", "Visitors", "Deliveries"],
    datasets: [
      {
        label: "Incidents By Type",
        backgroundColor: [
          "rgba(0,123,255,0.9)",
          "rgb(77, 163, 255)",
          "rgb(153, 202, 255)"
        ],
        hoverBackgroundColor: [
          "rgb(0, 111, 230)",
          "rgb(0, 111, 230)",
          "rgb(0, 62, 128)",
        ],
        data: [chartData.repairs, chartData.visitors, chartData.deliveries]
      }
    ]
  };
  
  return (
    <Card small className="h-100">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Incident By Types</h6>
      </CardHeader>
      <CardBody className="d-flex py-0">
        {(chartData.repairs === 0 && chartData.visitors === 0 && chartData.deliveries === 0) ? (
          <strong className="text-muted d-block m-2">No data history to display</strong>
        ): (
        <Pie
          data={state}
          options={{
            title: {
              display: true,
              text: "Average Rainfall per month",
              fontSize: 20
            },
            legend: {
              display: true,
              position: "right"
            }
          }}
          width={500}
          height={350}
          options={{ maintainAspectRatio: false }}
        />
        )}
      </CardBody>
      <CardFooter className="border-top">
        <Row>
          <Col>
          </Col>
          <Col className="text-right view-report">
            {/* eslint-disable-next-line */}
            <a href="#">View full report &rarr;</a>
          </Col>
        </Row>
      </CardFooter>
    </Card>
  );
}

IncidentsByType.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart config object.
   */
  chartConfig: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object,
  /**
   * The chart data.
   */
  chartData: PropTypes.object
};

IncidentsByType.defaultProps = {
  title: "Users by device",
  chartData: {
    datasets: [
      {
        hoverBorderColor: "#ffffff",
        data: [20, 25, 30],
        backgroundColor: [
          "rgba(0,123,255,0.9)",
          "rgba(0,123,255,0.5)",
          "rgba(0,123,255,0.3)"
        ]
      }
    ],
    labels: ["Desktop", "Tablet", "Mobile"]
  }
};
