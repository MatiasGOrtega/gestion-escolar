"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function EventCalendarContainer() {
  const [date, setDate] = useState<Value>(new Date());

  const router = useRouter();
  useEffect(() => {
    if (date instanceof Date) {
      router.push(`?date=${date}`);
    }
  }, [date, router]);
  return (
    <>
      <Calendar
        onChange={setDate}
        value={date}
        className="rounded shadow react-calendar"
      />
    </>
  );
}

export default EventCalendarContainer;
