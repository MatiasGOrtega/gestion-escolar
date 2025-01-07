import { Button, buttonVariants } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "@/constants/data";
import { EditIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

type Assignment = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  dueDate: string;
};

function AssignmentItem(assignment: Assignment) {
  return (
    <TableRow key={assignment.id}>
      <TableCell>{assignment.subject}</TableCell>
      <TableCell className="hidden md:table-cell">{assignment.class}</TableCell>
      <TableCell className="hidden md:table-cell">
        {assignment.teacher}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {assignment.dueDate}
      </TableCell>
      <TableCell className="flex items-center gap-2">
        <Link
          href={`/list/assignments/${assignment.id}`}
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

export default AssignmentItem;
