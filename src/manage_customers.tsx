import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.tsx';
//import './index.css'
import './MyForm.css'
import Button from "./button.tsx"
import Table from './table.tsx'
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
i18n.init({
  interpolation: { escapeValue: false }, // React già effettua l'escaping
  lng: 'en', // Lingua predefinita
  resources: {
    en: {
      translation: require('./locales/en.json'),
    },
    it: {
      translation: require('./locales/it.json'),
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   
   <Button/>
   <Table/>
  </React.StrictMode>,
)
