import { format, startOfWeek, endOfWeek, eachDayOfInterval, isToday, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  all_day: boolean;
  color: string;
}

interface WeekViewProps {
  currentDate: Date;
  events: Event[];
  onTimeSlotClick: (date: Date, hour: number) => void;
  onEventClick: (event: Event) => void;
}

export const WeekView = ({ currentDate, events, onTimeSlotClick, onEventClick }: WeekViewProps) => {
  const weekStart = startOfWeek(currentDate);
  const weekEnd = endOfWeek(currentDate);
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForDayAndHour = (day: Date, hour: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start_time);
      const eventHour = eventDate.getHours();
      return isSameDay(eventDate, day) && eventHour === hour;
    });
  };

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="grid grid-cols-8 sticky top-0 bg-background z-10 border-b border-calendar-grid">
        <div className="py-3 px-2 text-xs font-medium text-muted-foreground border-r border-calendar-grid">
          Time
        </div>
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className={cn(
              "py-3 px-2 text-center text-sm border-r border-calendar-grid last:border-r-0",
              isToday(day) && "bg-calendar-today"
            )}
          >
            <div className="font-medium">{format(day, "EEE")}</div>
            <div
              className={cn(
                "text-xl mt-1",
                isToday(day) && "bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mx-auto"
              )}
            >
              {format(day, "d")}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-8">
        {hours.map((hour) => (
          <>
            <div
              key={`hour-${hour}`}
              className="py-2 px-2 text-xs text-muted-foreground border-r border-b border-calendar-grid text-right"
            >
              {format(new Date().setHours(hour, 0, 0, 0), "h a")}
            </div>
            {days.map((day) => {
              const dayEvents = getEventsForDayAndHour(day, hour);
              return (
                <div
                  key={`${day.toISOString()}-${hour}`}
                  className="min-h-[60px] border-r border-b border-calendar-grid p-1 cursor-pointer hover:bg-calendar-hover transition-colors last:border-r-0"
                  onClick={() => onTimeSlotClick(day, hour)}
                >
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="text-xs px-2 py-1 rounded mb-1 truncate cursor-pointer transition-opacity hover:opacity-80"
                      style={{ backgroundColor: event.color + "20", color: event.color }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                    >
                      {format(new Date(event.start_time), "h:mm a")} {event.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
};
