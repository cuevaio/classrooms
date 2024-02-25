import { getXataClient } from "@/lib/db";
import { notFound } from "next/navigation";
const xata = getXataClient();

export default async function Day({
  params,
}: {
  params: { day: string; classroom: string };
}) {
  let classroom_name = params.classroom;
  let today = params.day;
  let today_date = new Date(`${today}T13:00:00.000Z`);
  let today_end = new Date(today_date.getTime() + 14 * 36e5);

  let classroom = await xata.db.classroom
    .filter({
      name: classroom_name,
    })
    .getFirst();

  if (!classroom?.id) {
    notFound();
  }

  let eventsPage = await xata.db.event
    .select(["*", "classroom.*", "course.name", "course.code", "host.name"])
    .filter({
      $all: [
        {
          start: {
            $ge: today_date,
          },
        },
        {
          end: {
            $le: today_end,
          },
        },
        {
          classroom: classroom.id,
        },
      ],
    })
    .sort("start", "asc")
    .getPaginated({
      consistency: "eventual",
    });

  let yesterday_date = new Date(today_date);
  yesterday_date.setDate(yesterday_date.getDate() - 1);
  let yesterday = yesterday_date.toISOString().split("T")[0];

  let tomorrow_date = new Date(today_date);
  tomorrow_date.setDate(tomorrow_date.getDate() + 1);
  let tomorrow = tomorrow_date.toISOString().split("T")[0];

  let events = eventsPage.records;

  let hours_to_hide: number[] = [];
  events.forEach((e) => {
    if (!!e.end && !!e.start) {
      // @ts-ignore
      let long = Math.abs(e.end - e.start) / 36e5;

      if (long > 1) {
        for (let i = 1; i < long; i++) {
          hours_to_hide = [
            ...hours_to_hide,
            Number(
              new Date(e.start.getTime() + i * 36e5).toLocaleTimeString(
                "es-PE",
                {
                  hour: "2-digit",
                  hour12: false,
                }
              )
            ),
          ];
        }
      }
    }
  });

  return (
    <div
      style={{ gridTemplateRows: "repeat(15, minmax(0, 1fr))" }}
      className="relative grid grow gap-2 min-h-[800px] my-8"
    >
      {events.map((event) => {
        const start =
          Number(
            event.start
              ?.toLocaleTimeString("es-PE", {
                hour: "2-digit",
                minute: "2-digit",
              })
              .split(":")[0]
          ) - 7;
        const end =
          Number(
            event.end
              ?.toLocaleTimeString("es-PE", {
                hour: "2-digit",
                minute: "2-digit",
              })
              .split(":")[0]
          ) - 7;

        return (
          <div
            key={event.id}
            style={{ gridRowStart: start, gridRowEnd: end }}
            className="rounded-lg flex bg-gray-200 items-center justify-center mx-2 mt-1.5"
          >
            <div className="z-5 w-2/3 text-center py-2">
              <p style={{ overflowWrap: "break-word" }} className="font-bold">
                {event.name || event.course?.name}
              </p>
              <div className="flex items-center justify-center text-xs space-x-4">
                {event.course && <span>{event.course.code}</span>}
                {event.host && <span>{event.host.name}</span>}
              </div>
            </div>
          </div>
        );
      })}
      <div
        style={{ gridTemplateRows: "repeat(15, minmax(0, 1fr))" }}
        className="absolute top-0 bottom-0 right-0 left-0 grid gap-2 -z-5"
      >
        {new Array(14).fill(0).map((_, i) => (
          <div
            key={i}
            className={`relative data-[hide=true]:opacity-0 ${
              hours_to_hide.includes(i + 8) && "hidden"
            }`}
          >
            <div className="ml-2 absolute -top-3 border h-6 w-16 rounded-full text-gray-700 bg-white flex items-center justify-center text-sm z-10">
              {String(i + 8).padStart(2, "0")}:00
            </div>
            <div className="absolute right-0 left-0 h-px bg-gray-200 z-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
