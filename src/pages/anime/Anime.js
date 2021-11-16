import {useQuery} from '@apollo/client';
import RocketList from 'queries/RocketList.gql';

function Anime() {
  const {loading, error, data} = useQuery(RocketList);

  console.log(data?.Page?.media[0]); 
  if(loading) return(<> Loading</>);
  if(error) return(<>{JSON.stringify(error)}</>)
  return (
   <div className="container"> 
     <h1> 🐈 Anime List </h1>
     <hr width="80%" />
   {data?.company?.ceo}
   </div>);
}

export default Anime;