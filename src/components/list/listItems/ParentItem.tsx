import FormContainer from "@/components/form/FormContainer";
import { TableCell, TableRow } from "@/components/ui/table";
import { auth } from "@clerk/nextjs/server";
import { Parent, Student } from "@prisma/client";
import { EditIcon, TrashIcon } from "lucide-react";

type ParentItemProps = Parent & { students: Student[] };

async function ParentItem(parent: ParentItemProps) {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  return (
    <TableRow key={parent.id}>
      <TableCell className="flex items-center gap-2">
        <div className="flex flex-col">
          <h3 className="font-semibold">{parent.name}</h3>
          <p className="text-xs text-gray-500">{parent?.email}</p>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {parent.students.map((student) => student.name).join(", ")}
      </TableCell>
      <TableCell className="hidden md:table-cell">{parent.phone}</TableCell>
      <TableCell className="hidden lg:table-cell">{parent.address}</TableCell>
      <TableCell className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormContainer table="parent" type="update" data={parent}>
              <EditIcon className="w-4 h-4" />
            </FormContainer>
            <FormContainer table="parent" type="delete" id={parent.id}>
              <TrashIcon className="w-4 h-4" />
            </FormContainer>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}

export default ParentItem;
