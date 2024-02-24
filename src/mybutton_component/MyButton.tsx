// Importa le librerie necessarie
//import React, { useEffect } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';

// Componente principale

interface MyButtonProps {
  text: string;
  href: string;
  
}
const MyButton: React.FC<MyButtonProps> = ({ text, href}) => {
  const { t } = useTranslation();

  return (
    <div>
      <a href={href}>
        <button >{t(text)}</button>
      </a>
    </div>
  );
};


export default MyButton;
