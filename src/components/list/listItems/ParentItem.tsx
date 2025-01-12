import FormModal from "@/components/FormModal";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "@/constants/data";
import { EditIcon, TrashIcon } from "lucide-react";

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
      <TableCell className="hidden md:table-cell">
        {parent.students.join(", ")}
      </TableCell>
      <TableCell className="hidden md:table-cell">{parent.phone}</TableCell>
      <TableCell className="hidden lg:table-cell">{parent.address}</TableCell>
      <TableCell className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="parent" type="update" data={parent}>
              <EditIcon className="w-4 h-4" />
            </FormModal>
            <FormModal table="parent" type="delete" id={parent.id}>
              <TrashIcon className="w-4 h-4" />
            </FormModal>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}

export default ParentItem;
