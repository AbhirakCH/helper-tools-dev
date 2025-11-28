import { useState } from "react";
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
import { Copy, RefreshCw } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function RandomPortGenerator() {
  const [port, setPort] = useState<number | null>(null);
  const [min, setMin] = useState(1024);
  const [max, setMax] = useState(65535);
  const [excludeWellKnown, setExcludeWellKnown] = useState(true);

  const generatePort = () => {
    const range = max - min + 1;
    let newPort;
    do {
      newPort = Math.floor(Math.random() * range) + min;
    } while (excludeWellKnown && newPort < 1024);

    setPort(newPort);
  };

  const copyToClipboard = () => {
    if (port) {
      navigator.clipboard.writeText(port.toString());
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Random Port Generator</CardTitle>
        <CardDescription>
          Generate random port numbers outside the well-known range.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Min Port</Label>
            <Input
              type="number"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>Max Port</Label>
            <Input
              type="number"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="exclude-well-known"
            checked={excludeWellKnown}
            onCheckedChange={setExcludeWellKnown}
          />
          <Label htmlFor="exclude-well-known">
            Exclude well-known ports (0-1023)
          </Label>
        </div>

        <Button onClick={generatePort} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate Port
        </Button>

        {port !== null && (
          <div className="flex items-center justify-center p-8 bg-muted rounded-md relative">
            <span className="text-4xl font-mono font-bold">{port}</span>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
