import React from "react";
import ReactDOM from "react-dom/client";
//import App from './App.tsx';
//import './index.css'
import "./manage_customers.css";
import Table from "./table.tsx";
import "./i18n";
import RegistrationPage from "./registration_btn.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RegistrationPage/>
    <Table />
  </React.StrictMode>
);
