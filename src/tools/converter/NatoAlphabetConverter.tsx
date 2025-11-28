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

const natoMap: { [key: string]: string } = {
  A: "Alpha",
  B: "Bravo",
  C: "Charlie",
  D: "Delta",
  E: "Echo",
  F: "Foxtrot",
  G: "Golf",
  H: "Hotel",
  I: "India",
  J: "Juliett",
  K: "Kilo",
  L: "Lima",
  M: "Mike",
  N: "November",
  O: "Oscar",
  P: "Papa",
  Q: "Quebec",
  R: "Romeo",
  S: "Sierra",
  T: "Tango",
  U: "Uniform",
  V: "Victor",
  W: "Whiskey",
  X: "X-ray",
  Y: "Yankee",
  Z: "Zulu",
  "0": "Zero",
  "1": "One",
  "2": "Two",
  "3": "Three",
  "4": "Four",
  "5": "Five",
  "6": "Six",
  "7": "Seven",
  "8": "Eight",
  "9": "Nine",
};

export default function NatoAlphabetConverter() {
  const [input, setInput] = useState("");

  const convertToNato = (str: string) => {
    return str
      .toUpperCase()
      .split("")
      .map((char) => {
        if (char === " ") return "(space)";
        return natoMap[char] || char;
      })
      .join(" ");
  };

  const output = convertToNato(input);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Text to NATO Alphabet</CardTitle>
        <CardDescription>
          Convert text to NATO phonetic alphabet.
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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>NATO Phonetic</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              disabled={!output}
            >
              <Copy className="h-3 w-3 mr-1" /> Copy
            </Button>
          </div>
          <div className="rounded-md bg-muted p-4 font-mono text-sm min-h-[100px] whitespace-pre-wrap">
            {output}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
