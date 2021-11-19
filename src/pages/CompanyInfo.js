import {useQuery} from '@apollo/client';
import { Col, ListGroup, Row } from "react-bootstrap";
import CompanyInfoGQL from 'queries/CompanyInfo.gql';
import Loading from "components/Loading";
import ErrorMessage from "components/ErrorMessage";

function CompanyInfo() {
  const {loading, error, data} = useQuery(CompanyInfoGQL);
  const sLabelClass = "w-25 d-inline-block text-end pe-4 fw-bold";

  if(loading) {
    return <Loading />;
  }

  if(error) {
    return <ErrorMessage message={error.message}/>;
  }

  return (
    <section className="container">
      <Row className={"my-3"}>
        <Col>
          <h4>Company info</h4>
        </Col>
      </Row>
      <Row className={"my-3"}>
        <Col>
          {<ListGroup>
              <ListGroup.Item>
                <label className={sLabelClass}>Name:</label>
                {data.company.name}
              </ListGroup.Item>
              <ListGroup.Item>
                <label className={sLabelClass}>Founder:</label>
                {data.company.founder}
              </ListGroup.Item>
              <ListGroup.Item>
                <label className={sLabelClass}>Founded:</label>
                {data.company.founded}
              </ListGroup.Item>
              <ListGroup.Item>
                <label className={sLabelClass}>CEO:</label>
                {data.company.ceo}
              </ListGroup.Item>
              <ListGroup.Item>
                <label className={sLabelClass}>COO:</label>
                {data.company.coo}
              </ListGroup.Item>
              <ListGroup.Item>
                <label className={sLabelClass}>CTO:</label>
                {data.company.cto}
              </ListGroup.Item>
              <ListGroup.Item>
                <label className={sLabelClass}>CTO Propulsion:</label>
                {data.company.cto_propulsion}
              </ListGroup.Item>
              <ListGroup.Item>
                <label className={sLabelClass}>Employees:</label>
                {data.company.employees}
              </ListGroup.Item>
              <ListGroup.Item>
                <label className={sLabelClass}>Valuation:</label>
                {data.company.valuation}
              </ListGroup.Item>
              <ListGroup.Item className={"d-flex align-items-center"}>
                <label className={sLabelClass}>Summary:</label>
                <label className={"w-75 d-inline-block"}>{data.company.summary}</label>
              </ListGroup.Item>
              <ListGroup.Item className={"d-flex align-items-center"}>
                <label className={sLabelClass}>Headquarters:</label>
                <label className={"w-75 d-inline-block"}>{data.company.headquarters.address}, {data.company.headquarters.city}, {data.company.headquarters.state}</label>
              </ListGroup.Item>
              <ListGroup.Item className={"d-flex align-items-center"}>
                <label className={sLabelClass}>Links:</label>
                <div className={"w-25 d-inline-block"}>
                  <label className={"d-block"}><a href={data.company.links.website} target="_black">{data.company.links.website}</a></label>
                  <label className={"d-block"}><a href={data.company.links.flickr} target="_black">{data.company.links.flickr}</a></label>
                  <label className={"d-block"}><a href={data.company.links.twitter} target="_black">{data.company.links.twitter}</a></label>
                  <label className={"d-block"}><a href={data.company.links.elon_twitter} target="_black">{data.company.links.elon_twitter}</a></label>
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