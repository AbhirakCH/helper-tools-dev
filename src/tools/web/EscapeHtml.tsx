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
import { Copy, ArrowRightLeft } from "lucide-react";

export default function EscapeHtml() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"escape" | "unescape">("escape");

  const process = () => {
    if (!input) {
      setOutput("");
      return;
    }

    if (mode === "escape") {
      setOutput(
        input
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")
      );
    } else {
      const doc = new DOMParser().parseFromString(input, "text/html");
      setOutput(doc.documentElement.textContent || "");
    }
  };

  const toggleMode = () => {
    setMode(mode === "escape" ? "unescape" : "escape");
    setInput(output);
    setOutput(input);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Escape HTML Entities</CardTitle>
        <CardDescription>Escape or unescape HTML entities.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <Button variant="outline" onClick={toggleMode}>
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            Switch to {mode === "escape" ? "Unescape" : "Escape"}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>{mode === "escape" ? "Unescaped" : "Escaped"}</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(input)}
                disabled={!input}
              >
                <Copy className="h-3 w-3 mr-1" /> Copy
              </Button>
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === "escape"
                  ? "<div>Content</div>"
                  : "&lt;div&gt;Content&lt;/div&gt;"
              }
              className="min-h-[300px] font-mono"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>{mode === "escape" ? "Escaped" : "Unescaped"}</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(output)}
                disabled={!output}
              >
                <Copy className="h-3 w-3 mr-1" /> Copy
              </Button>
            </div>
            <Textarea
              value={output}
              readOnly
              placeholder="Output will appear here..."
              className="min-h-[300px] font-mono bg-muted"
            />
          </div>
        </div>

        <Button onClick={process} className="w-full">
          {mode === "escape" ? "Escape" : "Unescape"}
        </Button>
      </CardContent>
    </Card>
  );
}
