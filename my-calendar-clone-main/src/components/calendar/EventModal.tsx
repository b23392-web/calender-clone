import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";

interface Event {
  id?: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  all_day: boolean;
  color: string;
  location?: string;
}

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (event: Event) => void;
  onDelete?: (id: string) => void;
  event?: Event | null;
  defaultDate?: Date;
  defaultHour?: number;
}

const EVENT_COLORS = [
  { name: "Blue", value: "#4285f4" },
  { name: "Red", value: "#ea4335" },
  { name: "Green", value: "#34a853" },
  { name: "Purple", value: "#9334ea" },
  { name: "Orange", value: "#f59e0b" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Gray", value: "#6b7280" },
];

export const EventModal = ({
  open,
  onClose,
  onSave,
  onDelete,
  event,
  defaultDate,
  defaultHour = 9,
}: EventModalProps) => {
  const [formData, setFormData] = useState<Event>({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    all_day: false,
    color: "#4285f4",
    location: "",
  });

  useEffect(() => {
    if (event) {
      setFormData(event);
    } else if (defaultDate) {
      const start = new Date(defaultDate);
      start.setHours(defaultHour, 0, 0, 0);
      const end = new Date(start);
      end.setHours(defaultHour + 1);

      setFormData({
        title: "",
        description: "",
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        all_day: false,
        color: "#4285f4",
        location: "",
      });
    }
  }, [event, defaultDate, defaultHour]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    if (event?.id && onDelete) {
      onDelete(event.id);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{event ? "Edit Event" : "Create Event"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Event title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Event description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_time">Start</Label>
              <Input
                id="start_time"
                type="datetime-local"
                value={formData.start_time ? format(new Date(formData.start_time), "yyyy-MM-dd'T'HH:mm") : ""}
                onChange={(e) => setFormData({ ...formData, start_time: new Date(e.target.value).toISOString() })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_time">End</Label>
              <Input
                id="end_time"
                type="datetime-local"
                value={formData.end_time ? format(new Date(formData.end_time), "yyyy-MM-dd'T'HH:mm") : ""}
                onChange={(e) => setFormData({ ...formData, end_time: new Date(e.target.value).toISOString() })}
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="all_day"
              checked={formData.all_day}
              onCheckedChange={(checked) => setFormData({ ...formData, all_day: checked })}
            />
            <Label htmlFor="all_day">All day event</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location || ""}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Event location"
            />
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-2">
              {EVENT_COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  className="w-8 h-8 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  style={{ backgroundColor: color.value }}
                  onClick={() => setFormData({ ...formData, color: color.value })}
                  title={color.name}
                >
                  {formData.color === color.value && (
                    <div className="w-full h-full rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <DialogFooter className="gap-2">
            {event && onDelete && (
              <Button type="button" variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            )}
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{event ? "Save Changes" : "Create Event"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
