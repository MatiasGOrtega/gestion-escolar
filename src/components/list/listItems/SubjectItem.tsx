import FormModal from "@/components/FormModal";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "@/constants/data";
import { EditIcon, TrashIcon } from "lucide-react";

type Subject = {
  id: number;
  name: string;
  teachers: string[];
};

function SubjectItem(subject: Subject) {
  return (
    <TableRow key={subject.id}>
      <TableCell>{subject.name}</TableCell>
      <TableCell className="hidden md:table-cell">
        {subject.teachers.join(", ")}
      </TableCell>
      <TableCell className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="subject" type="update" data={subject}>
              <EditIcon className="w-4 h-4" />
            </FormModal>
            <FormModal table="subject" type="delete" id={subject.id}>
              <TrashIcon className="w-4 h-4" />
            </FormModal>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}

export default SubjectItem;
