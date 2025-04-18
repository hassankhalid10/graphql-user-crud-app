import { gql, useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';

// GraphQL query to fetch user details by ID
const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      name
      email
      age
    }
  }
`;

// GraphQL mutation to delete a user by ID
const DELETE_USER = gql`
  mutation($id: ID!) {
    deleteUser(id: $id)
  }
`;

export default function UserDetail() {
  // Get the user ID from the URL parameter
  const { id } = useParams();
  
  // Fetch user data using the GET_USER query
  const { data } = useQuery(GET_USER, { variables: { id } });
  
  // Initialize the deleteUser mutation
  const [deleteUser] = useMutation(DELETE_USER);
  
  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Handle user deletion and navigate to home page
  const handleDelete = async () => {
    await deleteUser({ variables: { id } });
    navigate('/'); // Redirect to the home page after deletion
  };

  // Show a loading state while data is being fetched
  if (!data) return <p>Loading...</p>;

  // Render the user details and the delete button
  return (
    <div>
      <h2>{data.user.name}</h2>
      <p>Email: {data.user.email}</p>
      <p>Age: {data.user.age}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

/*
  Summary:
  - This component fetches and displays user details using GraphQL's `useQuery` hook.
  - It allows the user to delete their data via a GraphQL mutation (`useMutation`).
  - Upon successful deletion, the user is redirected to the homepage using `useNavigate`.
*/
