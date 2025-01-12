import FormModal from "@/components/FormModal";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "@/constants/data";
import { EditIcon, TrashIcon } from "lucide-react";

type Exam = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  date: string;
};

function ExamItem(exam: Exam) {
  return (
    <TableRow key={exam.id}>
      <TableCell className="flex items-center gap-2">{exam.subject}</TableCell>
      <TableCell className="hidden md:table-cell">{exam.class}</TableCell>
      <TableCell className="hidden lg:table-cell">{exam.teacher}</TableCell>
      <TableCell className="hidden lg:table-cell">{exam.date}</TableCell>
      <TableCell className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="exam" type="update" data={exam}>
              <EditIcon className="w-4 h-4" />
            </FormModal>
            <FormModal table="exam" type="delete" id={exam.id}>
              <TrashIcon className="w-4 h-4" />
            </FormModal>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}

export default ExamItem;
