import React from 'react';
import { GovNavbar } from '../components/common/GovNavbar.jsx';
import { GovFooter } from '../components/common/GovFooter.jsx';
import { LoginModal } from '../components/common/LoginModal.jsx';
import { RegisterModal } from '../components/common/RegisterModal.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export const MainLayout = ({
  children,
  activePage,
  onNavigate,
}) => {
  const { currentRole } = useAuth();
  const isDashboardRole = ['student', 'trainer', 'institute', 'employer', 'government'].includes(activePage);

  // If viewing a role-specific dashboard, the DashboardLayout handles its own header and sidebar
  if (isDashboardRole) {
    return (
      <>
        {children}
        <LoginModal onNavigate={onNavigate} />
        <RegisterModal onNavigate={onNavigate} />
      </>
    );
  }

  // Otherwise, render official government portal landing layout
  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#222222] flex flex-col font-sans antialiased">
      {/* Official Government Navbar */}
      <GovNavbar activePage={activePage} onNavigate={onNavigate} />

      {/* Main Page Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Official Government Footer */}
      <GovFooter />

      {/* Global Login & Register Modals */}
      <LoginModal onNavigate={onNavigate} />
      <RegisterModal onNavigate={onNavigate} />
    </div>
  );
};

export default MainLayout;
