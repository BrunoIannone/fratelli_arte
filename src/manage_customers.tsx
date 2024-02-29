import React from "react";
import ReactDOM from "react-dom/client";
import Table from "./mytable_component/table.tsx";
import "./i18n";
import MyButton from "./mybutton_component/MyButton.tsx"
import ShutdownButton from "./shutdown_btn/shutdown_btn.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MyButton text="registration" href="index.html"/>
    <Table />
    <ShutdownButton imageUrl="src/assets/shutdown-icon.png"/>
  </React.StrictMode>
);
