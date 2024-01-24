import { useState } from 'react';
import './table.css'; // Import the external CSS file for styling

const Table = () => {
  // Example customer data
  const customers = [
    {
      customer_id: 1,
      first_name: 'John',
      last_name: 'Doe',
      address: '123 Main St',
      email: 'john.doe@example.com',
      id_fidelity_card: 123,
      telephone_number: '555-1234',
      cap: '12345',
      date_birth: '1990-01-01',
    },
    // Add more customer objects as needed
  ];

  const [selectedAttributes, setSelectedAttributes] = useState([]);

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

  return (
    <div className="table-container">
      <h1>Customer Table</h1>
      <div className="attribute-selector">
        {Object.keys(customers[0]).map((attribute) => (
          <label key={attribute} className="attribute-checkbox">
            <input
              type="checkbox"
              checked={selectedAttributes.includes(attribute)}
              onChange={handleAttributeChange}
              value={attribute}
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
