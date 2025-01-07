import { Button, buttonVariants } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "@/constants/data";
import { EditIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

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
        <Link
          href={`/list/events/${event.id}`}
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

export default EventItem;
