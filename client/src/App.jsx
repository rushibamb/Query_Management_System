import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import QueryList from './pages/QueryList';
import CreateQuery from './pages/CreateQuery';
import QueryDetails from './pages/QueryDetails';
import EditQuery from './pages/EditQuery';
import NotFound from './pages/NotFound';
import AuthLoading from './pages/AuthLoading';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PublicQuery from './pages/PublicQuery';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { checkSetup } from './services/authService';
import { getToken } from './utils/authStorage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [setupCompleted, setSetupCompleted] = useState(null);
  const [error, setError] = useState(null);

  const initializeApp = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await checkSetup();
      setSetupCompleted(response.setupCompleted);
    } catch (err) {
      setError(err.message || 'Failed to connect to backend server. Please verify your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeApp();
  }, []);

  if (isLoading) {
    return <AuthLoading message="Preparing application..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen w-screen bg-gray-50 flex items-center justify-center p-6 select-none font-sans">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl p-8 shadow-sm text-center space-y-6">
          <div className="flex justify-center text-red-500 mb-2">
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900">Connection Error</h3>
          <p className="text-sm text-red-600 leading-relaxed">{error}</p>
          <div className="pt-2">
            <button
              onClick={initializeApp}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 outline-none focus:ring-2 focus:ring-blue-100"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  const token = getToken();

  return (
    <Router>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      {setupCompleted === false ? (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/register" replace />} />
        </Routes>
      ) : (
        <Routes>
          {/* Public visitor page */}
          <Route path="/" element={<PublicQuery />} />

          {/* Public authentication routes */}
          <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/register" element={<Navigate to="/login" replace />} />
          
          {/* Main application protected pages */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/queries" element={<QueryList />} />
                    <Route path="/queries/new" element={<CreateQuery />} />
                    <Route path="/queries/:id" element={<QueryDetails />} />
                    <Route path="/queries/:id/edit" element={<EditQuery />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              }
            />
          </Route>
        </Routes>
      )}
    </Router>
  );
}

export default App;
