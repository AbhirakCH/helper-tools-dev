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

export default function CaseConverter() {
  const [input, setInput] = useState("");

  const toCamelCase = (str: string) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, "");
  };

  const toPascalCase = (str: string) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
      .replace(/\s+/g, "");
  };

  const toSnakeCase = (str: string) => {
    return str
      .replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join("_");
  };

  const toKebabCase = (str: string) => {
    return str
      .replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join("-");
  };

  const toConstantCase = (str: string) => {
    return str
      .replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map((word) => word.toUpperCase())
      .join("_");
  };

  const converters = [
    { name: "lower case", fn: (s: string) => s.toLowerCase() },
    { name: "UPPER CASE", fn: (s: string) => s.toUpperCase() },
    { name: "camelCase", fn: toCamelCase },
    { name: "PascalCase", fn: toPascalCase },
    { name: "snake_case", fn: toSnakeCase },
    { name: "kebab-case", fn: toKebabCase },
    { name: "CONSTANT_CASE", fn: toConstantCase },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Converter</CardTitle>
        <CardDescription>
          Convert text between different naming conventions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Input Text</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type text here..."
            className="min-h-[100px]"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {converters.map((converter) => (
            <div key={converter.name} className="space-y-2">
              <Label>{converter.name}</Label>
              <div className="flex gap-2">
                <div className="flex-1 rounded-md border bg-muted px-3 py-2 text-sm font-mono truncate">
                  {input ? converter.fn(input) : "..."}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(converter.fn(input))}
                  disabled={!input}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
