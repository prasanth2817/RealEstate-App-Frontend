import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./Styles/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from "./Contexts/AuthContext.jsx";
import { RoleProvider } from "./Contexts/RoleContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RoleProvider>
      <App />
      </RoleProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
