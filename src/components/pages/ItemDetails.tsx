import { useParams } from 'react-router-dom';

function ViewItemPAge() {
  const { id } = useParams();
  return <h1>ViewItemPage{id}</h1>;
}

export default ViewItemPAge;
