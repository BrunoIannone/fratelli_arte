// MyForm.d.ts
declare module "MyFormModule" {
    interface MyForm2 {
      first_name: string;
      last_name: string;
      address: string;
      email: string;
      id_fidelity_card: string;
      telephone_number: string;
      cap: string;
      date_birth: string;
    }
  
    const MyForm: React.FC<{}>;
  
    export default MyForm;
  }
  