// Importa le librerie necessarie
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Componente principale
const RegistrationPage: React.FC = () => {
  const { t} = useTranslation();

  
  return (
    <div>
      <a href="index.html">
        <button id="registrationButton">{t("registration")}</button>
      </a>

    </div>
  );
};

export default RegistrationPage;
