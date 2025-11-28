import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Minimize, Maximize } from "lucide-react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatJson = (minify: boolean) => {
    try {
      if (!input.trim()) {
        setOutput("");
        setError("");
        return;
      }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, minify ? 0 : 2));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>JSON Prettify/Minify</CardTitle>
        <CardDescription>Format or minify JSON data.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Input JSON</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste JSON here..."
            className="min-h-[200px] font-mono"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <div className="flex gap-2">
          <Button onClick={() => formatJson(false)} className="flex-1">
            <Maximize className="mr-2 h-4 w-4" />
            Prettify
          </Button>
          <Button
            onClick={() => formatJson(true)}
            className="flex-1"
            variant="outline"
          >
            <Minimize className="mr-2 h-4 w-4" />
            Minify
          </Button>
        </div>

        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Output</Label>
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                <Copy className="h-3 w-3 mr-1" /> Copy
              </Button>
            </div>
            <Textarea
              value={output}
              readOnly
              className="min-h-[200px] font-mono bg-muted"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
