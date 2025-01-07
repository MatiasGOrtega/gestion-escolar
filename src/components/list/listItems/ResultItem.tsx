import { Button, buttonVariants } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "@/constants/data";
import { EditIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

type Result = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  student: string;
  type: "exam" | "assignment";
  date: string;
  score: number;
};

function ResultItem(result: Result) {
  return (
    <TableRow key={result.id}>
      <TableCell>{result.subject}</TableCell>
      <TableCell className="hidden md:table-cell">{result.student}</TableCell>
      <TableCell className="hidden md:table-cell">{result.score}</TableCell>
      <TableCell className="hidden md:table-cell">{result.teacher}</TableCell>
      <TableCell className="hidden md:table-cell">{result.class}</TableCell>
      <TableCell className="hidden md:table-cell">{result.date}</TableCell>
      <TableCell className="flex items-center gap-2">
        <Link
          href={`/list/results/${result.id}`}
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

export default ResultItem;
