import React from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

export default function ErrorMessage({message}){
  return (
    <section className="container">
      <Row className={"my-3"}>
        <Col className={"py-5"}>
          <Alert variant={"danger"}>
            <FontAwesomeIcon icon={faBan} className={"me-3"}></FontAwesomeIcon>
            {message}
          </Alert>
        </Col>
      </Row>
    </section>
  );
}