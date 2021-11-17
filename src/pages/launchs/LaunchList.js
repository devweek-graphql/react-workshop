import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { Col, Row, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import APP_CONFIG from "config/app.config";

function LaunchList(){
  const [aLaunchList, setLaunchList] = useState([]);
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
        } else {
          console.log("Error de conexión al servidor");
        }
      }
      GetRocketList();

    } catch (error) {
      console.log(error);
    }
  }, []);

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
        } else {
          console.log("Error de conexión al servidor");
        }
      }
      GetLaunchList();

    } catch (error) {
      console.log(error);
    }
  }, []);

  const getRocketNameById = sRocketId => {
    const oRocket = aRocketList.find(oRocketElement => oRocketElement.id === sRocketId);
    return oRocket.name;
  }

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
            {aLaunchList && aLaunchList.map((oLaunch, index) => {
              return (<tr key={oLaunch.id}>
                <td className={"text-center"}>
                  {index + 1}
                </td>
                <td>
                  {oLaunch.name}
                </td>
                <td>
                  {getRocketNameById(oLaunch.rocket)}
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