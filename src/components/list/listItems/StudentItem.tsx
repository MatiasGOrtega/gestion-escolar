import FormModal from "@/components/FormModal";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "@/constants/data";
import { Class, Student } from "@prisma/client";
import { EditIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

type StudentItemProps = Student & { class: Class };

function StudentItem(student: StudentItemProps) {
  return (
    <TableRow key={student.id}>
      <TableCell className="flex items-center gap-2">
        <Image
          src={student.img || "/avatar-default.png"}
          alt={student.name}
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{student.name}</h3>
          <p className="text-xs text-gray-500">{student.class.name}</p>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">{student.username}</TableCell>
      <TableCell className="hidden md:table-cell">
        {student.class.name[0]}
      </TableCell>
      <TableCell className="hidden md:table-cell">{student?.phone}</TableCell>
      <TableCell className="hidden lg:table-cell">{student.address}</TableCell>
      <TableCell className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="student" type="update" data={student}>
              <EditIcon className="w-4 h-4" />
            </FormModal>
            <FormModal table="student" type="delete" id={student.id}>
              <TrashIcon className="w-4 h-4" />
            </FormModal>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}

export default StudentItem;
