import FormContainer from "@/components/form/FormContainer";
import { TableCell, TableRow } from "@/components/ui/table";
import { auth } from "@clerk/nextjs/server";
import { Class, Subject, Teacher } from "@prisma/client";
import { EditIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type TeacherItemProps = Teacher & { subjects: Subject[] } & {
  classes: Class[];
};

async function TeacherItem(teacher: TeacherItemProps) {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  return (
    <TableRow key={teacher.id}>
      <TableCell className="flex items-center gap-2">
        <Image
          src={teacher.img || "/avatar-default.png"}
          alt={teacher.name}
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{teacher.name}</h3>
          <p className="text-xs text-gray-500">{teacher?.email}</p>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">{teacher.username}</TableCell>
      <TableCell className="hidden md:table-cell">
        {teacher.subjects.map((subject) => subject.name).join(", ")}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {teacher.classes.map((className) => className.name).join(", ")}
      </TableCell>
      <TableCell className="hidden lg:table-cell">{teacher.phone}</TableCell>
      <TableCell className="hidden lg:table-cell">{teacher.address}</TableCell>
      <TableCell className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <Link href={`/list/teachers/${teacher.id}`}>
              <button className="flex bg-yellow-200 items-center justify-center shadow hover:shadow-md hover:bg-yellow-300 rounded-md p-2">
                <EditIcon className="w-5 h-5" />
              </button>
            </Link>
            <FormContainer table="teacher" type="delete" id={teacher.id}>
              <TrashIcon className="w-5 h-5" />
            </FormContainer>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}

export default TeacherItem;
