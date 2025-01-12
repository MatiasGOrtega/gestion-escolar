import FormModal from "@/components/FormModal";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "@/constants/data";
import { EditIcon, TrashIcon } from "lucide-react";

type Assignment = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  dueDate: string;
};

function AssignmentItem(assignment: Assignment) {
  return (
    <TableRow key={assignment.id}>
      <TableCell>{assignment.subject}</TableCell>
      <TableCell className="hidden md:table-cell">{assignment.class}</TableCell>
      <TableCell className="hidden md:table-cell">
        {assignment.teacher}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {assignment.dueDate}
      </TableCell>
      <TableCell className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="assignment" type="update" data={assignment}>
              <EditIcon className="w-4 h-4" />
            </FormModal>
            <FormModal table="assignment" type="delete" id={assignment.id}>
              <TrashIcon className="w-4 h-4" />
            </FormModal>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}

export default AssignmentItem;
