import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";

export default function SlugifyString() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (!input) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOutput("");
      return;
    }

    const slug = input
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setOutput(slug);
  }, [input]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Slugify String</CardTitle>
        <CardDescription>Convert string to URL-friendly slug.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>String to Slugify</Label>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Hello World! This is a test."
          />
        </div>

        {output && (
          <div className="space-y-2">
            <Label>Slug</Label>
            <div className="flex gap-2">
              <Input value={output} readOnly />
              <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
