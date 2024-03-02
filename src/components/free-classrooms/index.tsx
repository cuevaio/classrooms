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
                key={c}
                size="sm"
                variant="secondary"
                className={cn("tabular-nums")}
                asChild
              >
                <Link href={`/d/${start.toISOString().split("T")[0]}/${c}`}>
                  {c}
                </Link>
              </Button>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
    <DynamicForFreeClassrooms />
  </>
);
