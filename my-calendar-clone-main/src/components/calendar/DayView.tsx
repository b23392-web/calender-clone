import { format, isToday } from "date-fns";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  all_day: boolean;
  color: string;
}

interface DayViewProps {
  currentDate: Date;
  events: Event[];
  onTimeSlotClick: (hour: number) => void;
  onEventClick: (event: Event) => void;
}

export const DayView = ({ currentDate, events, onTimeSlotClick, onEventClick }: DayViewProps) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForHour = (hour: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start_time);
      const eventHour = eventDate.getHours();
      return eventHour === hour;
    });
  };

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="sticky top-0 bg-background z-10 border-b border-calendar-grid py-3 px-4">
        <div className="text-center">
          <div className="text-sm font-medium text-muted-foreground">{format(currentDate, "EEEE")}</div>
          <div
            className={cn(
              "text-2xl font-semibold mt-1",
              isToday(currentDate) &&
                "bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto"
            )}
          >
            {format(currentDate, "d")}
          </div>
        </div>
      </div>
      <div className="divide-y divide-calendar-grid">
        {hours.map((hour) => {
          const hourEvents = getEventsForHour(hour);
          return (
            <div
              key={hour}
              className="grid grid-cols-[80px_1fr] min-h-[80px] hover:bg-calendar-hover transition-colors cursor-pointer"
              onClick={() => onTimeSlotClick(hour)}
            >
              <div className="py-2 px-4 text-xs text-muted-foreground text-right border-r border-calendar-grid">
                {format(new Date().setHours(hour, 0, 0, 0), "h a")}
              </div>
              <div className="p-2 space-y-1">
                {hourEvents.map((event) => (
                  <div
                    key={event.id}
                    className="text-sm px-3 py-2 rounded cursor-pointer transition-opacity hover:opacity-80"
                    style={{ backgroundColor: event.color + "20", color: event.color }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs opacity-80">
                      {format(new Date(event.start_time), "h:mm a")} -{" "}
                      {format(new Date(event.end_time), "h:mm a")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
