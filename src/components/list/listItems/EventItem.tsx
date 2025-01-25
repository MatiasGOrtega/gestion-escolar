import FormModal from "@/components/FormModal";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "@/constants/data";
import { Class, Event } from "@prisma/client";
import { EditIcon, TrashIcon } from "lucide-react";

type EventItemProps = Event & { class: Class };

function EventItem(event: EventItemProps) {
  return (
    <TableRow key={event.id}>
      <TableCell>{event.title}</TableCell>
      <TableCell className="hidden md:table-cell">{event.class.name}</TableCell>
      <TableCell className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(event.startTime)}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {event.startTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {event.endTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </TableCell>
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
