// Inside the CustomerTable component
import { useTranslation} from 'react-i18next';
import { Customer} from './customer';
import "../css/manage_customers.css";

const calculateAge = (dateOfBirth: Date): number => {
    const today = new Date();
    const birthDate = dateOfBirth;
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  function formatDate(date: Date) {
    // Ottieni giorno, mese e anno dalla data
    const day = date.getDate();
    // Aggiungi 1 al mese poiché i mesi in JavaScript vanno da 0 a 11
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Formatta giorno, mese e anno in stringa
    const formattedDay = (day < 10 ? '0' : '') + day;
    const formattedMonth = (month < 10 ? '0' : '') + month;

    // Restituisci la data formattata
    return formattedDay + '-' + formattedMonth + '-' + year;
}

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
              {selectedAttributes.map((attribute) => {
                if (customer[attribute]  === ''){
                    return <td key={attribute}> </td>;

                }
                else if (attribute === "date_birth") {
                  const dateOfBirth = new Date(customer[attribute]);
                  const age = calculateAge(dateOfBirth);
                  // Apply conditional styling based on age
                  const className = age >= 70 ? "elderly-customer" : "";
                  return <td key={attribute} className={className}>{formatDate(dateOfBirth)}</td>;
                } 
                else if (attribute === 'active'){
                    const subscribedDate = new Date(customer[attribute]);
                    const age = calculateAge(subscribedDate);
                    const className = age >= 1 ? "unsubscribed-customer" : "";

                    return <td key={attribute} className={className}>{formatDate(subscribedDate)}</td>;

                }
                
                
                else {
                  if(!customer[attribute]){
                    return <td style={{ backgroundColor: "gray" }} key={attribute}>{customer[attribute]}</td>;
                  }
                  else{
                  return <td key={attribute}>{customer[attribute]}</td>;
                  }
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  export default CustomerTable;
