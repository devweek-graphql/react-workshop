import {gql} from '@apollo/client';

const LaunchDetailsGQL = gql`
{
  launch (id: "id") {
    id
    name
    flight_number
    success
    date_utc
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
      first_flight
      country
      wikipedia
      wikipedia
      description
      flickr_images
    }
  }
}
`;

export default LaunchDetailsGQL;