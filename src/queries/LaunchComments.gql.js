import {gql} from '@apollo/client';

const LaunchCommentsGQL = gql`
query getLaunchComments($sLaunchId: ID!) {
  launch (id: $sLaunchId) {
    id
    name
    flight_number
    success
    date_utc
    comments {
      user_name
      message
    }
  }
}
`;

export default LaunchCommentsGQL;