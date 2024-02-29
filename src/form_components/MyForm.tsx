import { useState } from "react";
import "./MyForm.css"; // Import the CSS file for styling
import toastr from "toastr";
import 'toastr/build/toastr.min.css';

const MyForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    id_fidelity_card: "",
    telephone_number: "",
    cap: "",
    date_birth: "",
  });
  
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.address = formData.address.trim()
    formData.first_name = formData.first_name.trim()
    formData.last_name = formData.last_name.trim()
    try {
      const response = await fetch("http://192.168.1.18:3000/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const responseData = await response.json();

      if (response.ok){
        setFormData(
          {
          first_name: "",
          last_name: "",
          address: "",
          email: "",
          id_fidelity_card: "",
          telephone_number: "",
          cap: "",
          date_birth: "",}); 
          toastr.success('Dati inviati correttamente!', 'Invio Riuscito');
          }
      else{
        if (responseData.errno === 1062){
          toastr.error("Attenzione! Stai cercando di inserire un numero di telefono o una mail già utilizzati per qualche altro utente!.", "Rilevato telefono o e-mail duplicati", { closeButton: true, progressBar: true, timeOut: 5000, extendedTimeOut: 2000});

        }

      }
          

    } catch (error) {
      toastr.error('The error: <strong style="color: black;">' + error + '</strong>\n occurred. Please, try again or call an engineer', 'Invio fallito', { closeButton: true, progressBar: true, timeOut: 5000, extendedTimeOut: 2000});
    }
    
  };
  return (
    <div className="form-container">
      <h1 style={{ textAlign: "center" }}>Nuova registrazione</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">Nome:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Cognome:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="telephone_number">Numero di telefono:</label>
          <input
            type="tel"
            id="telephone_number"
            name="telephone_number"
            pattern="\d{9,10}"
            title="Il numero deve essere di 10 cifre"
            value={formData.telephone_number}
            onChange={handleInputChange}
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Indirizzo:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cap">CAP:</label>
          <input
            type="text"
            id="cap"
            name="cap"
            value={formData.cap}
            pattern="\d{5}"
            title="Il numero deve essere di 5 cifre"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date_birth">Data di nascita:</label>
          <input
            type="date"
            id="date_birth"
            name="date_birth"
            value={formData.date_birth}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="btn-container">
          <button type="submit">Conferma</button>
        </div>
      </form>
    </div>
  );
};

export default MyForm;
