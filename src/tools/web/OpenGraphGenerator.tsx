import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export default function OpenGraphGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [siteName, setSiteName] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    const meta = [
      `<meta property="og:title" content="${title}" />`,
      `<meta property="og:description" content="${description}" />`,
      `<meta property="og:image" content="${image}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:site_name" content="${siteName}" />`,
      `<meta property="og:type" content="website" />`,
    ]
      .filter((tag) => !tag.includes('content=""'))
      .join("\n");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOutput(meta);
  }, [title, description, image, url, siteName]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Open Graph Meta Generator</CardTitle>
        <CardDescription>
          Generate Open Graph meta tags for your website.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Page Title"
            />
          </div>
          <div className="space-y-2">
            <Label>Site Name</Label>
            <Input
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="My Website"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Page description..."
            />
          </div>
          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="space-y-2">
            <Label>Page URL</Label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/page"
            />
          </div>
        </div>

        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Generated Meta Tags</Label>
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                <Copy className="h-3 w-3 mr-1" /> Copy
              </Button>
            </div>
            <Textarea
              value={output}
              readOnly
              className="min-h-[200px] font-mono bg-muted"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
