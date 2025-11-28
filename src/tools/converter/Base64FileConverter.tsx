import { useState, useRef } from "react";
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
import { Copy, Upload, Download } from "lucide-react";

export default function Base64FileConverter() {
  const [base64, setBase64] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setBase64(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!base64) return;

    const link = document.createElement("a");
    link.href = base64;
    link.download = fileName || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(base64);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Base64 File Converter</CardTitle>
        <CardDescription>
          Convert files to Base64 string and vice versa.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Upload File to Convert to Base64</Label>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              {fileName ? `Selected: ${fileName}` : "Select File"}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Base64 Output</Label>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                disabled={!base64}
              >
                <Copy className="h-3 w-3 mr-1" /> Copy
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                disabled={!base64}
              >
                <Download className="h-3 w-3 mr-1" /> Download
              </Button>
            </div>
          </div>
          <Textarea
            value={base64}
            onChange={(e) => setBase64(e.target.value)}
            placeholder="Base64 string will appear here..."
            className="min-h-[200px] font-mono break-all"
          />
        </div>
      </CardContent>
    </Card>
  );
}
