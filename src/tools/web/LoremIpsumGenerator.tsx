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
import { Copy, RefreshCw } from "lucide-react";

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [text, setText] = useState("");

  const generateLorem = () => {
    const words = [
      "lorem",
      "ipsum",
      "dolor",
      "sit",
      "amet",
      "consectetur",
      "adipiscing",
      "elit",
      "sed",
      "do",
      "eiusmod",
      "tempor",
      "incididunt",
      "ut",
      "labore",
      "et",
      "dolore",
      "magna",
      "aliqua",
      "ut",
      "enim",
      "ad",
      "minim",
      "veniam",
      "quis",
      "nostrud",
      "exercitation",
      "ullamco",
      "laboris",
      "nisi",
      "ut",
      "aliquip",
      "ex",
      "ea",
      "commodo",
      "consequat",
      "duis",
      "aute",
      "irure",
      "dolor",
      "in",
      "reprehenderit",
      "in",
      "voluptate",
      "velit",
      "esse",
      "cillum",
      "dolore",
      "eu",
      "fugiat",
      "nulla",
      "pariatur",
      "excepteur",
      "sint",
      "occaecat",
      "cupidatat",
      "non",
      "proident",
      "sunt",
      "in",
      "culpa",
      "qui",
      "officia",
      "deserunt",
      "mollit",
      "anim",
      "id",
      "est",
      "laborum",
    ];

    const result = [];

    for (let i = 0; i < paragraphs; i++) {
      const paragraph = [];
      const sentenceCount = Math.floor(Math.random() * 5) + 3; // 3-8 sentences per paragraph

      for (let j = 0; j < sentenceCount; j++) {
        const wordCount = Math.floor(Math.random() * 10) + 5; // 5-15 words per sentence
        const sentence = [];

        for (let k = 0; k < wordCount; k++) {
          sentence.push(words[Math.floor(Math.random() * words.length)]);
        }

        // Capitalize first letter
        sentence[0] =
          sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
        // Add period
        const sentenceStr = sentence.join(" ") + ".";
        paragraph.push(sentenceStr);
      }

      result.push(paragraph.join(" "));
    }

    let final = result.join("\n\n");

    if (startWithLorem) {
      const prefix =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
      if (!final.startsWith("Lorem")) {
        // Just prepend it to the first paragraph
        final = prefix + final.charAt(0).toLowerCase() + final.slice(1);
      }
    }

    setText(final);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lorem Ipsum Generator</CardTitle>
        <CardDescription>
          Generate placeholder text for your designs.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Paragraphs</Label>
            <Input
              type="number"
              value={paragraphs}
              onChange={(e) => setParagraphs(Number(e.target.value))}
              min={1}
              max={20}
            />
          </div>
          <div className="space-y-2">
            <Label>Options</Label>
            <div className="flex items-center gap-2 pt-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={startWithLorem}
                  onChange={(e) => setStartWithLorem(e.target.checked)}
                  className="rounded border-gray-300"
                />
                Start with "Lorem ipsum..."
              </label>
            </div>
          </div>
        </div>

        <Button onClick={generateLorem} className="w-full md:w-auto">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate
        </Button>

        {text && (
          <div className="relative">
            <div className="rounded-md bg-muted p-4 whitespace-pre-wrap text-sm max-h-[400px] overflow-y-auto">
              {text}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 bg-background/50 hover:bg-background"
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
