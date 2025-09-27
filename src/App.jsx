import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ThemeProvider from "./providers/ThemeProvider";
import ServerErrorBoundary from "./pages/error/ServerErrorBoundary";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import IntegrationsPage from "./pages/IntegrationsPage";
import IntegrationSetupPage from "./pages/IntegrationSetupPage";
import ReleasesPage from "./pages/ReleasesPage";
import { ClerkProvider } from "@clerk/clerk-react";
import SignUpPage from "./pages/auth/SignUpPage";

const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient();

function App() {
  return (
    <ServerErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
        <ClerkProvider publishableKey={clerkFrontendApi}>
          <BrowserRouter>
            <AppLayout>
              <Routes>
                {/* Public routes - only accessible when not logged in */}
                <Route path="/login/*" element={<LoginPage />} />
                <Route path="/signup/*" element={<SignUpPage />} />
                
                {/* Protected routes - only accessible when logged in */}
                <Route path="/*" element={
                  <ProtectedRoute>
                    <Routes>
                      <Route path="/integrations" element={<IntegrationsPage />} />
                      <Route
                        path="/integrations/:id/new"
                        element={<IntegrationSetupPage />}
                      />
                      <Route path="/releases" element={<ReleasesPage />} />
                      <Route path="/*" element={<Dashboard />} />
                    </Routes>
                  </ProtectedRoute>
                } />
              </Routes>
            </AppLayout>
          </BrowserRouter>
          </ClerkProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ServerErrorBoundary>
  );
}

export default App;
