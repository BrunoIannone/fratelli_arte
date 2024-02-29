// server.js
const express = require("express");
const cors = require("cors"); // Importa il pacchetto cors
const app = express();
const db = require("./database.cjs"); // Assicurati di utilizzare il percorso corretto
const bodyParser = require("body-parser");

// ... altre configurazioni ...
app.use(cors());
app.use(bodyParser.json());


app.get("/recoverUserData/:query", async (req, res) => {
  try {
    // Chiamata alla funzione asincrona del modulo db.js
    const query = req.params.query;
    console.log(query);
    const q = await db.recoverUserData(query);

    // Rispondi al client
    res.json(q);
  } catch (error) {
    console.error(error);
    res.status(500).send("Errore durante l'esecuzione della query");
  }
});
app.use(bodyParser.json());

app.post("/addFidelityCard", async (req, res) => {
  const formData = req.body;
  try {
    const q = await db.addFidelityCard();
    res.send(q);
  } catch (error) {
    console.error(error);
    res.status(500).send("Errore durante l'esecuzione della query");
  }
});
app.post("/addUser", async (req, res) => {
  try {
    const formData = req.body;
    const q = await db.addUser(formData, res);
    if (q) {
      res.status(200).json({ success: true, message: "Daje" });
    }
  } catch (error) {
    console.error(error);
    console.log(error.errno);
    res
      .status(500)
      .json({
        success: false,
        message: "Errore durante l'esecuzione della query",
        errno: error.errno,
      });
  }
});
app.post('/shutdown', (req, res) => {
  try {
    exec('shutdown -h now', (error, stdout, stderr) => {
      if (error) {
        console.error(`Command error: ${error.message}`);
        return res.status(500).send('Internal server error');
      }
      
      console.log(`Command output: ${stdout}`);
      console.error(`Command errors: ${stderr}`);
      
      res.status(200).send('Shutdown command executed successfully');
    });
  } catch (error) {
    console.error(`Error in try-catch block: ${error.message}`);
    return res.status(500).send('Internal server error');
  }
});
// ... altre configurazioni ...

// Avvia il server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
