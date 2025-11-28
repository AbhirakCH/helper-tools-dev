import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Markdown from "react-markdown";

export default function MarkdownToHtml() {
  const [input, setInput] = useState("");

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Markdown to HTML</CardTitle>
        <CardDescription>
          Convert Markdown text to HTML preview.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-6 min-h-[500px]">
        <div className="grid gap-6 md:grid-cols-2 h-full">
          <div className="space-y-2 flex flex-col">
            <Label>Markdown Input</Label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="# Hello World"
              className="flex-1 font-mono resize-none"
            />
          </div>

          <div className="space-y-2 flex flex-col">
            <div className="flex items-center justify-between">
              <Label>Preview</Label>
            </div>
            <div className="flex-1 rounded-md border bg-muted p-4 overflow-auto prose dark:prose-invert max-w-none">
              <Markdown>{input}</Markdown>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
