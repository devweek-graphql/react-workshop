import {gql} from '@apollo/client';

const LaunchAddCommentGQL = gql`
mutation addLaunchComment($sLaunchId: ID!, $user_name: String!, $message: String!) {
  addComment(launch_id: $sLaunchId, comment:{
    user_name: $user_name,
    message: $message
  }){
    launch {
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
}
`;

export default LaunchAddCommentGQL;
