import { gql, useMutation, useQuery } from '@apollo/client'; // Importing Apollo Client hooks and gql for GraphQL queries/mutations
import { useState, useEffect } from 'react'; // Importing React hooks
import { useParams, useNavigate } from 'react-router-dom'; // React Router hooks for accessing route parameters and navigation

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

// GraphQL mutation to update user details
const UPDATE_USER = gql`
  mutation($id: ID!, $name: String, $email: String, $age: Int) {
    updateUser(id: $id, name: $name, email: $email, age: $age) {
      id
    }
  }
`;

export default function UpdateUser() {
  const { id } = useParams(); // Getting the user ID from URL params
  const { data } = useQuery(GET_USER, { variables: { id } }); // Fetching user data using the GET_USER query
  const [updateUser] = useMutation(UPDATE_USER); // Setting up the mutation for updating user data
  const [form, setForm] = useState({ name: '', email: '', age: '' }); // State for form data
  const navigate = useNavigate(); // Function to navigate programmatically

  // Once the data is fetched, populate the form with existing user data
  useEffect(() => {
    if (data) setForm(data.user);
  }, [data]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    await updateUser({ variables: { id, ...form, age: Number(form.age) } }); // Update the user with the form data
    navigate('/'); // Redirect to home page after successful update
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
      <button type="submit">Update</button>
    </form>
  );
}

// Summary:
// This component fetches a user's details from a GraphQL API using `useQuery` and populates a form with the data. 
// It allows the user to update their information and submit the changes via `useMutation`. After submission, 
// the user is redirected to the home page.
