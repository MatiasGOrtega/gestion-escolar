import FormModal from "@/components/FormModal";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "@/constants/data";
import { EditIcon, TrashIcon } from "lucide-react";

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
        {role === "admin" && (
          <>
            <FormModal table="result" type="update" data={result}>
              <EditIcon className="w-4 h-4" />
            </FormModal>
            <FormModal table="result" type="delete" id={result.id}>
              <TrashIcon className="w-4 h-4" />
            </FormModal>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}

export default ResultItem;
