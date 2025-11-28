import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { format, fromUnixTime, getUnixTime, parseISO } from "date-fns";

export default function DateTimeConverter() {
  const [now, setNow] = useState(new Date());
  const [input, setInput] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [iso, setIso] = useState("");
  const [utc, setUtc] = useState("");
  const [local, setLocal] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!input) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTimestamp(getUnixTime(now).toString());
      setIso(now.toISOString());
      setUtc(now.toUTCString());
      setLocal(format(now, "yyyy-MM-dd HH:mm:ss"));
      return;
    }

    try {
      let date: Date;
      // Check if input is timestamp (digits only)
      if (/^\d+$/.test(input)) {
        // Assume seconds if length is small, milliseconds if large
        if (input.length > 11) {
          date = new Date(parseInt(input));
        } else {
          date = fromUnixTime(parseInt(input));
        }
      } else {
        date = parseISO(input);
        if (isNaN(date.getTime())) {
          date = new Date(input);
        }
      }

      if (!isNaN(date.getTime())) {
        setTimestamp(getUnixTime(date).toString());
        setIso(date.toISOString());
        setUtc(date.toUTCString());
        setLocal(format(date, "yyyy-MM-dd HH:mm:ss"));
      } else {
        // Invalid date
        setTimestamp("Invalid Date");
        setIso("Invalid Date");
        setUtc("Invalid Date");
        setLocal("Invalid Date");
      }
    } catch {
      setTimestamp("Error");
    }
  }, [input, now]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Date-time Converter</CardTitle>
        <CardDescription>
          Convert dates between various formats. Defaults to current time.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Input Date (ISO, Timestamp, or Natural)</Label>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Leave empty for current time..."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Unix Timestamp (seconds)</Label>
            <div className="flex gap-2">
              <Input value={timestamp} readOnly />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(timestamp)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>ISO 8601</Label>
            <div className="flex gap-2">
              <Input value={iso} readOnly />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(iso)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>UTC</Label>
            <div className="flex gap-2">
              <Input value={utc} readOnly />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(utc)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Local</Label>
            <div className="flex gap-2">
              <Input value={local} readOnly />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(local)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
