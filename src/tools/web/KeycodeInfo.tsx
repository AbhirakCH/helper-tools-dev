import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function KeycodeInfo() {
  const [event, setEvent] = useState<KeyboardEvent | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      setEvent(e);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keycode Info</CardTitle>
        <CardDescription>
          Press any key to see its keycode, key, location, etc.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!event ? (
          <div className="flex items-center justify-center h-[200px] border-2 border-dashed rounded-lg text-muted-foreground">
            Press any key on your keyboard...
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-2">
                  {event.keyCode}
                </div>
                <div className="text-sm text-muted-foreground">
                  event.keyCode
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>event.key</Label>
                <Input value={event.key} readOnly />
              </div>
              <div className="space-y-2">
                <Label>event.code</Label>
                <Input value={event.code} readOnly />
              </div>
              <div className="space-y-2">
                <Label>event.location</Label>
                <Input value={event.location.toString()} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Modifiers</Label>
                <div className="flex gap-2">
                  {event.ctrlKey && (
                    <span className="px-2 py-1 bg-primary/10 rounded text-xs font-mono">
                      Ctrl
                    </span>
                  )}
                  {event.shiftKey && (
                    <span className="px-2 py-1 bg-primary/10 rounded text-xs font-mono">
                      Shift
                    </span>
                  )}
                  {event.altKey && (
                    <span className="px-2 py-1 bg-primary/10 rounded text-xs font-mono">
                      Alt
                    </span>
                  )}
                  {event.metaKey && (
                    <span className="px-2 py-1 bg-primary/10 rounded text-xs font-mono">
                      Meta
                    </span>
                  )}
                  {!event.ctrlKey &&
                    !event.shiftKey &&
                    !event.altKey &&
                    !event.metaKey && (
                      <span className="text-muted-foreground text-sm">
                        None
                      </span>
                    )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
