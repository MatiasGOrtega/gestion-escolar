import { JSX } from "react";

interface Data {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    bloodType: string;
    dateOfBirth: string;
    sex: string;
    img: string;
}

type FormProps = {
  type: string;
  table: string;
  data?: Data;
  id?: number | string ;
  forms: {
    [key: string]: (type: "create" | "update", data?: Data) => JSX.Element;
  };
}

function Form({ type, table, id, data, forms }: FormProps) {
  return type === "delete" && id ? (
    <form action="" className="p-4 flex flex-col gap-4">
      <span className="text-center font-medium">
        All data will be lost. Are you sure you want to delete this {table}?
      </span>
      <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
        Delete
      </button>
    </form>
  ) : type === "create" || type === "update" ? (
    forms[table](type, data)
  ) : (
    "Form not found!"
  );
}

export default Form;
