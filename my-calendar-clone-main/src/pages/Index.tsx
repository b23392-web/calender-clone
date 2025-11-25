import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { MonthView } from "@/components/calendar/MonthView";
import { WeekView } from "@/components/calendar/WeekView";
import { DayView } from "@/components/calendar/DayView";
import { EventModal } from "@/components/calendar/EventModal";
import { toast } from "@/hooks/use-toast";
import { addMonths, addWeeks, addDays, startOfMonth, startOfWeek, startOfDay } from "date-fns";
import type { User, Session } from "@supabase/supabase-js";

interface Event {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  all_day: boolean;
  color: string;
  location?: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [events, setEvents] = useState<Event[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [defaultDate, setDefaultDate] = useState<Date | undefined>();
  const [defaultHour, setDefaultHour] = useState<number>(9);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user]);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("start_time", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load events",
        variant: "destructive",
      });
    } else {
      setEvents(data || []);
    }
  };

  const handleSaveEvent = async (event: Partial<Event>) => {
    if (!user) return;

    if (event.id) {
      const { error } = await supabase
        .from("events")
        .update({
          title: event.title,
          description: event.description,
          start_time: event.start_time,
          end_time: event.end_time,
          all_day: event.all_day,
          color: event.color,
          location: event.location,
        })
        .eq("id", event.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update event",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Event updated successfully",
        });
        fetchEvents();
      }
    } else {
      const { error } = await supabase.from("events").insert({
        user_id: user.id,
        title: event.title,
        description: event.description,
        start_time: event.start_time,
        end_time: event.end_time,
        all_day: event.all_day,
        color: event.color,
        location: event.location,
      });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create event",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Event created successfully",
        });
        fetchEvents();
      }
    }
  };

  const handleDeleteEvent = async (id: string) => {
    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
      fetchEvents();
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handlePrevious = () => {
    switch (view) {
      case "month":
        setCurrentDate((date) => addMonths(date, -1));
        break;
      case "week":
        setCurrentDate((date) => addWeeks(date, -1));
        break;
      case "day":
        setCurrentDate((date) => addDays(date, -1));
        break;
    }
  };

  const handleNext = () => {
    switch (view) {
      case "month":
        setCurrentDate((date) => addMonths(date, 1));
        break;
      case "week":
        setCurrentDate((date) => addWeeks(date, 1));
        break;
      case "day":
        setCurrentDate((date) => addDays(date, 1));
        break;
    }
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
  };

  const handleDateClick = (date: Date) => {
    setDefaultDate(date);
    setDefaultHour(9);
    setSelectedEvent(null);
    setModalOpen(true);
  };

  const handleTimeSlotClick = (date: Date, hour: number) => {
    setDefaultDate(date);
    setDefaultHour(hour);
    setSelectedEvent(null);
    setModalOpen(true);
  };

  const handleTimeSlotClickDay = (hour: number) => {
    setDefaultDate(currentDate);
    setDefaultHour(hour);
    setSelectedEvent(null);
    setModalOpen(true);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setDefaultDate(undefined);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <CalendarHeader
        currentDate={currentDate}
        view={view}
        onViewChange={setView}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
        onSignOut={handleSignOut}
      />
      {view === "month" && (
        <MonthView
          currentDate={currentDate}
          events={events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
        />
      )}
      {view === "week" && (
        <WeekView
          currentDate={currentDate}
          events={events}
          onTimeSlotClick={handleTimeSlotClick}
          onEventClick={handleEventClick}
        />
      )}
      {view === "day" && (
        <DayView
          currentDate={currentDate}
          events={events}
          onTimeSlotClick={handleTimeSlotClickDay}
          onEventClick={handleEventClick}
        />
      )}
      <EventModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedEvent(null);
          setDefaultDate(undefined);
        }}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        event={selectedEvent}
        defaultDate={defaultDate}
        defaultHour={defaultHour}
      />
    </div>
  );
};

export default Index;
