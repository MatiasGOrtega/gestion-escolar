import FormModal from "@/components/FormModal";
import { TableCell, TableRow } from "@/components/ui/table";
import { auth } from "@clerk/nextjs/server";
import { Subject, Teacher } from "@prisma/client";
import { EditIcon, TrashIcon } from "lucide-react";

type SubjectItemProps = Subject & { teachers: Teacher[] };

async function SubjectItem(subject: SubjectItemProps) {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  return (
    <TableRow key={subject.id}>
      <TableCell>{subject.name}</TableCell>
      <TableCell className="hidden md:table-cell">
        {subject.teachers.map((teacher) => teacher.name).join(", ")}
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
