import { getAnnouncements } from "@/actions/announcements.action";
import AnnouncementItem from "@/components/list/listItems/AnnouncementItem";
import PaginationList from "@/components/list/PaginationList";
import TableList from "@/components/list/TableList";
import TableTop from "@/components/list/TableTop";

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
  {
    header: "Actions",
    accessor: "action",
  },
];

type SearchParams = Promise<{ [key: string]: string | undefined }>;

async function Page(props: { searchParams: SearchParams }) {
  const { data, count, p } = await getAnnouncements(props.searchParams);

  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      <TableTop table="announcement" nameTable="All Announcements" />

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
