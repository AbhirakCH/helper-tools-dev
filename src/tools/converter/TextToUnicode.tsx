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

export default function TextToUnicode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"toUnicode" | "toText">("toUnicode");

  const convert = () => {
    if (!input) {
      setOutput("");
      return;
    }

    try {
      if (mode === "toUnicode") {
        setOutput(
          input
            .split("")
            .map((char) => {
              const hex = char
                .charCodeAt(0)
                .toString(16)
                .toUpperCase()
                .padStart(4, "0");
              return `\\u${hex}`;
            })
            .join("")
        );
      } else {
        setOutput(JSON.parse(`"${input}"`));
      }
    } catch {
      setOutput("Error: Invalid input");
    }
  };

  const toggleMode = () => {
    setMode(mode === "toUnicode" ? "toText" : "toUnicode");
    setInput(output);
    setOutput(input);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Text to Unicode</CardTitle>
        <CardDescription>
          Convert text to Unicode escape sequences and vice versa.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <Button variant="outline" onClick={toggleMode}>
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            Switch to{" "}
            {mode === "toUnicode" ? "Unicode to Text" : "Text to Unicode"}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>{mode === "toUnicode" ? "Text" : "Unicode"}</Label>
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
                mode === "toUnicode"
                  ? "Type text here..."
                  : "Type unicode here (e.g. \\u0041)..."
              }
              className="min-h-[200px] font-mono"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>{mode === "toUnicode" ? "Unicode" : "Text"}</Label>
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
              className="min-h-[200px] font-mono bg-muted"
            />
          </div>
        </div>

        <Button onClick={convert} className="w-full">
          Convert
        </Button>
      </CardContent>
    </Card>
  );
}
