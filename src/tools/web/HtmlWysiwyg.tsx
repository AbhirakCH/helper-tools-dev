import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

export default function HtmlWysiwyg() {
  const [value] = useState("");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>HTML WYSIWYG Editor</CardTitle>
        <CardDescription>Simple HTML WYSIWYG editor.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Editor</Label>
          <div className="bg-background text-foreground">
            {/* <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              className="h-[200px] mb-12"
            /> */}
            <p>Editor temporarily disabled due to build issues.</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>HTML Output</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              disabled={!value}
            >
              <Copy className="h-3 w-3 mr-1" /> Copy
            </Button>
          </div>
          <div className="p-4 rounded-md border bg-muted font-mono text-sm break-all min-h-[100px]">
            {value}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
