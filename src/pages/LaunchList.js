import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Table } from "react-bootstrap";
import APP_CONFIG from "../config/app.config";

function LaunchList(){
  const [aLaunchList, setLaunchList] = useState([]);

  useEffect(() => {
    try {
      const GetLaunchList = async () => {
        const oResponse = await fetch(`${APP_CONFIG.API_URL}launches`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
  
        if (oResponse.status === 200){
          let oData = await oResponse.text();
          setLaunchList(JSON.parse(oData));
          console.log(aLaunchList);
        } else {
          console.log("Error de conexión al servidor")
        }
      }
      GetLaunchList();

    } catch (error) {
      console.log(error);
    }
  }, []);
  
  return (<section className={"container"}>
    <Row className={"my-3"}>
      <Col>
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
                  <FontAwesomeIcon icon={faInfo} />
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