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
import yaml from "js-yaml";
import toml from "@iarna/toml";

export default function YamlTomlConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"yamlToToml" | "tomlToYaml">("yamlToToml");
  const [error, setError] = useState("");

  const convert = () => {
    if (!input.trim()) {
      setOutput("");
      setError("");
      return;
    }

    try {
      if (mode === "yamlToToml") {
        const obj = yaml.load(input);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setOutput(toml.stringify(obj as any));
      } else {
        const obj = toml.parse(input);
        setOutput(yaml.dump(obj));
      }
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const toggleMode = () => {
    setMode(mode === "yamlToToml" ? "tomlToYaml" : "yamlToToml");
    setInput(output);
    setOutput(input);
    setError("");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>YAML &lt;&gt; TOML Converter</CardTitle>
        <CardDescription>Convert YAML to TOML and vice versa.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <Button variant="outline" onClick={toggleMode}>
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            Switch to {mode === "yamlToToml" ? "TOML to YAML" : "YAML to TOML"}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>{mode === "yamlToToml" ? "YAML" : "TOML"}</Label>
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
                mode === "yamlToToml" ? "key: value" : 'key = "value"'
              }
              className="min-h-[300px] font-mono"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>{mode === "yamlToToml" ? "TOML" : "YAML"}</Label>
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

        <Button onClick={convert} className="w-full">
          Convert
        </Button>
      </CardContent>
    </Card>
  );
}
