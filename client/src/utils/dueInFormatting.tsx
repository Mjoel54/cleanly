import dayjs from "dayjs";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function dueInFormatting(dueIn: number) {
  // Get the current date
  const now = dayjs();

  // Convert the Unix timestamp to a Day.js object
  const dueDate = dayjs.unix(dueIn);

  // Calculate the difference in days
  const daysDifference = dueDate.diff(now, "day");

  // Format the output based on the difference
  if (daysDifference === 0) {
    return (
      <>
        <div className="flex items-center text-sm text-blue-500 truncate">
          <CalendarDaysIcon className={"h-4 w-4 mr-2"} />
          <p>Due today</p>
        </div>
      </>
    );
  } else if (daysDifference === 1) {
    return (
      <>
        <div className="flex items-center text-sm text-green-700 truncate">
          <CalendarDaysIcon className={"h-4 w-4 mr-2"} />
          <p>Due tomorrow</p>
        </div>
      </>
    );
  } else if (daysDifference > 1) {
    return (
      <>
        <div className="flex items-center text-sm text-green-700 truncate">
          <CalendarDaysIcon className={"h-4 w-4 mr-2"} />
          <p>Due in {daysDifference} days</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex items-center text-sm text-red-600">
          <CalendarDaysIcon className={"h-4 w-4 mr-2"} />
          <p>Overdue</p>
        </div>
      </>
    );
  }
}
