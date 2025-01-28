import { getAnnouncements } from "@/actions/announcements.action";
import AnnouncementItem from "@/components/list/listItems/AnnouncementItem";
import PaginationList from "@/components/list/PaginationList";
import TableList from "@/components/list/TableList";
import TableTop from "@/components/list/TableTop";
import { auth } from "@clerk/nextjs/server";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

async function Page(props: { searchParams: SearchParams }) {
  const { data, count, p } = await getAnnouncements(props.searchParams);
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      <TableTop
        table="announcement"
        nameTable="All Announcements"
        role={role}
      />

      <TableList
        nameTable="A list of announcements"
        columns={columns}
        data={data}
        item={AnnouncementItem}
      />

      <PaginationList page={p} count={count} />
    </div>
  );
}

export default Page;
