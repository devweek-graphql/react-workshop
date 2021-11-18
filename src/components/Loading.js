import React from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function Loading(){
  return (
    <section className="container">
      <Row className={"my-3"}>
        <Col className={"py-5 d-flex justify-content-center"}>
          <FontAwesomeIcon icon={faCircleNotch} size={"2x"} spin></FontAwesomeIcon>
        </Col>
      </Row>
    </section>
  );
}