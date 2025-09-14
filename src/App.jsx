import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ThemeProvider from "./providers/ThemeProvider";
import ServerErrorBoundary from "./pages/error/ServerErrorBoundary";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import AppLayout from "./components/AppLayout";
import IntegrationsPage from "./pages/IntegrationsPage";
import IntegrationSetupPage from "./pages/IntegrationSetupPage";

const queryClient = new QueryClient();

function App() {
  return (
    <ServerErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AppLayout>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/integrations" element={<IntegrationsPage />} />
                <Route
                  path="/integrations/:id/new"
                  element={<IntegrationSetupPage />}
                />
                <Route path="/*" element={<Dashboard />} />
              </Routes>
            </AppLayout>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </ServerErrorBoundary>
  );
}

export default App;
