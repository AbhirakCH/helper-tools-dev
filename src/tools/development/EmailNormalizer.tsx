import { useState } from "react";
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

export default function EmailNormalizer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const normalize = () => {
    if (!input) {
      setOutput("");
      return;
    }

    const email = input.trim().toLowerCase();
    const parts = email.split("@");
    if (parts.length !== 2) {
      setOutput("Invalid email format");
      return;
    }

    let [local, domain] = parts;

    if (domain === "gmail.com" || domain === "googlemail.com") {
      domain = "gmail.com";
      // Remove dots
      local = local.replace(/\./g, "");
      // Remove tags
      local = local.split("+")[0];
    } else if (
      domain === "outlook.com" ||
      domain === "hotmail.com" ||
      domain === "live.com"
    ) {
      // Remove tags for microsoft emails
      local = local.split("+")[0];
    }

    setOutput(`${local}@${domain}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Normalizer</CardTitle>
        <CardDescription>
          Normalize email addresses (e.g. remove dots and tags for Gmail).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Email Address</Label>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="example.email+tag@gmail.com"
          />
        </div>

        <Button onClick={normalize} className="w-full">
          Normalize
        </Button>

        {output && (
          <div className="space-y-2">
            <Label>Normalized Email</Label>
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
