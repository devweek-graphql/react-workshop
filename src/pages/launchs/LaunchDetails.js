import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import LaunchDetailsGQL from "queries/LaunchDetails.gql";
import Loading from "components/Loading";
import ErrorMessage from "components/ErrorMessage";

function LaunchDetails() {
  let { sLaunchId } = useParams();
  const sLabelClass = "w-25 d-inline-block text-end pe-4 fw-bold";
  const {loading, error, data} = useQuery(
    LaunchDetailsGQL,
    {
      variables: { sLaunchId }
    }
  );

  if(loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

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
        {
          <ListGroup>
            <ListGroup.Item variant="dark">
              <h5>Rocket</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Name:</label>
              {data.launch.rocket.name}
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Type:</label>
              {data.launch.rocket.type}
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Active:</label>
              {data.launch.rocket.active ? "Yes" : "No"}
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Boosters:</label>
              {data.launch.rocket.boosters}
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Cost per launch:</label>
              {data.launch.rocket.cost_per_launch}
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Success rate pct:</label>
              {data.launch.rocket.success_rate_pct}
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>First flight:</label>
              {data.launch.rocket.first_flight && (new Date(data.launch.rocket.first_flight)).toLocaleDateString("es-UY")}
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Country:</label>
              {data.launch.rocket.country}
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Wikipedia:</label>
              <a href={data.launch.rocket.wikipedia} target="_blank" rel="noreferrer">{data.launch.rocket.wikipedia}</a>
            </ListGroup.Item>
            <ListGroup.Item className={"d-flex align-items-center"}>
              <label className={sLabelClass}>Description:</label>
              <label className={"w-75 d-inline-block"}>{data.launch.rocket.description}</label>
            </ListGroup.Item>
          </ListGroup>
        }
      </Col>
    </Row>
    {data.launch.rocket?.flickr_images && data.launch.rocket.flickr_images.length !== 0 &&
      <Row className={"mb-5"}>
        <Col>
          <Carousel
            prevIcon={<span className={"btn btn-success rounded-circle"}><FontAwesomeIcon icon={faArrowLeft} /></span>}
            nextIcon={<span className={"btn btn-success rounded-circle"}><FontAwesomeIcon icon={faArrowRight} /></span>}
          >
            {data.launch.rocket.flickr_images.map((sImageUrl, index) => {
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
        {
          <ListGroup>
            <ListGroup.Item variant="dark">
              <h5>Launch</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Name:</label>
              {data.launch.name}
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Flight number:</label>
              {data.launch.flight_number}
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Success:</label>
              {data.launch.success ? "Yes" : "No"}
            </ListGroup.Item>
            <ListGroup.Item>
              <label className={sLabelClass}>Date:</label>
              {data.launch.date_utc && (new Date(data.launch.date_utc)).toLocaleDateString("es-UY")}
            </ListGroup.Item>
            {data.launch?.links?.wikipedia &&
              <ListGroup.Item>
                <label className={sLabelClass}>Wikipedia:</label>
                <a href={data.launch.links.wikipedia} target="_blank" rel="noreferrer">{data.launch.links.wikipedia}</a>
              </ListGroup.Item>
            }
            <ListGroup.Item className={"d-flex align-items-center"}>
              <label className={sLabelClass}>Details:</label>
              <label className={"w-75 d-inline-block"}>{data.launch.details}</label>
            </ListGroup.Item>
          </ListGroup>
        }
      </Col>
    </Row>
    {data.launch?.links?.flickr?.original && data.launch.links.flickr.original.length !== 0 &&
      <Row className={"mb-5"}>
        <Col>
          <Carousel
            prevIcon={<span className={"btn btn-success rounded-circle"}><FontAwesomeIcon icon={faArrowLeft} /></span>}
            nextIcon={<span className={"btn btn-success rounded-circle"}><FontAwesomeIcon icon={faArrowRight} /></span>}
          >
            {data.launch.links.flickr.original.map((sImageUrl, index) => {
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