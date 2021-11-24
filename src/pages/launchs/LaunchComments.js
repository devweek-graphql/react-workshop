import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Card, Alert, Form, Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleNotch, faPlus } from "@fortawesome/free-solid-svg-icons";
import LaunchCommentsGQL from "queries/LaunchComments.gql";
import Loading from "components/Loading";
import ErrorMessage from "components/ErrorMessage";
import LaunchAddCommentGQL from "mutations/LaunchAddComment.gql";

function LaunchComments() {
  let { sLaunchId } = useParams();
  const [user_name, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const sLabelClass = "w-25 d-inline-block text-end pe-4 fw-bold";
  const {loading, error, data} = useQuery(
    LaunchCommentsGQL,
    {
      variables: { sLaunchId }
    }
  );
  const [addComment, oCommentResponse] = useMutation(LaunchAddCommentGQL);

  const handleSubmit = () => {
    if (user_name === "" || message === "") {
      setShowError(true);
      return;
    } else {
      setShowError(false);
      addComment({
        variables: {
          sLaunchId,
          user_name,
          message
        }
      });
      setUsername("");
      setMessage("");
    }
  }

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
          </ListGroup>
        }
      </Col>
    </Row>
    <Row className={"mb-3 mt-5"}>
      <Col md={3}>
        <h4>Comments</h4>
      </Col>
      <Col md={9}>
        {oCommentResponse.loading ? <FontAwesomeIcon icon={faCircleNotch} size={"2x"} spin className={"ms-auto"}></FontAwesomeIcon> :
          <Row>
            <Col md={"auto"}>
              <Form.Control placeholder="Username" value={user_name} onChange={(e) => setUsername(e.target.value)} />
            </Col>
            <Col xs={8}>
              <Form.Control placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
            </Col>
            <Col md={"auto"}>
              <Button variant="primary" className={"w-100"} onClick={handleSubmit}>
                <FontAwesomeIcon icon={faPlus} />
                Add
              </Button>
            </Col>
          </Row>
        }
      </Col>
      {showError ?
      <Col md={12} className={"mt-4"}>
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
            The username and message are required
        </Alert>
      </Col> : null}
      {/* : null} */}
      {oCommentResponse.error ? <ErrorMessage message={oCommentResponse.error.message} /> : null}
    </Row>
    <Row className={"my-3"}>
      <Col>
        {data.launch.comments && data.launch.comments.length ? data.launch.comments.map((oComment, index) => {
          return (
            <Card className={"mb-3"} key={index}>
              <Card.Header>{oComment.user_name}</Card.Header>
              <Card.Body>
                <Card.Text>
                  {oComment.message}
                </Card.Text>
              </Card.Body>
            </Card>
          );
        }) : 
          <Alert variant={"primary"}>
            Without data to show
          </Alert>
        }
      </Col>
    </Row>
  </section>);
}

export default LaunchComments;