import { useState } from "react";
import "./MyForm.css"; // Import the CSS file for styling
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
  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("http://localhost:3000/addFidelityCard", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log("Insert successful. Insert ID:", result.insertId);
  //       // You can perform further actions here if needed
  //     } else {
  //       console.error("Insert failed. Server response:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error during fetch:", error.message);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:3000/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      await response.json();
      if (response){
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
          console.log(formData);
          }
  

    } catch (error) {
      console.error("Errore durante la richiesta di inserimento", error);
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
