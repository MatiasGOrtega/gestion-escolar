import { Button, buttonVariants } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "@/constants/data";
import { EditIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

type Announcement = {
  id: number;
  title: string;
  class: string;
  date: string;
};

function AnnouncementItem(announcement: Announcement) {
  return (
    <TableRow key={announcement.id}>
      <TableCell>{announcement.title}</TableCell>
      <TableCell className="hidden md:table-cell">
        {announcement.class}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {announcement.date}
      </TableCell>
      <TableCell className="flex items-center gap-2">
        <Link
          href={`/list/announcements/${announcement.id}`}
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

export default AnnouncementItem;
