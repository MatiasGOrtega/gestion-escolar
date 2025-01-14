import FormModal from "@/components/FormModal";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "@/constants/data";
import { EditIcon, TrashIcon } from "lucide-react";

type Event = {
  id: number;
  title: string;
  class: string;
  date: string;
  startTime: string;
  endTime: string;
};

function EventItem(event: Event) {
  return (
    <TableRow key={event.id}>
      <TableCell>{event.title}</TableCell>
      <TableCell className="hidden md:table-cell">{event.class}</TableCell>
      <TableCell className="hidden md:table-cell">{event.date}</TableCell>
      <TableCell className="hidden md:table-cell">{event.startTime}</TableCell>
      <TableCell className="hidden md:table-cell">{event.endTime}</TableCell>
      <TableCell className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="event" type="update" data={event}>
              <EditIcon className="w-4 h-4" />
            </FormModal>
            <FormModal table="event" type="delete" id={event.id}>
              <TrashIcon className="w-4 h-4" />
            </FormModal>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}

export default EventItem;
