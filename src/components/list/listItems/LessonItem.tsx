import { Button, buttonVariants } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "@/constants/data";
import { EditIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

type Lesson = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
};

function LessonItem(lesson: Lesson) {
  return (
    <TableRow key={lesson.id}>
      <TableCell>{lesson.subject}</TableCell>
      <TableCell className="hidden md:table-cell">{lesson.class}</TableCell>
      <TableCell className="hidden md:table-cell">{lesson.teacher}</TableCell>
      <TableCell className="flex items-center gap-2">
        <Link
          href={`/list/lessons/${lesson.id}`}
          className={`${buttonVariants({
            variant: "outline",
            size: "icon",
          })} bg-yellow-200 hover:bg-yellow-300`}
        >
          <EditIcon className="w-4 h-4" />
        </Link>
        {role === "admin" && (
          <Button
            variant="outline"
            size="icon"
            className="bg-purple-200 hover:bg-purple-300"
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}

export default LessonItem;
