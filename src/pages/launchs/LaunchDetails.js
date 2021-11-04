import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Carousel } from "react-bootstrap";
import APP_CONFIG from "config/app.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function LaunchDetails() {
  let { sLaunchId } = useParams();
  const [oLaunch, setLaunchInfo] = useState();
  const sLabelClass = "w-25 d-inline-block text-end pe-4 fw-bold";

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

  return (<section className={"container"}>
    <Row className={"my-3"}>
      <Col className={"d-flex justify-content-between"}>
        <h4>Launch details</h4>
        <Link to={"/Launchs"} className={"btn btn-primary"}>
          <FontAwesomeIcon icon={faArrowLeft} className={"me-2"} />
          Back
        </Link>
      </Col>
    </Row>
    <Row className={"my-3"}>
      <Col>
        {oLaunch &&
          <ListGroup>
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