import {gql} from '@apollo/client';

const CompanyInfoGQL = gql`
{
  company {
    name
    founder
    founded
    ceo
    coo
    cto
    cto_propulsion
    employees
    valuation
    summary
    headquarters {
      address
      city
      state
    }
    links {
      elon_twitter
      flickr
      twitter
      website
    }
  }
}
`;

export default CompanyInfoGQL;