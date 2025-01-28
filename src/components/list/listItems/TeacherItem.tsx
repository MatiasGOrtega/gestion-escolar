import FormModal from "@/components/FormModal";
import { TableCell, TableRow } from "@/components/ui/table";
import { auth } from "@clerk/nextjs/server";
import { Class, Subject, Teacher } from "@prisma/client";
import { EditIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

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
            <FormModal table="teacher" type="update" data={teacher}>
              <EditIcon className="w-4 h-4" />
            </FormModal>
            <FormModal table="teacher" type="delete" id={teacher.id}>
              <TrashIcon className="w-4 h-4" />
            </FormModal>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}

export default TeacherItem;
