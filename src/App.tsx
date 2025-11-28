import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "@/components/Layout/AppShell";
import { Dashboard } from "@/pages/Dashboard";
import { tools } from "@/config/tools";
import { Suspense } from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="category/:category" element={<Dashboard />} />
          {tools.map((tool) => (
            <Route
              key={tool.id}
              path={`tool/${tool.id}`}
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                      <h1 className="text-3xl font-bold">{tool.name}</h1>
                      <p className="text-muted-foreground">
                        {tool.description}
                      </p>
                    </div>
                    <tool.component />
                  </div>
                </Suspense>
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
