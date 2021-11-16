import {gql} from '@apollo/client';

const RocketListGQL = gql`
{
  rockets {
    id
    name
    launchs {
      id
      name
      flight_number
      date_utc
      date_utc
    }
  }
}
`;

export default RocketListGQL;