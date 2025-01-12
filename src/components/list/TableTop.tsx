import TableSearch from "@/components/list/TableSearch";
import { Button } from "@/components/ui/button";
import {
  ArrowDownWideNarrowIcon,
  PlusIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import FormModal from "../FormModal";
import { role } from "@/constants/data";

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
};

function TableTop({ table, nameTable }: TableTopProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="hidden md:block text-lg font-semibold">{nameTable}</h1>
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <TableSearch />
        <div className="flex items-center gap-4 self-end">
          <Button variant="outline" size="icon">
            <SlidersHorizontalIcon className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ArrowDownWideNarrowIcon className="w-4 h-4" />
          </Button>
          {role === "admin" && (
            <FormModal table={table} type="create">
              <PlusIcon className="w-4 h-4" />
            </FormModal>
          )}
        </div>
      </div>
    </div>
  );
}

export default TableTop;
