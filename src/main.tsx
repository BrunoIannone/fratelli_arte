import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.tsx';
import MyForm from './MyForm.tsx';
//import './index.css'
import './MyForm.css'
import Button from "./button.jsx"
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   
    <MyForm />
    <Button/>
  </React.StrictMode>,
)
