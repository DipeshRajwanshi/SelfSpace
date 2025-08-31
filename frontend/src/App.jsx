import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import SellNotes from "./pages/SellNotes";
import BrowseNotes from "./pages/BrowseNotes";
import MyBooks from "./pages/MyBooks";
import Profile from "./pages/Profile";
import ViewHistory from "./pages/ViewHistory";
import BookDetail from "./pages/BookDetail"; // ✅ new detail page

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/sell"
        element={
          <ProtectedRoute>
            <Layout>
              <SellNotes />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/browse"
        element={
          <ProtectedRoute>
            <Layout>
              <BrowseNotes />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/my-books"
        element={
          <ProtectedRoute>
            <Layout>
              <MyBooks />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/view-history"
        element={
          <ProtectedRoute>
            <Layout>
              <ViewHistory />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Book Detail Page (no layout, direct view) */}
      <Route
        path="/mybooks/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <BookDetail />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
