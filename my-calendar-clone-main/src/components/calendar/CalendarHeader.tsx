import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface CalendarHeaderProps {
  currentDate: Date;
  view: "month" | "week" | "day";
  onViewChange: (view: "month" | "week" | "day") => void;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onSignOut: () => void;
}

export const CalendarHeader = ({
  currentDate,
  view,
  onViewChange,
  onPrevious,
  onNext,
  onToday,
  onSignOut,
}: CalendarHeaderProps) => {
  const getTitle = () => {
    switch (view) {
      case "month":
        return format(currentDate, "MMMM yyyy");
      case "week":
        return format(currentDate, "MMMM yyyy");
      case "day":
        return format(currentDate, "EEEE, MMMM d, yyyy");
    }
  };

  return (
    <header className="border-b border-border bg-background px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold">Calendar</h1>
          </div>
          <Button variant="outline" size="sm" onClick={onToday}>
            Today
          </Button>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={onPrevious}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onNext}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          <h2 className="text-xl font-medium">{getTitle()}</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border border-border overflow-hidden">
            <Button
              variant={view === "day" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onViewChange("day")}
              className="rounded-none"
            >
              Day
            </Button>
            <Button
              variant={view === "week" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onViewChange("week")}
              className="rounded-none border-x border-border"
            >
              Week
            </Button>
            <Button
              variant={view === "month" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onViewChange("month")}
              className="rounded-none"
            >
              Month
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={onSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};
