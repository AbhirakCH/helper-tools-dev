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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UAParser } from "ua-parser-js";

export default function UserAgentParser() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<UAParser.IResult | null>(null);

  useEffect(() => {
    // Default to current user agent
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInput(navigator.userAgent);
  }, []);

  useEffect(() => {
    if (!input) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResult(null);
      return;
    }
    const parser = new UAParser(input);
    setResult(parser.getResult());
  }, [input]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>User-Agent Parser</CardTitle>
        <CardDescription>
          Parse User-Agent string to identify browser, OS, device.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>User Agent String</Label>
            <Button
              variant="link"
              className="h-auto p-0 text-xs"
              onClick={() => setInput(navigator.userAgent)}
            >
              Use My User Agent
            </Button>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mozilla/5.0..."
            className="min-h-[100px]"
          />
        </div>

        {result && (
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-4">
              <h3 className="font-semibold">Browser</h3>
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={result.browser.name || "-"} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Version</Label>
                <Input value={result.browser.version || "-"} readOnly />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">OS</h3>
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={result.os.name || "-"} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Version</Label>
                <Input value={result.os.version || "-"} readOnly />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Device</h3>
              <div className="space-y-2">
                <Label>Vendor</Label>
                <Input value={result.device.vendor || "-"} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Model</Label>
                <Input value={result.device.model || "-"} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Input value={result.device.type || "Desktop"} readOnly />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Engine</h3>
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={result.engine.name || "-"} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Version</Label>
                <Input value={result.engine.version || "-"} readOnly />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">CPU</h3>
              <div className="space-y-2">
                <Label>Architecture</Label>
                <Input value={result.cpu.architecture || "-"} readOnly />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
