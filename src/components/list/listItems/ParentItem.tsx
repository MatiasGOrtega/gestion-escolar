import { Button, buttonVariants } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "@/constants/data";
import { EditIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

type Parent = {
  id: number;
  name: string;
  email?: string;
  students: string[];
  phone: string;
  address: string;
};

function ParentItem(parent: Parent) {
  return (
    <TableRow key={parent.id}>
      <TableCell className="flex items-center gap-2">
        <div className="flex flex-col">
          <h3 className="font-semibold">{parent.name}</h3>
          <p className="text-xs text-gray-500">{parent?.email}</p>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">{parent.students.join(', ')}</TableCell>
      <TableCell className="hidden md:table-cell">{parent.phone}</TableCell>
      <TableCell className="hidden lg:table-cell">{parent.address}</TableCell>
      <TableCell className="flex items-center gap-2">
        <Link
          href={`/list/students/${parent.id}`}
          className={`${buttonVariants({
            variant: "outline",
            size: "icon",
          })} bg-yellow-200 hover:bg-yellow-300`}
        >
          <EditIcon className="w-4 h-4" />
        </Link>
        {role === "admin" && (
          <Button
            variant="outline"
            size="icon"
            className="bg-purple-200 hover:bg-purple-300"
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}

export default ParentItem