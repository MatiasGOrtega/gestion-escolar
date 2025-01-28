import FormModal from "@/components/FormModal";
import { TableCell, TableRow } from "@/components/ui/table";
import { auth } from "@clerk/nextjs/server";
import { Class, Exam, Subject, Teacher } from "@prisma/client";
import { EditIcon, TrashIcon } from "lucide-react";

type ExamItemProps = Exam & {
  lesson: {
    subject: Subject;
    class: Class;
    teacher: Teacher;
  };
};

async function ExamItem(exam: ExamItemProps) {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  return (
    <TableRow key={exam.id}>
      <TableCell className="flex items-center gap-2">
        {exam.lesson.subject.name}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {exam.lesson.class.name}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {exam.lesson.teacher.name + " " + exam.lesson.teacher.surname}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {new Intl.DateTimeFormat("en-US").format(exam.startTime)}
      </TableCell>
      <TableCell className="flex items-center gap-2">
        {(role === "admin" || role === "teacher") && (
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
