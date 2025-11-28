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
import { format } from "sql-formatter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SqlPrettify() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [dialect, setDialect] = useState("sql");
  const [error, setError] = useState("");

  const formatSql = () => {
    if (!input.trim()) {
      setOutput("");
      setError("");
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const formatted = format(input, { language: dialect as any });
      setOutput(formatted);
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SQL Prettify/Format</CardTitle>
        <CardDescription>
          Format and prettify SQL queries for various dialects.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-end">
          <div className="w-[200px]">
            <Select value={dialect} onValueChange={setDialect}>
              <SelectTrigger>
                <SelectValue placeholder="Select Dialect" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sql">Standard SQL</SelectItem>
                <SelectItem value="mysql">MySQL</SelectItem>
                <SelectItem value="postgresql">PostgreSQL</SelectItem>
                <SelectItem value="sqlite">SQLite</SelectItem>
                <SelectItem value="transactsql">Transact-SQL</SelectItem>
                <SelectItem value="plsql">PL/SQL</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>SQL Input</Label>
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
              placeholder="SELECT * FROM table WHERE id = 1"
              className="min-h-[300px] font-mono"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Formatted Output</Label>
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
              placeholder="Formatted SQL will appear here..."
              className="min-h-[300px] font-mono bg-muted"
            />
          </div>
        </div>

        <Button onClick={formatSql} className="w-full">
          Format SQL
        </Button>
      </CardContent>
    </Card>
  );
}
