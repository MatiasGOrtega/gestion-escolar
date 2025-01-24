import FormModal from "@/components/FormModal";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "@/constants/data";
import { Class, Teacher } from "@prisma/client";
import { EditIcon, TrashIcon } from "lucide-react";

type ClassItemProps = Class & { supervisor: Teacher};

function ClassItem(classItem: ClassItemProps) {
  return (
    <TableRow key={classItem.id}>
      <TableCell>{classItem.name}</TableCell>
      <TableCell className="hidden md:table-cell">
        {classItem.capacity}
      </TableCell>
      <TableCell className="hidden md:table-cell">{classItem.name[0]}</TableCell>
      <TableCell className="hidden md:table-cell">
        {classItem.supervisor.name + " " + classItem.supervisor.surname}
      </TableCell>
      <TableCell className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="class" type="update" data={classItem}>
              <EditIcon className="w-4 h-4" />
            </FormModal>
            <FormModal table="class" type="delete" id={classItem.id}>
              <TrashIcon className="w-4 h-4" />
            </FormModal>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}

export default ClassItem;
