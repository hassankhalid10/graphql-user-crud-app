import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the GraphQL mutation for creating a user
const CREATE_USER = gql`
  mutation($name: String!, $email: String!, $age: Int) {
    createUser(name: $name, email: $email, age: $age) {
      id
    }
  }
`;

export default function CreateUser() {
  // Local state to manage form values
  const [form, setForm] = useState({ name: '', email: '', age: '' });
  // Apollo hook to execute the mutation
  const [createUser] = useMutation(CREATE_USER);
  // Hook to navigate programmatically after form submission
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Execute the mutation with the form data and navigate
    await createUser({ variables: { ...form, age: Number(form.age) } });
    navigate('/');
  };

  return (
    // Form for capturing user details
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Age"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />
      <button type="submit">Create</button>
    </form>
  );
}

// Explanation:
// This component allows the user to create a new user by submitting their name, email, and age.
// It uses Apollo Client's `useMutation` hook to execute the `CREATE_USER` mutation,
// and once the user is created, it navigates to the homepage (`'/'`) using `useNavigate`.
