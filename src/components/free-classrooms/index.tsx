import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DynamicForFreeClassrooms } from "./dynamic";
import Link from "next/link";

export const FreeClassrooms = ({
  data,
}: {
  data: {
    free: {
      start: Date;
      end: Date;
      classrooms: string[];
    }[];
    yesterday: string;
    today: string;
    tomorrow: string;
  };
}) => (
  <>
    <Accordion type="single" collapsible className="w-full">
      {data.free.map(({ classrooms, start }) => (
        <AccordionItem
          key={start.toISOString()}
          value={start.toISOString()}
          className=""
        >
          <AccordionTrigger
            className="relative hover:no-underline px-4 data-[state=open]:pt-2 data-[state=open]:pb-1"
            data-item={start.toLocaleTimeString("en-US", {
              hour: "2-digit",
              timeZone: "America/Lima",
            })}
          >
            <div className=" flex justify-between w-full">
              <Badge
                variant="outline"
                className={cn({
                  "border-green-400/90 text-green-400/90":
                    classrooms.length > 10,
                  "border-yellow-400/90 text-yellow-400/90":
                    classrooms.length > 5 && classrooms.length <= 10,
                  "border-red-400/90 text-red-400/90":
                    classrooms.length > 0 && classrooms.length <= 5,
                  "border-muted-foreground/50 text-muted-foreground/50":
                    classrooms.length === 0,
                })}
              >
                {start.toLocaleTimeString("es-PE", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Badge>
            </div>
          </AccordionTrigger>

          <AccordionContent className="flex flex-wrap gap-2 px-4 pt-1 pb-2">
            {classrooms.map((c) => (
              <Button
                key={c}
                size="sm"
                variant="secondary"
                className={cn("tabular-nums")}
                asChild
              >
                <Link href={`/${start.toISOString().split("T")[0]}/${c}`}>
                  {c}
                </Link>
              </Button>
            ))}

            {classrooms.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No hay aulas libres en este horario :0
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
    <DynamicForFreeClassrooms />
  </>
);
