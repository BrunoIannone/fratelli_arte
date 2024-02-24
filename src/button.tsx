import { useState } from 'react';
//import { useTranslation, Trans } from 'react-i18next';
import { useTranslation} from 'react-i18next';

const Button = () => {
  
  const { t } = useTranslation();

  const [response, setResponse] = useState('');

  const handleFetch = async () => {
    try {
      const result = await fetch('http://192.168.1.18:3000/recoverUserData');
      const data = await result.text();
      setResponse(data);
    } catch (error) {
      console.error('Errore durante la richiesta Fetch:', error);
      setResponse('Errore durante la richiesta Fetch');
    }
  };

  return (
    <div>
      <h1>Applicazione React con Fetch</h1>
      
      <button onClick={handleFetch}>{t("DoFetch")}</button>
      
      <div>
        <strong>{t("ServerAnswer")}:</strong> {response}
      </div>
    </div>
  );
};

export default Button;
