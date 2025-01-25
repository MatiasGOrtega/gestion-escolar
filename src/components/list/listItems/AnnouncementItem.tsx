import FormModal from "@/components/FormModal";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "@/constants/data";
import { Announcement, Class } from "@prisma/client";
import { EditIcon, TrashIcon } from "lucide-react";

type AnnouncementItemProps = Announcement & { class: Class };

function AnnouncementItem(announcement: AnnouncementItemProps) {
  return (
    <TableRow key={announcement.id}>
      <TableCell>{announcement.title}</TableCell>
      <TableCell className="hidden md:table-cell">
        {announcement.class.name}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(new Date(announcement.date))}
      </TableCell>
      <TableCell className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="announcement" type="update" data={announcement}>
              <EditIcon className="w-4 h-4" />
            </FormModal>
            <FormModal table="announcement" type="delete" id={announcement.id}>
              <TrashIcon className="w-4 h-4" />
            </FormModal>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}

export default AnnouncementItem;
