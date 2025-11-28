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
// @ts-expect-error - composerize does not have types
import composerize from "composerize";

export default function DockerRunToCompose() {
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
      const compose = composerize(input);
      setOutput(compose);
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
        <CardTitle>Docker Run to Compose Converter</CardTitle>
        <CardDescription>
          Convert "docker run" commands to docker-compose.yml files.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Docker Run Command</Label>
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
              placeholder="docker run -d -p 80:80 nginx"
              className="min-h-[300px] font-mono"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Docker Compose Output</Label>
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
              placeholder="docker-compose.yml content will appear here..."
              className="min-h-[300px] font-mono bg-muted"
            />
          </div>
        </div>

        <Button onClick={convert} className="w-full">
          Convert to Docker Compose
        </Button>
      </CardContent>
    </Card>
  );
}
