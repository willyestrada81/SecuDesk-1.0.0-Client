import React from "react";
import PropTypes from "prop-types";
import { Card, Row, Col, CardHeader, CardBody, Button } from "shards-react";
import moment from 'moment'

import RangeDatePicker from "../common/RangeDatePicker";

export default function IncidentsOverview({logs}) {
  return (
    <Card small className="h-100">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Latest Incidents</h6>
      </CardHeader>
      <CardBody className="pt-0">
        <Row className="border-bottom py-2 bg-light">
          <Col sm="6" className="d-flex mb-2 mb-sm-0">
            <RangeDatePicker />
          </Col>
          <Col>
            <Button
              size="sm"
              className="d-flex btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0"
            >
              View Full Report &rarr;
            </Button>
          </Col>
        </Row>
        <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        Incident Type
                      </th>
                      <th scope="col" className="border-0">
                        Created at
                      </th>
                      <th scope="col" className="border-0">
                        Created by
                      </th>
                    </tr>
                  </thead>
                  { logs.length ? (
                    logs.slice(0, 7).map((log, index) => {
                      const {
                        id,
                        incidentType,
                        createdAt,
                        createdBy
                      } = log;
                      return (
                        <tbody key={id}>
                          <tr>
                            <td>{(index + 1).toString()}</td>
                            <td>{incidentType}</td>
                            <td>{moment(createdAt).format("LLL")}</td>
                            <td>{createdBy}</td>
                          </tr>
                        </tbody>
                      );
                    })
                  ): (
                    <tbody>
                          <tr>
                            <td><strong className="text-muted d-block m-2">No data history to display</strong></td>
                          </tr>
                    </tbody>
                  )}
                </table>
      </CardBody>
    </Card>
  );
}

IncidentsOverview.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart dataset.
   */
  chartData: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object
};

IncidentsOverview.defaultProps = {};
