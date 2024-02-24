// customer.ts

export interface Customer {
    customer_id: string;
    first_name: string;
    last_name: string;
    address: string;
    email: string;
    id_fidelity_card: string;
    telephone_number: string;
    cap: string;
    date_birth: string;
    active: string;
    [key: string]: string;
  }
  