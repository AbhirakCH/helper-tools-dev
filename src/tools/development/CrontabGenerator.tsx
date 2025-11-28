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
import cronstrue from "cronstrue";

export default function CrontabGenerator() {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");
  const [expression, setExpression] = useState("* * * * *");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const expr = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setExpression(expr);
    try {
      setDescription(cronstrue.toString(expr));
    } catch {
      setDescription("Invalid cron expression");
    }
  }, [minute, hour, dayOfMonth, month, dayOfWeek]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(expression);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crontab Generator</CardTitle>
        <CardDescription>
          Generate and explain crontab expressions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-5 gap-2 text-center">
          <div className="space-y-1">
            <Label className="text-xs">Minute</Label>
            <Input
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="text-center font-mono"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Hour</Label>
            <Input
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="text-center font-mono"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Day (Month)</Label>
            <Input
              value={dayOfMonth}
              onChange={(e) => setDayOfMonth(e.target.value)}
              className="text-center font-mono"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Month</Label>
            <Input
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="text-center font-mono"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Day (Week)</Label>
            <Input
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value)}
              className="text-center font-mono"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Result</Label>
          <div className="flex gap-2">
            <div className="flex-1 rounded-md bg-muted p-4 font-mono text-lg font-semibold flex items-center justify-center">
              {expression}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-auto w-12"
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMinute("*");
              setHour("*");
              setDayOfMonth("*");
              setMonth("*");
              setDayOfWeek("*");
            }}
          >
            Every minute
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMinute("0");
              setHour("*");
              setDayOfMonth("*");
              setMonth("*");
              setDayOfWeek("*");
            }}
          >
            Every hour
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMinute("0");
              setHour("0");
              setDayOfMonth("*");
              setMonth("*");
              setDayOfWeek("*");
            }}
          >
            Every day at midnight
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMinute("0");
              setHour("0");
              setDayOfMonth("*");
              setMonth("*");
              setDayOfWeek("0");
            }}
          >
            Every Sunday
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
