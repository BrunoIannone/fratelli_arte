// Inside the CustomerTable component
import { useTranslation} from 'react-i18next';
import { Customer} from './customer';
import "../css/manage_customers.css";

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
                  const age = calculateAge(customer[attribute]);
                  // Apply conditional styling based on age
                  const className = age >= 70 ? "elderly-customer" : "";
                  return <td key={attribute} className={className}>{customer[attribute]}</td>;
                } 
                else if (attribute === 'active'){
                    
                    return <td key={attribute}>{t(customer[attribute])}</td>;

                }
                
                else {
                 
                  return <td key={attribute}>{customer[attribute]}</td>;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  export default CustomerTable;
