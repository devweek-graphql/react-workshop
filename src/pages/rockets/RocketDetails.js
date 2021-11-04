import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Carousel } from "react-bootstrap";
import APP_CONFIG from "config/app.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function RocketDetails() {
  const [oRocket, setRocketInfo] = useState();
  const sLabelClass = "w-25 d-inline-block text-end pe-4 fw-bold";
  let { sRocketId } = useParams();

  useEffect(() => {
    try {
      const GetRocketInfo = async () => {
        const oResponse = await fetch(`${APP_CONFIG.API_URL}rockets/${sRocketId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (oResponse.status === 200) {
          let oData = await oResponse.text();
          setRocketInfo(JSON.parse(oData));
        } else {
          console.log("Error de conexión al servidor");
        }
      }
      GetRocketInfo();

    } catch (error) {
      console.log(error);
    }
  }, [sRocketId]);

  return (<section className={"container"}>
    <Row className={"my-3"}>
      <Col className={"d-flex justify-content-between"}>
        <h4>Rocket details</h4>
        <Link to={"/rockets"} className={"btn btn-primary"}>
          <FontAwesomeIcon icon={faArrowLeft} className={"me-2"} />
          Back
        </Link>
      </Col>
    </Row>
    <Row className={"my-3"}>
      <Col>
        {oRocket &&
          <ListGroup>
            <ListGroup.Item>
              <label className={sLabelClass}>Name:</label>
              {oRocket.name}
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Type:</label>
              {oRocket.type}
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Active:</label>
              {oRocket.active ? "Yes" : "No"}
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Boosters:</label>
              {oRocket.boosters}
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Cost per launch:</label>
              {oRocket.cost_per_launch}
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Success rate pct:</label>
              {oRocket.success_rate_pct}
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>First flight:</label>
              {oRocket.first_flight && (new Date(oRocket.first_flight)).toLocaleDateString("es-UY")}
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Country:</label>
              {oRocket.country}
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Wikipedia:</label>
              <a href={oRocket.wikipedia} target="_blank" rel="noreferrer">{oRocket.wikipedia}</a>
            </ListGroup.Item>
            <ListGroup.Item className={"d-flex align-items-center"}>
              <label className={sLabelClass}>Description:</label>
              <label className={"w-75 d-inline-block"}>{oRocket.description}</label>
            </ListGroup.Item>
          </ListGroup>
        }
      </Col>
    </Row>
    {oRocket?.flickr_images && oRocket.flickr_images.length !== 0 &&
      <Row className={"mb-5"}>
        <Col>
          <Carousel
            prevIcon={<span className={"btn btn-success rounded-circle"}><FontAwesomeIcon icon={faArrowLeft} /></span>}
            nextIcon={<span className={"btn btn-success rounded-circle"}><FontAwesomeIcon icon={faArrowRight} /></span>}
          >
            {oRocket.flickr_images.map((sImageUrl, index) => {
              return <Carousel.Item key={index}>
                <div className={"h-100 w-100 d-flex justify-content-center align-items-center"}>
                  <img
                    className="d-block"
                    src={sImageUrl}
                    alt="First slide"
                  />
                </div>
              </Carousel.Item>
            })}
          </Carousel>
        </Col>
      </Row>
    }
  </section>);
}

export default RocketDetails;