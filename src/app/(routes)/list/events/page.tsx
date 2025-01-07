import EventItem from '@/components/list/listItems/EventItem';
import PaginationList from '@/components/list/PaginationList';
import TableList from '@/components/list/TableList';
import TableTop from '@/components/list/TableTop';
import { eventsData } from '@/constants/data';

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
    header: "Start Time",
    accessor: "startTime",
    className: "hidden md:table-cell",
  },
  {
    header: "End Time",
    accessor: "endTime",
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
      <TableTop nameTable="All Events" />

      <TableList
        nameTable="A list of events"
        columns={columns}
        data={eventsData}
        item={EventItem}
      />

      <PaginationList />
    </div>
  )
}

export default Page