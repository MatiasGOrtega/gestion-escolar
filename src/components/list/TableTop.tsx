import TableSearch from "@/components/list/TableSearch";
import { Button } from "@/components/ui/button";
import {
  ArrowDownWideNarrowIcon,
  PlusIcon,
  SlidersHorizontalIcon,
} from "lucide-react";

function TableTop({ nameTable }: { nameTable: string }) {
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
          <Button variant="outline" size="icon">
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TableTop;
