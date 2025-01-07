import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";


function TableSearch() {
  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
      <SearchIcon className="w-4 h-4" />
      <Input type="text" placeholder="Search..." className="w-[200px] p-2 bg-transparent border-none"/>
    </div>
  );
}

export default TableSearch;
