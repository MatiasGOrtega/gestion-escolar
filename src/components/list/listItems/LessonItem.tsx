import FormModal from "@/components/FormModal";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "@/constants/data";
import { EditIcon, TrashIcon } from "lucide-react";

type Lesson = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
};

function LessonItem(lesson: Lesson) {
  return (
    <TableRow key={lesson.id}>
      <TableCell>{lesson.subject}</TableCell>
      <TableCell className="hidden md:table-cell">{lesson.class}</TableCell>
      <TableCell className="hidden md:table-cell">{lesson.teacher}</TableCell>
      <TableCell className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="lesson" type="update" data={lesson}>
              <EditIcon className="w-4 h-4" />
            </FormModal>
            <FormModal table="lesson" type="delete" id={lesson.id}>
              <TrashIcon className="w-4 h-4" />
            </FormModal>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}

export default LessonItem;
