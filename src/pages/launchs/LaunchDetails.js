import React from "react";
import { useParams } from "react-router";
import { Row, Col } from "react-bootstrap";

function LaunchDetails() {
  let { sLaunchId } = useParams();
  console.log(sLaunchId);
  return (<section className={"container"}>
    <Row className={"my-3"}>
      <Col md={8}>
        <h4>Launch details {sLaunchId}</h4>
      </Col>
    </Row>
  </section>);
}

export default LaunchDetails;