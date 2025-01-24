import PaginationList from "@/components/list/PaginationList";
import TableList from "@/components/list/TableList";
import TableTop from "@/components/list/TableTop";
import ParentItem from "@/components/list/listItems/ParentItem";
import { getParents } from "@/actions/parent.actions";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student Names",
    accessor: "students",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

type SearchParams = Promise<{ [key: string]: string | undefined }>

async function Page(props: {searchParams: SearchParams}) {
    const { data, count, p } = await getParents(props.searchParams);
  
  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      <TableTop table="parent" nameTable="All parents" />

      <TableList
        nameTable="A list of parents"
        columns={columns}
        data={data}
        item={ParentItem}
      />

      <PaginationList page={p} count={count} />
    </div>
  );
}

export default Page;