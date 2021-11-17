import {gql} from '@apollo/client';

const LaunchDetailsGQL = gql`
query ($sLaunchId: ID!) {
  launch (id: $sLaunchId) {
    id
    name
    flight_number
    success
    date_utc
    details
    links {
      flickr{
        original
      }
      wikipedia
    }
    rocket {
      id
      name
      type
      active
      boosters
      cost_per_launch
      success_rate_pct
      first_flight
      country
      wikipedia
      description
      flickr_images
    }
  }
}
`;

export default LaunchDetailsGQL;