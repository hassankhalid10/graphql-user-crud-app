import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Importing the main App component
import { ApolloProvider } from '@apollo/client';  // Importing ApolloProvider for GraphQL integration
import { client } from './apollo/client';  // Importing the Apollo client instance
import { BrowserRouter } from 'react-router-dom';  // Importing BrowserRouter for routing

// Rendering the React app to the root element in the HTML
ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>  
    <BrowserRouter>  
      <App />  
    </BrowserRouter>
  </ApolloProvider>
);
