import React, { useContext } from "react";
import { Col, Form, Row, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { SystemContext } from "context/SystemContext";

function LaunchList(){
  const {aRocketList, aLaunchList, setSelectedRocketId} = useContext(SystemContext);
  
  return (<section className={"container"}>
    <Row className={"my-3"}>
      <Col md={8}>
        <h4>Launches list</h4>
      </Col>
      <Col md={4}>
      <Form.Select size="sm" onChange={({ target: { value: sValue } }) => setSelectedRocketId(sValue)}>
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
            {aLaunchList && aLaunchList.map((oRocket, index) => {
              return (<tr key={oRocket.id}>
                <td className={"text-center"}>
                  {index + 1}
                </td>
                <td>
                  {oRocket.name}
                </td>
                <td className={"text-center"}>
                  {oRocket.flight_number}
                </td>
                <td className={"text-center"}>
                  {oRocket.date_utc && (new Date(oRocket.date_utc)).toLocaleDateString("es-UY")}
                </td>
                <td className={"text-center actions-column"}>
                  <span className={"btn btn-sm btn-primary"}>
                    <FontAwesomeIcon icon={faInfo} />
                  </span>
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