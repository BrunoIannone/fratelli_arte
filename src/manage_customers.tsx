import React from "react";
import ReactDOM from "react-dom/client";
import Table from "./mytable_component/table.tsx";
import "./i18n";
import MyButton from "./mybutton_component/MyButton.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MyButton text="registration" href="index.html"/>
    <Table />
  </React.StrictMode>
);
