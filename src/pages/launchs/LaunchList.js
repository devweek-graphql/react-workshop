import {useQuery} from '@apollo/client';
import {Link} from "react-router-dom";
import { Col, Row, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import LaunchListGQL from "queries/LaunchtList.gql";
import Loading from "components/Loading";
import ErrorMessage from "components/ErrorMessage";
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';

function LaunchList(){
  const {loading, error, data} = useQuery(LaunchListGQL);

  if(loading) {
    return <Loading />;
  }
  if(error) {
    return <ErrorMessage message={error.message}/>;
  };

  return (<section className={"container"}>
    <Row className={"my-3"}>
      <Col md={12}>
        <h4>Launches list</h4>
      </Col>
    </Row>
    <Row>
      <Col>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className={"text-center"}>#</th>
              <th className={"text-center"}>Name</th>
              <th className={"text-center"}>Rocket</th>
              <th className={"text-center"}>Flight number</th>
              <th className={"text-center"}>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.launches.map((oLaunch, index) => {
              return (<tr key={oLaunch.id}>
                <td className={"text-center"}>
                  {index + 1}
                </td>
                <td>
                  {oLaunch.name}
                </td>
                <td>
                  {oLaunch.rocket.name}
                </td>
                <td className={"text-center"}>
                  {oLaunch.flight_number}
                </td>
                <td className={"text-center"}>
                  {oLaunch.date_utc && (new Date(oLaunch.date_utc)).toLocaleDateString("es-UY")}
                </td>
                <td className={"text-center actions-column"}>
                  <Link className={"btn btn-sm btn-primary me-2"} to={`/launchs/${oLaunch.id}`}>
                    <FontAwesomeIcon icon={faInfo} />
                  </Link>
                  <Link className={"btn btn-sm btn-primary"} to={`/launchs/comments/${oLaunch.id}`}>
                    <FontAwesomeIcon icon={faCommentDots} />
                  </Link>
                </td>
              </tr>);
            })}
          </tbody>
        </Table>
      </Col>
    </Row>
  </section>);
}

export default LaunchList;