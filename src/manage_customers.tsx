import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.tsx';
//import './index.css'
import './MyForm.css'
import Button from "./button.tsx"
import Table from './table.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   
   <Button/>
   <Table/>
  </React.StrictMode>,
)
