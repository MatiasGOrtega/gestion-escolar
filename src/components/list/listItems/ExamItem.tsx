import { Button, buttonVariants } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "@/constants/data";
import { EditIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

type Exam = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  date: string;
};

function ExamItem(exam: Exam) {
  return (
    <TableRow key={exam.id}>
      <TableCell className="flex items-center gap-2">{exam.subject}</TableCell>
      <TableCell className="hidden md:table-cell">{exam.class}</TableCell>
      <TableCell className="hidden lg:table-cell">{exam.teacher}</TableCell>
      <TableCell className="hidden lg:table-cell">{exam.date}</TableCell>
      <TableCell className="flex items-center gap-2">
        <Link
          href={`/list/exams/${exam.id}`}
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

export default ExamItem;
