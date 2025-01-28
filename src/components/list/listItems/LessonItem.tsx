import FormModal from "@/components/FormModal";
import { TableCell, TableRow } from "@/components/ui/table";
import { auth } from "@clerk/nextjs/server";
import { Class, Lesson, Subject, Teacher } from "@prisma/client";
import { EditIcon, TrashIcon } from "lucide-react";

type LessonItemProps = Lesson & { subject: Subject } & { class: Class } & {
  teacher: Teacher;
};

async function LessonItem(lesson: LessonItemProps) {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  return (
    <TableRow key={lesson.id}>
      <TableCell>{lesson.subject.name}</TableCell>
      <TableCell className="hidden md:table-cell">
        {lesson.class.name}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {lesson.teacher.name + " " + lesson.teacher.surname}
      </TableCell>
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
