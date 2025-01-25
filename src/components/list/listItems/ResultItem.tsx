import FormModal from "@/components/FormModal";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "@/constants/data";
import { EditIcon, TrashIcon } from "lucide-react";

type ResultItemProps = {
  id: number;
  title: string;
  studentName: string;
  studentSurname: string;
  teacherName: string;
  teacherSurname: string;
  score: number;
  className: string;
  startTime: Date;
};

function ResultItem(result: ResultItemProps) {
  return (
    <TableRow key={result.id}>
      <TableCell>{result.title}</TableCell>
      <TableCell className="hidden md:table-cell">
        {result.studentName + " " + result.studentSurname}
      </TableCell>
      <TableCell className="hidden md:table-cell">{result.score}</TableCell>
      <TableCell className="hidden md:table-cell">
        {result.teacherName + " " + result.teacherSurname}
      </TableCell>
      <TableCell className="hidden md:table-cell">{result.className}</TableCell>
      <TableCell className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(new Date(result.startTime))}
      </TableCell>
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
