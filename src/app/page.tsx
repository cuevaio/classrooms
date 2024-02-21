import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getFreeClassrooms } from "@/lib/db/queries/get-free-classrooms";
import { cn } from "@/lib/utils";

export default async function Home() {
  let now = new Date();
  let limaDateTime = now.toLocaleDateString("en-US", {
    timeZone: "America/Lima",
  });

  let [today_month, today_day, today_year] = limaDateTime.split("/");
  today_month = today_month.padStart(2, "0");
  today_day = today_day.padStart(2, "0");

  let day_start = new Date(
    `${today_year}-${today_month}-${today_day}T13:00:00.000Z`
  );

  let data = await getFreeClassrooms(day_start);

  return (
    <div className="grid grid-cols-1 gap-6">
      <Accordion type="single" collapsible className="w-full">
        {data.free.map(({ classrooms, start }) => (
          <AccordionItem
            key={start.toISOString()}
            value={start.toISOString()}
            className=""
          >
            <AccordionTrigger className="relative hover:no-underline px-4 data-[state=open]:pt-2 data-[state=open]:pb-1">
              <Badge variant="outline">
                {start.toLocaleTimeString("es-PE", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Badge>
            </AccordionTrigger>

            <AccordionContent className="flex flex-wrap gap-2 px-4 pt-1 pb-2">
              {classrooms.map((c) => (
                <Button
                  size="sm"
                  variant="secondary"
                  className={cn("tabular-nums")}
                >
                  {c}
                </Button>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
