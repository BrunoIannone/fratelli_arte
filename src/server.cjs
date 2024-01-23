// server.js
const express = require('express');
const cors = require('cors'); // Importa il pacchetto cors
const app = express();
const db = require('./database.cjs'); // Assicurati di utilizzare il percorso corretto

// ... altre configurazioni ...
app.use(cors());

app.get('/eseguiQuery', async (req, res) => {
  try {
    // Chiamata alla funzione asincrona del modulo db.js
    const q=await db.asyncFunction();

    // Rispondi al client
    res.send(q);
  } catch (error) {
    console.error(error);
    res.status(500).send('Errore durante l\'esecuzione della query');
  }
});

// ... altre configurazioni ...

// Avvia il server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
