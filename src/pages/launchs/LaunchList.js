import React, { useContext } from "react";
import {Link} from "react-router-dom";
import { Col, Form, Row, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { SystemContext } from "context/SystemContext";

function LaunchList(){
  const {aRocketList, aLaunchList, sSelectedRocketId, setSelectedRocketId} = useContext(SystemContext);
  
  return (<section className={"container"}>
    <Row className={"my-3"}>
      <Col md={8}>
        <h4>Launches list</h4>
      </Col>
      <Col md={4}>
      <Form.Select size="sm" defaultValue={sSelectedRocketId} onChange={({ target: { value: sValue } }) => setSelectedRocketId(sValue)}>
        <option value={"all"}>All</option>
        {aRocketList && aRocketList.map(oRocket =>
          <option key={oRocket.id} value={oRocket.id}>{oRocket.name}</option>
        )}
      </Form.Select>
      </Col>
    </Row>
    <Row>
      <Col>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className={"text-center"}>#</th>
              <th className={"text-center"}>Name</th>
              <th className={"text-center"}>Flight number</th>
              <th className={"text-center"}>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {aLaunchList && aLaunchList.map((oLaunch, index) => {
              return (<tr key={oLaunch.id}>
                <td className={"text-center"}>
                  {index + 1}
                </td>
                <td>
                  {oLaunch.name}
                </td>
                <td className={"text-center"}>
                  {oLaunch.flight_number}
                </td>
                <td className={"text-center"}>
                  {oLaunch.date_utc && (new Date(oLaunch.date_utc)).toLocaleDateString("es-UY")}
                </td>
                <td className={"text-center actions-column"}>
                  <Link className={"btn btn-sm btn-primary"} to={`/launchs/${oLaunch.id}`}>
                    <FontAwesomeIcon icon={faInfo} />
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