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
import { Badge } from "@/components/ui/badge";

interface StatusCode {
  code: number;
  title: string;
  description: string;
  category: string;
}

const statusCodes: StatusCode[] = [
  {
    code: 100,
    title: "Continue",
    description:
      "The server has received the request headers and the client should proceed to send the request body.",
    category: "1xx Informational",
  },
  {
    code: 101,
    title: "Switching Protocols",
    description:
      "The requester has asked the server to switch protocols and the server has agreed to do so.",
    category: "1xx Informational",
  },
  {
    code: 200,
    title: "OK",
    description: "Standard response for successful HTTP requests.",
    category: "2xx Success",
  },
  {
    code: 201,
    title: "Created",
    description:
      "The request has been fulfilled, resulting in the creation of a new resource.",
    category: "2xx Success",
  },
  {
    code: 202,
    title: "Accepted",
    description:
      "The request has been accepted for processing, but the processing has not been completed.",
    category: "2xx Success",
  },
  {
    code: 204,
    title: "No Content",
    description:
      "The server successfully processed the request and is not returning any content.",
    category: "2xx Success",
  },
  {
    code: 301,
    title: "Moved Permanently",
    description: "The requested page has moved to a new URL.",
    category: "3xx Redirection",
  },
  {
    code: 302,
    title: "Found",
    description: "The requested page has moved temporarily to a new URL.",
    category: "3xx Redirection",
  },
  {
    code: 304,
    title: "Not Modified",
    description:
      "Indicates that the resource has not been modified since the version specified by the request headers.",
    category: "3xx Redirection",
  },
  {
    code: 400,
    title: "Bad Request",
    description:
      "The server cannot or will not process the request due to an apparent client error.",
    category: "4xx Client Error",
  },
  {
    code: 401,
    title: "Unauthorized",
    description:
      "Authentication is required and has failed or has not yet been provided.",
    category: "4xx Client Error",
  },
  {
    code: 403,
    title: "Forbidden",
    description: "The request was valid, but the server is refusing action.",
    category: "4xx Client Error",
  },
  {
    code: 404,
    title: "Not Found",
    description:
      "The requested resource could not be found but may be available in the future.",
    category: "4xx Client Error",
  },
  {
    code: 405,
    title: "Method Not Allowed",
    description:
      "A request method is not supported for the requested resource.",
    category: "4xx Client Error",
  },
  {
    code: 429,
    title: "Too Many Requests",
    description:
      "The user has sent too many requests in a given amount of time.",
    category: "4xx Client Error",
  },
  {
    code: 500,
    title: "Internal Server Error",
    description:
      "A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.",
    category: "5xx Server Error",
  },
  {
    code: 502,
    title: "Bad Gateway",
    description:
      "The server was acting as a gateway or proxy and received an invalid response from the upstream server.",
    category: "5xx Server Error",
  },
  {
    code: 503,
    title: "Service Unavailable",
    description:
      "The server is currently unavailable (because it is overloaded or down for maintenance).",
    category: "5xx Server Error",
  },
  {
    code: 504,
    title: "Gateway Timeout",
    description:
      "The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.",
    category: "5xx Server Error",
  },
];

export default function HttpStatusCodes() {
  const [search, setSearch] = useState("");

  const filteredCodes = statusCodes.filter(
    (item) =>
      item.code.toString().includes(search) ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(
    new Set(filteredCodes.map((item) => item.category))
  ).sort();

  return (
    <Card>
      <CardHeader>
        <CardTitle>HTTP Status Codes</CardTitle>
        <CardDescription>
          List of HTTP status codes and their descriptions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Search</Label>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by code, title, or description..."
          />
        </div>

        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category} className="space-y-2">
              <h3 className="font-semibold text-lg">{category}</h3>
              <div className="grid gap-2">
                {filteredCodes
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <div
                      key={item.code}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-md border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-2 sm:mb-0">
                        <Badge
                          variant={
                            category.startsWith("2")
                              ? "default"
                              : category.startsWith("3")
                              ? "secondary"
                              : category.startsWith("4")
                              ? "destructive"
                              : category.startsWith("5")
                              ? "destructive"
                              : "outline"
                          }
                          className="font-mono"
                        >
                          {item.code}
                        </Badge>
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <span className="text-sm text-muted-foreground text-right">
                        {item.description}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
          {filteredCodes.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No status codes found matching "{search}"
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
