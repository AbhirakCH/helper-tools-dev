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
import { Copy, Download } from "lucide-react";
import Papa from "papaparse";

export default function JsonToCsv() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    if (!input.trim()) {
      setOutput("");
      setError("");
      return;
    }

    try {
      const obj = JSON.parse(input);
      const csv = Papa.unparse(obj);
      setOutput(csv);
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadCsv = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>JSON to CSV Converter</CardTitle>
        <CardDescription>
          Convert JSON array of objects to CSV format.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>JSON Input</Label>
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
              placeholder='[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
              className="min-h-[300px] font-mono"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>CSV Output</Label>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(output)}
                  disabled={!output}
                >
                  <Copy className="h-3 w-3 mr-1" /> Copy
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={downloadCsv}
                  disabled={!output}
                >
                  <Download className="h-3 w-3 mr-1" /> Download
                </Button>
              </div>
            </div>
            <Textarea
              value={output}
              readOnly
              placeholder="CSV output will appear here..."
              className="min-h-[300px] font-mono bg-muted"
            />
          </div>
        </div>

        <Button onClick={convert} className="w-full">
          Convert to CSV
        </Button>
      </CardContent>
    </Card>
  );
}
