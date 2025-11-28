import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MimeType {
  extension: string;
  mime: string;
  description: string;
}

const mimeTypes: MimeType[] = [
  { extension: ".aac", mime: "audio/aac", description: "AAC audio" },
  {
    extension: ".abw",
    mime: "application/x-abiword",
    description: "AbiWord document",
  },
  {
    extension: ".arc",
    mime: "application/x-freearc",
    description: "Archive document (multiple files embedded)",
  },
  { extension: ".avif", mime: "image/avif", description: "AVIF image" },
  {
    extension: ".avi",
    mime: "video/x-msvideo",
    description: "AVI: Audio Video Interleave",
  },
  {
    extension: ".azw",
    mime: "application/vnd.amazon.ebook",
    description: "Amazon Kindle eBook format",
  },
  {
    extension: ".bin",
    mime: "application/octet-stream",
    description: "Any kind of binary data",
  },
  {
    extension: ".bmp",
    mime: "image/bmp",
    description: "Windows OS/2 Bitmap Graphics",
  },
  { extension: ".bz", mime: "application/x-bzip", description: "BZip archive" },
  {
    extension: ".bz2",
    mime: "application/x-bzip2",
    description: "BZip2 archive",
  },
  { extension: ".cda", mime: "application/x-cdf", description: "CD audio" },
  {
    extension: ".csh",
    mime: "application/x-csh",
    description: "C-Shell script",
  },
  {
    extension: ".css",
    mime: "text/css",
    description: "Cascading Style Sheets (CSS)",
  },
  {
    extension: ".csv",
    mime: "text/csv",
    description: "Comma-separated values (CSV)",
  },
  {
    extension: ".doc",
    mime: "application/msword",
    description: "Microsoft Word",
  },
  {
    extension: ".docx",
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    description: "Microsoft Word (OpenXML)",
  },
  {
    extension: ".eot",
    mime: "application/vnd.ms-fontobject",
    description: "MS Embedded OpenType fonts",
  },
  {
    extension: ".epub",
    mime: "application/epub+zip",
    description: "Electronic publication (EPUB)",
  },
  {
    extension: ".gz",
    mime: "application/gzip",
    description: "GZip Compressed Archive",
  },
  {
    extension: ".gif",
    mime: "image/gif",
    description: "Graphics Interchange Format (GIF)",
  },
  {
    extension: ".htm, .html",
    mime: "text/html",
    description: "HyperText Markup Language (HTML)",
  },
  {
    extension: ".ico",
    mime: "image/vnd.microsoft.icon",
    description: "Icon format",
  },
  { extension: ".ics", mime: "text/calendar", description: "iCalendar format" },
  {
    extension: ".jar",
    mime: "application/java-archive",
    description: "Java Archive (JAR)",
  },
  { extension: ".jpeg, .jpg", mime: "image/jpeg", description: "JPEG images" },
  { extension: ".js", mime: "text/javascript", description: "JavaScript" },
  { extension: ".json", mime: "application/json", description: "JSON format" },
  {
    extension: ".jsonld",
    mime: "application/ld+json",
    description: "JSON-LD format",
  },
  {
    extension: ".mid, .midi",
    mime: "audio/midi, audio/x-midi",
    description: "Musical Instrument Digital Interface (MIDI)",
  },
  {
    extension: ".mjs",
    mime: "text/javascript",
    description: "JavaScript module",
  },
  { extension: ".mp3", mime: "audio/mpeg", description: "MP3 audio" },
  { extension: ".mp4", mime: "video/mp4", description: "MP4 video" },
  { extension: ".mpeg", mime: "video/mpeg", description: "MPEG Video" },
  {
    extension: ".mpkg",
    mime: "application/vnd.apple.installer+xml",
    description: "Apple Installer Package",
  },
  {
    extension: ".odp",
    mime: "application/vnd.oasis.opendocument.presentation",
    description: "OpenDocument presentation document",
  },
  {
    extension: ".ods",
    mime: "application/vnd.oasis.opendocument.spreadsheet",
    description: "OpenDocument spreadsheet document",
  },
  {
    extension: ".odt",
    mime: "application/vnd.oasis.opendocument.text",
    description: "OpenDocument text document",
  },
  { extension: ".oga", mime: "audio/ogg", description: "OGG audio" },
  { extension: ".ogv", mime: "video/ogg", description: "OGG video" },
  { extension: ".ogx", mime: "application/ogg", description: "OGG" },
  { extension: ".opus", mime: "audio/opus", description: "Opus audio" },
  { extension: ".otf", mime: "font/otf", description: "OpenType font" },
  {
    extension: ".png",
    mime: "image/png",
    description: "Portable Network Graphics",
  },
  {
    extension: ".pdf",
    mime: "application/pdf",
    description: "Adobe Portable Document Format (PDF)",
  },
  {
    extension: ".php",
    mime: "application/x-httpd-php",
    description: "Hypertext Preprocessor (Personal Home Page)",
  },
  {
    extension: ".ppt",
    mime: "application/vnd.ms-powerpoint",
    description: "Microsoft PowerPoint",
  },
  {
    extension: ".pptx",
    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    description: "Microsoft PowerPoint (OpenXML)",
  },
  {
    extension: ".rar",
    mime: "application/vnd.rar",
    description: "RAR archive",
  },
  {
    extension: ".rtf",
    mime: "application/rtf",
    description: "Rich Text Format (RTF)",
  },
  {
    extension: ".sh",
    mime: "application/x-sh",
    description: "Bourne shell script",
  },
  {
    extension: ".svg",
    mime: "image/svg+xml",
    description: "Scalable Vector Graphics (SVG)",
  },
  {
    extension: ".tar",
    mime: "application/x-tar",
    description: "Tape Archive (TAR)",
  },
  {
    extension: ".tif, .tiff",
    mime: "image/tiff",
    description: "Tagged Image File Format (TIFF)",
  },
  {
    extension: ".ts",
    mime: "video/mp2t",
    description: "MPEG transport stream",
  },
  { extension: ".ttf", mime: "font/ttf", description: "TrueType Font" },
  {
    extension: ".txt",
    mime: "text/plain",
    description: "Text, (generally ASCII or ISO 8859-n)",
  },
  {
    extension: ".vsd",
    mime: "application/vnd.visio",
    description: "Microsoft Visio",
  },
  {
    extension: ".wav",
    mime: "audio/wav",
    description: "Waveform Audio Format",
  },
  { extension: ".weba", mime: "audio/webm", description: "WEBM audio" },
  { extension: ".webm", mime: "video/webm", description: "WEBM video" },
  { extension: ".webp", mime: "image/webp", description: "WEBP image" },
  {
    extension: ".woff",
    mime: "font/woff",
    description: "Web Open Font Format (WOFF)",
  },
  {
    extension: ".woff2",
    mime: "font/woff2",
    description: "Web Open Font Format (WOFF)",
  },
  { extension: ".xhtml", mime: "application/xhtml+xml", description: "XHTML" },
  {
    extension: ".xls",
    mime: "application/vnd.ms-excel",
    description: "Microsoft Excel",
  },
  {
    extension: ".xlsx",
    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    description: "Microsoft Excel (OpenXML)",
  },
  { extension: ".xml", mime: "application/xml", description: "XML" },
  {
    extension: ".xul",
    mime: "application/vnd.mozilla.xul+xml",
    description: "XUL",
  },
  { extension: ".zip", mime: "application/zip", description: "ZIP archive" },
  {
    extension: ".3gp",
    mime: "video/3gpp",
    description: "3GPP audio/video container",
  },
  {
    extension: ".3g2",
    mime: "video/3gpp2",
    description: "3GPP2 audio/video container",
  },
  {
    extension: ".7z",
    mime: "application/x-7z-compressed",
    description: "7-zip archive",
  },
];

export default function MimeTypes() {
  const [search, setSearch] = useState("");

  const filtered = mimeTypes.filter(
    (item) =>
      item.extension.toLowerCase().includes(search.toLowerCase()) ||
      item.mime.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>MIME Types</CardTitle>
        <CardDescription>
          Searchable list of MIME types and extensions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Search</Label>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by extension, mime type, or description..."
          />
        </div>

        <div className="border rounded-md divide-y">
          <div className="grid grid-cols-3 p-3 font-semibold bg-muted/50">
            <div>Extension</div>
            <div>MIME Type</div>
            <div>Description</div>
          </div>
          {filtered.map((item) => (
            <div
              key={item.extension}
              className="grid grid-cols-3 p-3 text-sm hover:bg-accent/50 transition-colors"
            >
              <div className="font-mono">{item.extension}</div>
              <div className="font-mono break-all">{item.mime}</div>
              <div>{item.description}</div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="p-4 text-center text-muted-foreground">
              No results found.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
