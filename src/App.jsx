import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./providers/ThemeProvider";
import { UsersProvider } from "./providers/UsersProvider";
import ServerErrorBoundary from "./pages/error/ServerErrorBoundary";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import IntegrationsPage from "./pages/IntegrationsPage";
import IntegrationSetupPage from "./pages/IntegrationSetupPage";
import ReleasesPage from "./pages/ReleasesPage";
import ReleaseDetailsPage from "./pages/ReleaseDetailsPage";
import IssuesPage from "./pages/IssuesPage";
import SettingsPage from "./pages/SettingsPage";
import ChatPage from "./pages/ChatPage";
import { ClerkProvider } from "@clerk/clerk-react";
import SignUpPage from "./pages/auth/SignUpPage";
import { queryClient } from "./api/queryClient";
import { ConfigProvider, App as AntApp } from "antd";

const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ServerErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
        <ClerkProvider publishableKey={clerkFrontendApi}>
          <UsersProvider>
            <AntApp>
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
                      {/* Product-specific routes */}
                      <Route path="/products/:productId" element={<Dashboard />} />
                      <Route path="/products/:productId/releases" element={<ReleasesPage />} />
                      <Route path="/products/:productId/releases/:releaseId" element={<ReleaseDetailsPage />} />
                      <Route path="/products/:productId/issues" element={<IssuesPage />} />
                      
                {/* Admin routes (global, no product prefix) */}
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/integrations" element={<IntegrationsPage />} />
                      <Route path="/integrations/:id/new" element={<IntegrationSetupPage />} />
                      
                      {/* Redirect root to first available product */}
                      <Route path="/" element={<Navigate to="/products/web-application" replace />} />
                      
                      {/* Legacy routes for backward compatibility */}
                      <Route path="/releases" element={<ReleasesPage />} />
                      <Route path="/releases/:releaseId" element={<ReleaseDetailsPage />} />
                      <Route path="/issues" element={<IssuesPage />} />
                    </Routes>
                  </ProtectedRoute>
                } />
              </Routes>
            </AppLayout>
          </BrowserRouter>
            </AntApp>
          </UsersProvider>
          </ClerkProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ServerErrorBoundary>
  );
}

export default App;
