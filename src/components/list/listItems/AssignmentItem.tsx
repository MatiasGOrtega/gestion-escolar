import FormModal from "@/components/FormModal";
import { TableCell, TableRow } from "@/components/ui/table";
import { auth } from "@clerk/nextjs/server";
import { Assignment, Class, Subject, Teacher } from "@prisma/client";
import { EditIcon, TrashIcon } from "lucide-react";

type AssignmentItemProps = Assignment & {
  lesson: {
    subject: Subject;
    class: Class;
    teacher: Teacher;
  };
};

async function AssignmentItem(assignment: AssignmentItemProps) {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  return (
    <TableRow key={assignment.id}>
      <TableCell>{assignment.lesson.subject.name}</TableCell>
      <TableCell className="hidden md:table-cell">
        {assignment.lesson.class.name}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {assignment.lesson.teacher.name +
          " " +
          assignment.lesson.teacher.surname}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {new Intl.DateTimeFormat("en-US").format(new Date(assignment.dueDate))}
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
