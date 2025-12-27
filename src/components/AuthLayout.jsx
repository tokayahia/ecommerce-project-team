import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * Auth layout component for login/signup pages (no header/footer)
 */
const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
