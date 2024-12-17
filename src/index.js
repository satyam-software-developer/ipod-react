import React from "react"; // Import React library to use React components and hooks
import ReactDOM from "react-dom/client"; // Import ReactDOM to render React components to the DOM
import "./css/index.css"; // Import global CSS styles for the application
import App from "./components/App"; // Import the main App component

// Create a root for the React application by selecting the HTML element with id "root"
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component inside the root element
root.render(
  <React.StrictMode>
    {" "}
    {/* Wrapper component to help identify potential problems in the application */}
    <App /> {/* Render the App component */}
  </React.StrictMode>
);
