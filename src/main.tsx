import React from "react";
import ReactDOM from "react-dom/client";
import MyForm from "./form_components/MyForm.tsx";
import "./i18n";
import MyButton from "./mybutton_component/MyButton.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MyButton text="ShowResult" href="manage_customers.html"/>
    <MyForm />
  </React.StrictMode>
);
