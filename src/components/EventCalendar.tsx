import EventCalendarContainer from "./EventCalendarContainer";
import EventList from "./EventList";

type SearchParams = { [key: string]: string | undefined } | null;

async function EventCalendar({ searchParams }: { searchParams: SearchParams }) {

  return (
    <>
      <EventCalendarContainer />
      <EventList dateParam={searchParams?.date} />
    </>
  );
}

export default EventCalendar;
