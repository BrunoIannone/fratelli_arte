import React, { useState } from 'react';

const Button = () => {
  const [response, setResponse] = useState('');

  const handleFetch = async () => {
    try {
      const result = await fetch('http://localhost:3000/eseguiQuery');
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
      <button onClick={handleFetch}>Esegui Fetch</button>
      <div>
        <strong>Risposta dal server:</strong> {response}
      </div>
    </div>
  );
};

export default Button;
