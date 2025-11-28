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
import { Copy } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ListConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [format, setFormat] = useState("comma");

  const convert = () => {
    if (!input) {
      setOutput("");
      return;
    }

    const items = input.split(/\r?\n/).filter((line) => line.trim() !== "");

    switch (format) {
      case "comma":
        setOutput(items.join(", "));
        break;
      case "comma-quote":
        setOutput(items.map((item) => `'${item}'`).join(", "));
        break;
      case "comma-double-quote":
        setOutput(items.map((item) => `"${item}"`).join(", "));
        break;
      case "json":
        setOutput(JSON.stringify(items, null, 2));
        break;
      case "sql":
        setOutput(`(${items.map((item) => `'${item}'`).join(", ")})`);
        break;
      default:
        setOutput(items.join("\n"));
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>List Converter</CardTitle>
        <CardDescription>
          Convert newline-separated lists to other formats.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Input List (one item per line)</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Item 1&#10;Item 2&#10;Item 3"
            className="min-h-[150px]"
          />
        </div>

        <div className="flex gap-4">
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="comma">Comma separated</SelectItem>
              <SelectItem value="comma-quote">Comma + Single Quotes</SelectItem>
              <SelectItem value="comma-double-quote">
                Comma + Double Quotes
              </SelectItem>
              <SelectItem value="json">JSON Array</SelectItem>
              <SelectItem value="sql">SQL IN Clause</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={convert} className="flex-1">
            Convert
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Output</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              disabled={!output}
            >
              <Copy className="h-3 w-3 mr-1" /> Copy
            </Button>
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder="Output will appear here..."
            className="min-h-[150px] font-mono bg-muted"
          />
        </div>
      </CardContent>
    </Card>
  );
}
