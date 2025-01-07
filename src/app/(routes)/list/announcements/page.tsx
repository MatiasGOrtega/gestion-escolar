import AnnouncementItem from '@/components/list/listItems/AnnouncementItem';
import PaginationList from '@/components/list/PaginationList';
import TableList from '@/components/list/TableList';
import TableTop from '@/components/list/TableTop';
import { announcementsData } from '@/constants/data';

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

function Page() {
  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      <TableTop nameTable="All Announcements" />

      <TableList
        nameTable="A list of announcements"
        columns={columns}
        data={announcementsData}
        item={AnnouncementItem}
      />

      <PaginationList />
    </div>
  )
}

export default Page