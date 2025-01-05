import CountChart from "@/components/admin/CountChart";
import UserCard from "@/components/admin/UserCard";
import React from "react";

function AdminPage() {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <div className="w-full lg:w-2/3">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="staff" />
        </div>
        <div className="flex gap-4 flex-col lg:flex-row py-4">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          <div className="w-full lg:w-1/3 h-[450px]">
            Otro chart
          </div>
        </div>
        <div className="">

        </div>
      </div>
      <div className="w-full lg:w-1/3">r</div>
    </div>
  );
}

export default AdminPage;
