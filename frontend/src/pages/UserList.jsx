import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

// Define the GraphQL query to fetch users
const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

export default function UserList() {
  // Use the useQuery hook to fetch data
  const { data, loading, error } = useQuery(GET_USERS);

  // If the data is still loading, show a loading message
  if (loading) return <p>Loading...</p>;

  // If there's an error during the request, show the error message
  if (error) return <p>Error: {error.message}</p>;

  // If no users are found, show a fallback message
  if (!data || !data.users) return <p>No data found.</p>;

  return (
    <ul>
      {/* Map over the users and render their name and email */}
      {data.users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email}
          {' '}
          {/* Links to view and edit the user details */}
          <Link to={`/user/${user.id}`}>View</Link>
          {' '}
          <Link to={`/update/${user.id}`}>Edit</Link>
        </li>
      ))}
    </ul>
  );
}
