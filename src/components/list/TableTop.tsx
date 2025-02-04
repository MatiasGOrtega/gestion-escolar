import TableSearch from "@/components/list/TableSearch";
import { Button } from "@/components/ui/button";
import {
  ArrowDownWideNarrowIcon,
  PlusIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import FormContainer from "../form/FormContainer";

type TableTopProps = {
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
  nameTable: string;
  role?: string;
};

function TableTop({ table, nameTable, role }: TableTopProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="hidden md:block text-lg font-semibold">{nameTable}</h1>
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <TableSearch />
        <div className="flex items-center gap-4 self-end">
          <button className="shadow hover:shadow-md hover:bg-gray-100 rounded-md p-2">
            <SlidersHorizontalIcon className="w-5 h-5" />
          </button>
          <button className="shadow hover:shadow-md hover:bg-gray-100 rounded-md p-2">
            <ArrowDownWideNarrowIcon className="w-5 h-5" />
          </button>
          {role === "admin" && (
            <FormContainer table={table} type="create">
              <PlusIcon className="w-5 h-5" />
            </FormContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default TableTop;
