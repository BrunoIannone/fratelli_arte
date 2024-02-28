import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./table.css"; // Import the external CSS file for styling
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "../css/manage_customers.css";
import { Customer } from "./customer";
import CustomerTable from "./customer_table";
/**
 * Class for customers table showing
 *
 * @return {*} Built table with customers data after the query
 */

const Table = () => {
  const { t } = useTranslation();

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

  const [nameValue, setNameValue] = useState("");
  const [surnameValue, setSurnameValue] = useState("");
  const [telNumValue, setTelNumValue] = useState("");

  /**
   *Function that handles selected attributes checkboxes
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
   const handleAttributeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedAttribute = event.target.value;
  
    setSelectedAttributes((prevAttributes) => {
      const selectedSet = new Set(prevAttributes);
      if (selectedSet.has(selectedAttribute)) {
        selectedSet.delete(selectedAttribute);
      } else {
        selectedSet.add(selectedAttribute);
      }
  
      const defaultAttributeOrder: { [key: string]: number } = {
        customer_id: 0,
        first_name: 1,
        last_name: 2,
        address: 3,
        email: 4,
        id_fidelity_card: 5,
        telephone_number: 6,
        cap: 7,
        date_birth: 8,
        active: 9,
      };
  
      const sortedAttributes = Array.from(selectedSet).sort(
        (a, b) => defaultAttributeOrder[a] - defaultAttributeOrder[b]
      );
  
      /*setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          sortedAttributes.reduce((updatedCustomer, attr) => {
            updatedCustomer[attr] = customer[attr as keyof typeof customer];
            console.log(prevCustomers,"PREV")

            return updatedCustomer;
          }, { ...customer })
          
        )

      );*/
  
      return sortedAttributes;
    });
  };
  

  /**
   *AUX Function for retrieving user data according to selected attributes
   *
   * @param {string} query
   */

  const fetchUserData = async (query: string) => {
    try {
      const timeoutPromise = new Promise((_resolve, reject) => {
        setTimeout(() => {
          reject(new Error("Request timed out"));
        }, 10000); // 10 seconds timeout
      });

      const fetchPromise = fetch(
        `http://192.168.1.18:3000/recoverUserData/${query}`
      );

      const result: any = await Promise.race([fetchPromise, timeoutPromise]);

      var data = await result.json();

      for (let i = 0; i < data.length; i++) {
        data[i] = Object.assign({}, emptyCustomer, data[i]);
        if (data[i].date_birth != "") {
          data[i].date_birth = data[i].date_birth.split("T")[0];
        }
      }

      if (data.length === 0) {
        toastr.info(
          "Nessun utente con i parametri selezionati è stato trovato",
          "Utente non trovato",
          {
            closeButton: true,
            progressBar: true,
            timeOut: 5000,
            extendedTimeOut: 2000,
          }
        );

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
          },
        ]);
      } else {
        setCustomers(data);
      }
    } catch (error) {
      toastr.error(
        "Operazione fallita, il server non risponde: provare di nuovo (error occurred in recoverUserData with " +
          error +
          ")",
        "Il server non risponde",
        {
          closeButton: true,
          progressBar: true,
          timeOut: 5000,
          extendedTimeOut: 2000,
        }
      );
    }
  };

  /**
   *Function that builds the query based on the selected attributes and search criteria
   *
   * @return {*}
   */
  const buildQueryFromAttributes = () => {
    var query = "SELECT ";
    var isActive = false;

    if (selectedAttributes.length === 0) {
      toastr.warning(
        "Non hai selezionato nessun attributo!",
        "Selezione vuota",
        {
          closeButton: true,
          progressBar: true,
          timeOut: 5000,
          extendedTimeOut: 2000,
        }
      );
      return;
    }
    // Log a message for each selected attribute
    selectedAttributes.forEach((attribute) => {
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

    // Remove the trailing comma

    if (isActive) {
      query += " IF(active, 'subscribed', 'unsubscribed') as active";

      query +=
        " FROM customer join fidelity_card on customer.id_fidelity_card = fidelity_card.id_fidelity_card";
    } else {
      query = query.slice(0, -1);
      query += " FROM customer";
    }
    query += " WHERE 0=0 ";

    if (nameValue !== "") {
      query += "and first_name = " + "'" + nameValue + "'";
    }
    if (surnameValue !== "") {
      query += " and last_name = " + "'" + surnameValue + "'";
    }
    if (telNumValue !== "") {
      query += " and telephone_number = " + "'" + telNumValue + "'";
    }

    fetchUserData(query);
  };

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
      
      {selectedAttributes.length > 0 && (
      <CustomerTable
        customers={customers}
        selectedAttributes={selectedAttributes}
        
      />
      )}
      {/* Search section */}
      <div className="search-fields-container">
        {/* Field for Name */}

        <span className="cerca-per"> Cerca per:</span>
        <input
          id="name-search-field"
          type="text"
          placeholder={t("first_name")}
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
        />
        {/* Field for Surname */}
        <input
          id="surname-search-field"
          type="text"
          placeholder={t("last_name")}
          value={surnameValue}
          onChange={(e) => setSurnameValue(e.target.value)}
        />
        <input
          id="tel-num-search-field"
          type="text"
          placeholder={t("telephone_number")}
          value={telNumValue}
          onChange={(e) => setTelNumValue(e.target.value)}
        />
      </div>
      <button onClick={buildQueryFromAttributes}>{t("ShowResult")}</button>
    </div>
  );
};

export default Table;
