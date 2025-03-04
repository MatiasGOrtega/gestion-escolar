import FormContainer from "@/components/form/FormContainer";
import { TableCell, TableRow } from "@/components/ui/table";
import { auth } from "@clerk/nextjs/server";
import { Announcement, Class } from "@prisma/client";
import { EditIcon, TrashIcon } from "lucide-react";

type AnnouncementItemProps = Announcement & { class: Class };

async function AnnouncementItem(announcement: AnnouncementItemProps) {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return (
    <TableRow key={announcement.id}>
      <TableCell>{announcement.title}</TableCell>
      <TableCell className="hidden md:table-cell">
        {announcement.class?.name || "-"}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(new Date(announcement.date))}
      </TableCell>
      <TableCell className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormContainer table="announcement" type="update" data={announcement}>
              <EditIcon className="w-4 h-4" />
            </FormContainer>
            <FormContainer table="announcement" type="delete" id={announcement.id}>
              <TrashIcon className="w-4 h-4" />
            </FormContainer>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}

export default AnnouncementItem;
