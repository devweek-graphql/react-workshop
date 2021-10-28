import React, {useState, useEffect} from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import APP_CONFIG from "../config/app.config";

function CompanyInfo() {
  const [oCompanyInfo, setCompanyInfo] = useState();
  const sLabelClass = "w-25 d-inline-block text-end pe-4 fw-bold";

  useEffect(() => {
    try {
      const GetCompanyInfo = async () => {
        const oResponse = await fetch(`${APP_CONFIG.API_URL}company`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
  
        if (oResponse.status === 200){
          let oData = await oResponse.text();
          setCompanyInfo(JSON.parse(oData));
        } else {
          console.log("Error de conexión al servidor");
        }
      }
      GetCompanyInfo();

    } catch (error) {
      console.log(error);
    }
  }, []);

  return(
    <section className="container">
      <Row className={"my-3"}>
        <Col>
          <h4>Company info</h4>
        </Col>
      </Row>
      <Row className={"my-3"}>
        <Col>
          {oCompanyInfo &&
            <ListGroup>
              <ListGroup.Item>
                <label className={sLabelClass}>Name:</label>
                {oCompanyInfo.name}
              </ListGroup.Item>
              <ListGroup.Item>
                <label className={sLabelClass}>Founder:</label>
                {oCompanyInfo.founder}
              </ListGroup.Item>
              <ListGroup.Item>
                <label className={sLabelClass}>Founded:</label>
                {oCompanyInfo.founded}
              </ListGroup.Item>
              <ListGroup.Item>
                <label className={sLabelClass}>CEO:</label>
                {oCompanyInfo.ceo}
              </ListGroup.Item>
              <ListGroup.Item>
                <label className={sLabelClass}>COO:</label>
                {oCompanyInfo.coo}
              </ListGroup.Item>
              <ListGroup.Item>
                <label className={sLabelClass}>CTO:</label>
                {oCompanyInfo.cto}
              </ListGroup.Item>
              <ListGroup.Item>
                <label className={sLabelClass}>CTO Propulsion:</label>
                {oCompanyInfo.cto_propulsion}
              </ListGroup.Item>
              <ListGroup.Item>
                <label className={sLabelClass}>Employees:</label>
                {oCompanyInfo.employees}
              </ListGroup.Item>
              <ListGroup.Item>
                <label className={sLabelClass}>Valuation:</label>
                {oCompanyInfo.valuation}
              </ListGroup.Item>
              <ListGroup.Item className={"d-flex align-items-center"}>
                <label className={sLabelClass}>Summary:</label>
                <label className={"w-75 d-inline-block"}>{oCompanyInfo.summary}</label>
              </ListGroup.Item>
              <ListGroup.Item className={"d-flex align-items-center"}>
                <label className={sLabelClass}>Headquarters:</label>
                <label className={"w-75 d-inline-block"}>{oCompanyInfo.headquarters.address}, {oCompanyInfo.headquarters.city}, {oCompanyInfo.headquarters.state}</label>
              </ListGroup.Item>
              <ListGroup.Item className={"d-flex align-items-center"}>
                <label className={sLabelClass}>Links:</label>
                <div className={"w-25 d-inline-block"}>
                  <label className={"d-block"}><a href={oCompanyInfo.links.website} target="_black">{oCompanyInfo.links.website}</a></label>
                  <label className={"d-block"}><a href={oCompanyInfo.links.flickr} target="_black">{oCompanyInfo.links.flickr}</a></label>
                  <label className={"d-block"}><a href={oCompanyInfo.links.twitter} target="_black">{oCompanyInfo.links.twitter}</a></label>
                  <label className={"d-block"}><a href={oCompanyInfo.links.elon_twitter} target="_black">{oCompanyInfo.links.elon_twitter}</a></label>
                </div>
              </ListGroup.Item>
            </ListGroup>
          }
        </Col>
      </Row>
    </section>
  );
}


export default CompanyInfo;