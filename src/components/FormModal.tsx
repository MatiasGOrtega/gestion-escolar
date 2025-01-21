"use client";
import { JSX, useState } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import Form from "./forms/Form";

const TeacherForm = dynamic(() => import("./teacher/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./student/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});

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

const forms: {
  [key: string]: (type: "create" | "update", data?: Data) => JSX.Element;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
};

type FormModalProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
  children?: React.ReactNode;
};

function FormModal({ table, type, data, id, children }: FormModalProps) {
  const bgColor =
    type === "create"
      ? "bg-yellow-200"
      : type === "update"
      ? "bg-sky-200"
      : "bg-purple-200";

  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className={clsx(
          "flex items-center justify-center",
          bgColor,
        )}
        onClick={() => setOpen(true)}
      >
        {children}
      </Button>
      {open && (
        <div className="w-full h-full absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form type={type} table={table} id={id} data={data} forms={forms} />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default FormModal;
