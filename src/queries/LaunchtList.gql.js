import {gql} from '@apollo/client';

const LaunchListGQL = gql`
{
  launches {
    id
    name
    flight_number
    date_utc
    rocket {
      name
    }
  }
}
`;

export default LaunchListGQL;