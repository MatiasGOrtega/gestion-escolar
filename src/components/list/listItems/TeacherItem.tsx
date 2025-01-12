import FormModal from "@/components/FormModal";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "@/constants/data";
import { EditIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

type Teacher = {
  id: number;
  teacherId: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
};

function TeacherItem(teacher: Teacher) {
  return (
    <TableRow key={teacher.id}>
      <TableCell className="flex items-center gap-2">
        <Image
          src={teacher.photo}
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
      <TableCell className="hidden md:table-cell">
        {teacher.teacherId}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {teacher.subjects.join(", ")}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {teacher.classes.join(", ")}
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
