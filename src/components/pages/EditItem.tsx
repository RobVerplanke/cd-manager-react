import { useParams } from 'react-router-dom';

function EditItemPage() {
  const { id } = useParams();
  return <h1>EditItemPage{id}</h1>;
}

export default EditItemPage;
