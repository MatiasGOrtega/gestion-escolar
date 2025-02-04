import Announcement from "@/components/Announcement";
import AttendanceChart from "@/components/admin/AttendanceChart";
import CountChart from "@/components/admin/CountChart";
import EventCalendar from "@/components/EventCalendar";
import FinanceChart from "@/components/admin/FinanceChart";
import UserCard from "@/components/admin/UserCard";
import React from "react";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

async function AdminPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <div className="w-full lg:w-2/3">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="teacher" />
          <UserCard type="student" />
          <UserCard type="parent" />
        </div>
        <div className="flex gap-4 flex-col lg:flex-row py-4">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
          </div>
        </div>
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
    
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar searchParams={searchParams}/>
        <Announcement />
      </div>
    </div>
  );
}

export default AdminPage;
