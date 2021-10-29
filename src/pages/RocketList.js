import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faRocket } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Table } from "react-bootstrap";
import { SystemContext } from "context/SystemContext";

function RocketList(){
  let history = useHistory();
  const {aRocketList, setSelectedRocketId} = useContext(SystemContext);

  const handleViewLaunchs = (sRocketId) => {
    setSelectedRocketId(sRocketId);
    history.push("/launchs");
  }
  
  return (<section className={"container"}>
    <Row className={"my-3"}>
      <Col>
        <h4>Rockets list</h4>
      </Col>
    </Row>
    <Row>
      <Col>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className={"text-center"}>#</th>
              <th className={"text-center"}>Name</th>
              <th className={"text-center"}>Stages</th>
              <th className={"text-center"}>Cost per launch</th>
              <th className={"text-center"}>Active</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {aRocketList && aRocketList.map((oRocket, index) => {
              return (<tr key={oRocket.id}>
                <td className={"text-center"}>
                  {index + 1}
                </td>
                <td>
                  {oRocket.name}
                </td>
                <td className={"text-center"}>
                  {oRocket.stages}
                </td>
                <td className={"text-end"}>
                  {oRocket.cost_per_launch}
                </td>
                <td className={"text-center"}>
                  {oRocket.active ? "Yes" : "No"}
                </td>
                <td className={"text-center actions-column"}>
                  <span className={"btn btn-sm btn-primary px-2 mx-2"}>
                    <FontAwesomeIcon icon={faInfo} />
                  </span>
                  <span className={"btn btn-sm btn-primary"} onClick={() => handleViewLaunchs(oRocket.id)}>
                    <FontAwesomeIcon icon={faRocket} />
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

export default RocketList;