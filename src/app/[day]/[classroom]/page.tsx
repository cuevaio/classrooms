import { getXataClient } from "@/lib/db";
import { notFound } from "next/navigation";
const xata = getXataClient();
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default async function Day({
  params,
}: {
  params: { day: string; classroom: string };
}) {
  let classroom_name = params.classroom;
  let today = params.day;
  let today_date = new Date(`${today}T12:00:00.000Z`);
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
    .select(["*", "classroom.id", "course.name", "course.code", "host.name"])
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

  console.log(eventsPage.records);

  let _events: {
    start: number;
    end: number;
    data: (typeof eventsPage.records)[0] | null;
  }[] = [];

  // from 7:00 to 21:00
  let i = 7;
  while (i <= 21) {
    let existsEvent = eventsPage.records.find((e) => {
      if (!!e.end && !!e.start) {
        return (
          Number(
            e.start
              ?.toLocaleTimeString("es-PE", {
                hour: "numeric",
                hour12: false,
              })
              .split(":")[0]
          ) === i
        );
      }
    });

    if (existsEvent) {
      let long = Math.abs(
        existsEvent.end?.getTime()! - existsEvent.start?.getTime()!
      );
      _events.push({
        start: i,
        end: i + long / 36e5,
        data: existsEvent,
      });

      i += long / 36e5;
    }

    if (!existsEvent) {
      _events.push({
        start: i,
        end: i + 1,
        data: null,
      });
      i++;
    }
  }

  console.log(_events);

  let yesterday_date = new Date(today_date);
  yesterday_date.setDate(yesterday_date.getDate() - 1);
  let yesterday = yesterday_date.toISOString().split("T")[0];

  let tomorrow_date = new Date(today_date);
  tomorrow_date.setDate(tomorrow_date.getDate() + 1);
  let tomorrow = tomorrow_date.toISOString().split("T")[0];

  return (
    <div className="grid grid-rows-14 my-8 gap-1">
      {_events.map(({ start, end, data }) => (
        <div
          key={start}
          className={cn(
            "rounded-lg mx-2 border relative p-2 group",
            { "row-span-1": end - start === 1 },
            { "row-span-2": end - start === 2 },
            { "row-span-3": end - start === 3 },
            { "bg-secondary": data !== null }
          )}
        >
          <div className="absolute -top-4 left-0">
            <Badge variant="outline" className="bg-white">
              {String(start).padStart(2, "0") + ":00"}
            </Badge>
          </div>
          <div>
            <p className="font-bold text-lg">
              {data?.name || data?.course?.name}
            </p>
            <p
              className={cn({
                "text-background group-hover:text-muted-foreground": data === null,
              })}
            >
              {data?.host?.name || "Freeee"}
            </p>
          </div>
          {end === 22 && (
            <div className="absolute -bottom-4 left-0">
              <Badge variant="outline" className="bg-white">
                {String(end).padStart(2, "0") + ":00"}
              </Badge>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
