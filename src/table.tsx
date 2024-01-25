import React, { useState } from 'react';
import './table.css'; // Import the external CSS file for styling

const Table = () => {
  // Example customer data
  const [customers, setCustomers] = useState([{
    customer_id: "",
      first_name: "",
      last_name: "",
      address: "",
      email: "",
      id_fidelity_card: "",
      telephone_number: "",
      cap: "",
      date_birth: "",}
  ]);
  
 

  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [checkboxState, setCheckboxState] = useState(false);

  const handleAttributeChange = (event) => {
    const selectedAttribute = event.target.value;
    setSelectedAttributes((prevAttributes) => {
      if (prevAttributes.includes(selectedAttribute)) {
        // If the attribute is already selected, remove it
        return prevAttributes.filter((attr) => attr !== selectedAttribute);
      } else {
        // If the attribute is not selected, add it
        return [...prevAttributes, selectedAttribute];
      }
    });
  };
  const handleFetch = async (query) => {
    try {
      const result = await fetch(`http://localhost:3000/recoverUserData/${query}`);
      const data = await result.json();
      console.log(data);
      setCustomers(data);
      
    } catch (error) {
      console.error('Errore durante la richiesta Fetch:', error);
    }
  };
  const handleCheckAll = () => {
    var query = 'SELECT ';
  
    // Log a message for each selected attribute
    selectedAttributes.forEach((attribute) => {
      console.log(
        `Checkbox for attribute "${attribute}" is Active`
      );
  
      // Add the selected attribute to the query
      query = query + attribute + ",";
    });
  
    // Remove the trailing comma
    query = query.slice(0, -1);
    query +=  " FROM customer"
    console.log(query );
    const data = handleFetch(query);
    
      // Rest of your code
    // setSelectedAttributes((prevAttributes) =>
    //   checkboxState ? [] : Object.keys(customers[0])
    // );
  };

  return (
    <div className="table-container">
      <h1>Customer Table</h1>
      <div className="attribute-selector">
        <button onClick={handleCheckAll}>
          {checkboxState ? 'Uncheck All' : 'Check All'}
        </button>
        {Object.keys(customers[0]).map((attribute) => (
          <label key={attribute} className="attribute-checkbox">
            <input
              type="checkbox"
              checked={selectedAttributes.includes(attribute)}
              onChange={handleAttributeChange}
              value={attribute}
              disabled={checkboxState}
            />
            {attribute}
          </label>
        ))}
      </div>
      <CustomerTable customers={customers} selectedAttributes={selectedAttributes} />
    </div>
  );
};

const CustomerTable = ({ customers, selectedAttributes }) => {
  return (
    <table className="customer-table">
      <thead>
        <tr>
          {selectedAttributes.map((attribute) => (
            <th key={attribute}>{attribute}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {customers.map((customer, index) => (
          <tr key={index}>
            {selectedAttributes.map((attribute) => (
              <td key={attribute}>{customer[attribute]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
