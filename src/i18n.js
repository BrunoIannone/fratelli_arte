import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          
          
          CustomerTable: "Customer Table",
          ShowResult: "Show customers",
          first_name: "First Name",
          last_name: "Last name",
          date_birth: "Date birth",
          active: "Subscribed",
          id_fidelity_card: "Fidelity Card ID",
          telephone_number: "Telephone number",
          address: "Address",
          cap: "Cap",
          customer_id: "Customer ID",
          email: "E-mail",
          registration: "Registration",
          unsubscribed: "Unsubscribed",
          subscribed: "Iscritto",
        },
      },
      it: {
        translation: {
          
          //############## TABLE ###############
          CustomerTable: "Elenco Clienti",
          ShowResult: "Mostra Clienti",
          first_name: "Nome",
          last_name: "Cognome",
          date_birth: "Data di nascita",
          active: "Iscritto",
          id_fidelity_card: "ID Carta Fedeltà",
          telephone_number: "Numero di telefono",
          address: "Indirizzo",
          cap: "CAP",
          customer_id: "ID Cliente",
          email: "E-mail",
          registration: "Registrazione",
          subscribed: "Iscritto",
          unsubscribed: "Non iscritto",
          //#####################################
        },
      },
    },
  });

export default i18n;
