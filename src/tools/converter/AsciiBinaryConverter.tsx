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

export default function AsciiBinaryConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"toBinary" | "toText">("toBinary");

  const convert = () => {
    if (!input) {
      setOutput("");
      return;
    }

    try {
      if (mode === "toBinary") {
        setOutput(
          input
            .split("")
            .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
            .join(" ")
        );
      } else {
        setOutput(
          input
            .split(" ")
            .map((bin) => String.fromCharCode(parseInt(bin, 2)))
            .join("")
        );
      }
    } catch {
      setOutput("Error: Invalid input");
    }
  };

  const toggleMode = () => {
    setMode(mode === "toBinary" ? "toText" : "toBinary");
    setInput(output);
    setOutput(input);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Text to ASCII Binary</CardTitle>
        <CardDescription>
          Convert text to ASCII binary representation and vice versa.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <Button variant="outline" onClick={toggleMode}>
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            Switch to{" "}
            {mode === "toBinary" ? "Binary to Text" : "Text to Binary"}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>{mode === "toBinary" ? "Text" : "Binary"}</Label>
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
                mode === "toBinary"
                  ? "Type text here..."
                  : "Type binary here (space separated)..."
              }
              className="min-h-[200px] font-mono"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>{mode === "toBinary" ? "Binary" : "Text"}</Label>
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
