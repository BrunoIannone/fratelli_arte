//import React, { useState } from "react";
//import { useTranslation, Trans } from 'react-i18next';
import { useState } from "react";
import "./table.css"; // Import the external CSS file for styling
import { useTranslation} from 'react-i18next';
import toastr from "toastr";
import 'toastr/build/toastr.min.css';
import "../css/manage_customers.css"
import {Customer} from "./customer"
const Table = () => {
  
  const { t } = useTranslation();

  // Example customer data
  const [customers, setCustomers] = useState<Customer[]>([
    {
      customer_id: "",
      first_name: "",
      last_name: "",
      address: "",
      email: "",
      id_fidelity_card: "",
      telephone_number: "",
      cap: "",
      date_birth: "",
      active: "",
    },
  ]);

  const voidCustomer = {
    customer_id: "",
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    id_fidelity_card: "",
    telephone_number: "",
    cap: "",
    date_birth: "",
    active: "",
  };

  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
  //const [checkboxState, setCheckboxState] = useState<boolean>(false);
  const [checkboxState] = useState<boolean>(false);


  const handleAttributeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAttribute = event.target.value;
  
    setSelectedAttributes((prevAttributes) => {
      let updatedAttributes: string[]; 
      if (prevAttributes.includes(selectedAttribute)) {
        // If the attribute is already selected, remove it
        updatedAttributes = prevAttributes.filter((attr) => attr !== selectedAttribute);
      } else {
        // If the attribute is not selected, add it at the end
        updatedAttributes = [...prevAttributes, selectedAttribute];
      }
  
      // Define the default order of attributes
      const defaultAttributeOrder = [
        "customer_id",
        "first_name",
        "last_name",
        "address",
        "email",
        "id_fidelity_card",
        "telephone_number",
        "cap",
        "date_birth",
        "active",
      ];
  
      // Sort the selected attributes based on the default order
      const sortedAttributes = defaultAttributeOrder.filter((attr) =>
        updatedAttributes.includes(attr)
      );
  
      // Update the state with the sorted attributes
      setCustomers((prevCustomers) => {
        return prevCustomers.map((customer) => {
          const updatedCustomer: { [key: string]: any } = {};
          sortedAttributes.forEach((attr) => {
          updatedCustomer[attr] = customer[attr as keyof typeof customer];
          });
          return { ...customer, ...updatedCustomer }; // Merge existing attributes with updated ones
        });
      });
  
      return sortedAttributes;
    });
  };
  
  const handleFetch = async (query:string) => {
    try {
      const result = await fetch(
        `http://localhost:3000/recoverUserData/${query}`
      );
      var data = await result.json();
      console.log(data);

      for (let i = 0; i < data.length; i++) {
        data[i] = Object.assign({}, voidCustomer, data[i]);
        if (data[i].date_birth != "") {
          data[i].date_birth = data[i].date_birth.split("T")[0];
        }
      }

      console.log(data);

      setCustomers(data);
    } catch (error) {
      console.error("Errore durante la richiesta Fetch:", error);
    }
  };
  const handleCheckAll = () => {
    
    var query = "SELECT ";
    var isActive = false;
    console.log(selectedAttributes,"EGOLO");
    if (selectedAttributes.length ===0)
    {
      toastr.warning("Non hai selezionato nessun attributo!", "Selezione vuota",{ closeButton: true, progressBar: true, timeOut: 5000, extendedTimeOut: 2000});
      return;
    }
    // Log a message for each selected attribute
    selectedAttributes.forEach((attribute) => {
      console.log(`Checkbox for attribute "${attribute}" is Active`);
      if (attribute === "active") {
        isActive = true;
      }

      // Add the selected attribute to the query
      else if (attribute === "id_fidelity_card") {
        query += "customer." + String(attribute) + ",";
      } else {
        query += attribute + ",";
      }
    });
    console.log(query);

    // Remove the trailing comma

    if (isActive) {
      query += " IF(active, 'subscribed', 'unsubscribed') as active";

      query +=
        " FROM customer join fidelity_card on customer.id_fidelity_card = fidelity_card.id_fidelity_card";
    } else {
      query = query.slice(0, -1);
      query += " FROM customer";
    }

    console.log(query);
    //const data = handleFetch(query);
    handleFetch(query);

    // Rest of your code
    // setSelectedAttributes((prevAttributes) =>
    //   checkboxState ? [] : Object.keys(customers[0])
    // );
  };

  return (
    <div className="table-container">
      <h1>{t("CustomerTable")}</h1>
      <div className="attribute-selector">
        <button onClick={handleCheckAll}>
          {t("ShowResult")}
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
            {t(attribute)}
          </label>
        ))}
      </div>
      <CustomerTable
        customers={customers}
        selectedAttributes={selectedAttributes}
      />
    </div>
  );
};

const CustomerTable = ({ customers, selectedAttributes }: { customers: Customer[], selectedAttributes: string[] }) => {
  const { t } = useTranslation();

  return (
    <table className="customer-table">
      <thead>
        <tr>
          {selectedAttributes.map((attribute) => (
            <th key={attribute}>{t(attribute)}</th>
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
