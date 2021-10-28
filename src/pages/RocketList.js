import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faRocket } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Table } from "react-bootstrap";
import APP_CONFIG from "../config/app.config";

function RocketList(){
  const [aRocketList, setRocketList] = useState([]);

  useEffect(() => {
    try {
      const GetRocketList = async () => {
        const oResponse = await fetch(`${APP_CONFIG.API_URL}rockets`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
  
        if (oResponse.status === 200){
          let oData = await oResponse.text();
          setRocketList(JSON.parse(oData));
          console.log(aRocketList);
        } else {
          console.log("Error de conexión al servidor")
        }
      }
      GetRocketList();

    } catch (error) {
      console.log(error);
    }
  }, []);
  
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
                  <span className={"btn btn-sm btn-primary"}>
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