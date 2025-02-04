import FormContainer from "@/components/form/FormContainer";
import { TableCell, TableRow } from "@/components/ui/table";
import { auth } from "@clerk/nextjs/server";
import { Class, Teacher } from "@prisma/client";
import { EditIcon, TrashIcon } from "lucide-react";

type ClassItemProps = Class & { supervisor: Teacher };

async function ClassItem(classItem: ClassItemProps) {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  return (
    <TableRow key={classItem.id}>
      <TableCell>{classItem.name}</TableCell>
      <TableCell className="hidden md:table-cell">
        {classItem.capacity}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {classItem.name[0]}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {classItem.supervisor.name + " " + classItem.supervisor.surname}
      </TableCell>
      <TableCell className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormContainer table="class" type="update" data={classItem}>
              <EditIcon className="w-5 h-5" />
            </FormContainer>
            <FormContainer table="class" type="delete" id={classItem.id}>
              <TrashIcon className="w-5 h-5" />
            </FormContainer>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}

export default ClassItem;
