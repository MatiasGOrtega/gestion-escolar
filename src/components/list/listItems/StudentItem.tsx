import FormModal from "@/components/form/FormModal";
import { TableCell, TableRow } from "@/components/ui/table";
import { auth } from "@clerk/nextjs/server";
import { Class, Student } from "@prisma/client";
import { EditIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type StudentItemProps = Student & { class: Class };

async function StudentItem(student: StudentItemProps) {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
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
            <Link href={`/list/students/${student.id}`}>
              <button className="flex bg-yellow-200 items-center justify-center shadow hover:shadow-md hover:bg-yellow-300 rounded-md p-2">
                <EditIcon className="w-5 h-5" />
              </button>
            </Link>
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
