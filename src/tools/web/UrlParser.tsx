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

export default function UrlParser() {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<URL | null>(null);
  const [params, setParams] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      if (!input) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setParsed(null);
        setParams({});
        return;
      }
      const url = new URL(input);
      setParsed(url);

      const p: Record<string, string> = {};
      url.searchParams.forEach((value, key) => {
        p[key] = value;
      });
      setParams(p);
    } catch {
      setParsed(null);
      setParams({});
    }
  }, [input]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>URL Parser</CardTitle>
        <CardDescription>
          Parse URL into protocol, hostname, port, path, query params, etc.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>URL to Parse</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://example.com:8080/path?query=123#hash"
          />
        </div>

        {parsed && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Protocol</Label>
              <Input value={parsed.protocol} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Hostname</Label>
              <Input value={parsed.hostname} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Port</Label>
              <Input value={parsed.port || "(default)"} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Path</Label>
              <Input value={parsed.pathname} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Hash</Label>
              <Input value={parsed.hash} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Origin</Label>
              <Input value={parsed.origin} readOnly />
            </div>
          </div>
        )}

        {Object.keys(params).length > 0 && (
          <div className="space-y-2">
            <Label>Query Parameters</Label>
            <div className="border rounded-md divide-y">
              {Object.entries(params).map(([key, value]) => (
                <div key={key} className="flex p-2">
                  <div className="w-1/3 font-medium text-sm break-all">
                    {key}
                  </div>
                  <div className="w-2/3 text-sm break-all">{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
