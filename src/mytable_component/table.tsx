//import React, { useState } from "react";
//import { useTranslation, Trans } from 'react-i18next';
import { useState } from "react";
import "./table.css"; // Import the external CSS file for styling
import { useTranslation} from 'react-i18next';
import toastr from "toastr";
import 'toastr/build/toastr.min.css';
import "../css/manage_customers.css";
import {Customer} from "./customer";

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

  const emptyCustomer = {
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
  const [checkboxState, _setCheckboxState] = useState<boolean>(false);


  const handleAttributeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAttribute = event.target.value;
    console.log(selectedAttribute, "ATT")

    setSelectedAttributes((prevAttributes) => {
      console.log(prevAttributes, "ATT")
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
  
  // AUX Function for retrieving user data according to selected attributes
  const handleFetch = async (query:string) => {
    try {
      const timeoutPromise = new Promise((_resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Request timed out'));
        }, 10000); // 5 seconds timeout
    });

    const fetchPromise = fetch(`http://192.168.1.18:3000/recoverUserData/${query}`);

    const result: any = await Promise.race([fetchPromise, timeoutPromise]);
      

      console.log(result,"RESULT")
      var data = await result.json();

      for (let i = 0; i < data.length; i++) {
        data[i] = Object.assign({}, emptyCustomer, data[i]);
        if (data[i].date_birth != "") {
          data[i].date_birth = data[i].date_birth.split("T")[0];
        }
      }

      console.log(data,"HERE");
      if(data.length === 0){
        toastr.info("Nessun utente con i parametri selezionati è stato trovato", "Utente non trovato",{ closeButton: true, progressBar: true, timeOut: 5000, extendedTimeOut: 2000});
        setCustomers([
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
        }]);
      }
      else{
      setCustomers(data);
      }
    } catch (error) {
      toastr.error("Operazione fallita, il server non risponde: provare di nuovo (error occurred in recoverUserData with " + error + ")", "Il server non risponde",{ closeButton: true, progressBar: true, timeOut: 5000, extendedTimeOut: 2000});
    }
  };
  const handleCheckAll = () => {
    
    var query = "SELECT ";
    var isActive = false;
    console.log(selectedAttributes,"EGOLO");
    if (selectedAttributes.length === 0)
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
    //console.log(query,"Q");

    // Remove the trailing comma

    if (isActive) {
      query += " IF(active, 'subscribed', 'unsubscribed') as active";

      query +=
        " FROM customer join fidelity_card on customer.id_fidelity_card = fidelity_card.id_fidelity_card";
    } else {
      query = query.slice(0, -1);
      query += " FROM customer";
    }
    query += " WHERE 0=0 "
    console.log(nameValue)
    if (nameValue!== ''){
      
      query += "and first_name = " + "'" + nameValue + "'"
    }
    if (surnameValue!== ''){
      
      query += " and last_name = " + "'" + surnameValue + "'"
    }
    if (telNumValue!== ''){
      
      query += " and telephone_number = " + "'" + telNumValue + "'"
    }
    
    
    console.log(query,"Q");
    //const data = handleFetch(query);
    handleFetch(query);

    // Rest of your code
    // setSelectedAttributes((prevAttributes) =>
    //   checkboxState ? [] : Object.keys(customers[0])
    // );
  };
  const [nameValue, setNameValue] = useState('');
  const [surnameValue, setSurnameValue] = useState('');
  const [telNumValue, setTelNumValue] = useState('');

  return (
    <div className="table-container">
      <h1>{t("CustomerTable")}</h1>
      <div className="attribute-selector">
        
        
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
      
      <div className="search-fields-container">
        {/* Field for Name */}
        
        <span className = "cerca-per" > Cerca per:</span>
        <input id="name-search-field"
          type="text"
          placeholder={t("first_name")}
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
        />
        {/* Field for Surname */}
        <input id="surname-search-field"
          type="text"
          placeholder={t("last_name")}
          value={surnameValue}
          onChange={(e) => setSurnameValue(e.target.value)}
        />
        <input id="tel-num-search-field"
          type="text"
          placeholder={t("telephone_number")}
          value={telNumValue}
          onChange={(e) => setTelNumValue(e.target.value)}
        />
      </div>
      <button onClick={handleCheckAll}>
          {t("ShowResult")}
        </button>
    </div>
    
    
  );
};

// Inside the CustomerTable component
const CustomerTable = ({ customers, selectedAttributes }: { customers: Customer[], selectedAttributes: string[] }) => {
  const { t } = useTranslation();

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

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
            {selectedAttributes.map((attribute) => {
              if (attribute === "date_birth") {
                const age = calculateAge(customer[attribute]);
                // Apply conditional styling based on age
                const className = age >= 70 ? "elderly-customer" : "";
                return <td key={attribute} className={className}>{t(customer[attribute])}</td>;
              } else {
                return <td key={attribute}>{t(customer[attribute])}</td>;
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default Table;
