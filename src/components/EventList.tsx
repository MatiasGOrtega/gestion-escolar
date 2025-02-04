import { getEventsFromCalendar } from "@/actions/event.action";

async function EventList({ dateParam }: { dateParam: string | undefined }) {
  const date = dateParam ? new Date(dateParam) : new Date();
  const data = await getEventsFromCalendar(date);
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
      </div>
      <div className="flex flex-col gap-4">
        {data.map((event) => (
          <div
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-sky-200 even:border-t-purple-200"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300 text-xs">
                {event.startTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default EventList;
