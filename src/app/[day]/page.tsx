import { FreeClassrooms } from "@/components/free-classrooms/index";
import { getFreeClassrooms } from "@/lib/db/queries/get-free-classrooms";

import { DayNavigator } from "@/components/day-navigator";

export default async function Day({
  params: { day },
}: {
  params: { day: string };
}) {
  let data = await getFreeClassrooms(day);

  return (
    <div className="grid grid-cols-1">
      <DayNavigator today={data.today} today_date={data.today_date} />
      <FreeClassrooms data={data} />
    </div>
  );
}
