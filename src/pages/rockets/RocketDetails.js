import React from "react";
import { useParams } from "react-router";
import { Row, Col } from "react-bootstrap";

function RocketDetails() {
  let { sRocketId } = useParams();
  console.log(sRocketId);
  return (<section className={"container"}>
    <Row className={"my-3"}>
      <Col md={8}>
        <h4>Rocket details {sRocketId}</h4>
      </Col>
    </Row>
  </section>);
}

export default RocketDetails;