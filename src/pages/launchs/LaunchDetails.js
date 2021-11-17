import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Carousel } from "react-bootstrap";
import APP_CONFIG from "config/app.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function LaunchDetails() {
  let { sLaunchId } = useParams();
  const [oRocket, setRocketInfo] = useState();
  const [oLaunch, setLaunchInfo] = useState();
  const sLabelClass = "w-25 d-inline-block text-end pe-4 fw-bold";
  const [sRocketId, setRocketId] = useState();

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

  useEffect(() => {
    try {
      const GetLaunchInfo = async () => {
        const oResponse = await fetch(`${APP_CONFIG.API_URL}launches/${sLaunchId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (oResponse.status === 200) {
          let oData = await oResponse.text();
          setLaunchInfo(JSON.parse(oData));
        } else {
          console.log("Error de conexión al servidor");
        }
      }
      GetLaunchInfo();

    } catch (error) {
      console.log(error);
    }
  }, [sLaunchId]);

  useEffect(() => {
    if (oLaunch) {
      setRocketId(oLaunch.rocket);
    }
  }, [oLaunch]);

  return (<section className={"container mb-5"}>
    <Row className={"my-3"}>
      <Col className={"d-flex justify-content-between"}>
        <h4>Details</h4>
        <Link to={"/Launchs"} className={"btn btn-primary"}>
          <FontAwesomeIcon icon={faArrowLeft} className={"me-2"} />
          Back
        </Link>
      </Col>
    </Row>
    <Row className={"my-3"}>
      <Col>
        {oRocket &&
          <ListGroup>
            <ListGroup.Item variant="dark">
              <h5>Rocket</h5>
            </ListGroup.Item>
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

    <Row className={"my-3"}>
      <Col>
        {oLaunch &&
          <ListGroup>
            <ListGroup.Item variant="dark">
              <h5>Launch</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Name:</label>
              {oLaunch.name}
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Flight number:</label>
              {oLaunch.flight_number}
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Success:</label>
              {oLaunch.success ? "Yes" : "No"}
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Date:</label>
              {oLaunch.date_utc && (new Date(oLaunch.date_utc)).toLocaleDateString("es-UY")}
            </ListGroup.Item>
            {oLaunch?.links?.wikipedia &&
              <ListGroup.Item>
                <label className={sLabelClass}>Wikipedia:</label>
                <a href={oLaunch.links.wikipedia} target="_blank" rel="noreferrer">{oLaunch.links.wikipedia}</a>
              </ListGroup.Item>
            }
            <ListGroup.Item className={"d-flex align-items-center"}>
              <label className={sLabelClass}>Details:</label>
              <label className={"w-75 d-inline-block"}>{oLaunch.details}</label>
            </ListGroup.Item>
          </ListGroup>
        }
      </Col>
    </Row>
    {oLaunch?.links?.flickr?.original && oLaunch.links.flickr.original.length !== 0 &&
      <Row className={"mb-5"}>
        <Col>
          <Carousel
            prevIcon={<span className={"btn btn-success rounded-circle"}><FontAwesomeIcon icon={faArrowLeft} /></span>}
            nextIcon={<span className={"btn btn-success rounded-circle"}><FontAwesomeIcon icon={faArrowRight} /></span>}
          >
            {oLaunch.links.flickr.original.map((sImageUrl, index) => {
              return <Carousel.Item key={index}>
                <div className={"h-100 w-100 d-flex justify-content-center align-items-center"}>
                  <img
                    className="d-block"
                    src={sImageUrl}
                    alt="Slide"
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

export default LaunchDetails;