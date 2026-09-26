import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { MainLayout } from './layouts/MainLayout.jsx';
import { AppRoutes } from './routes/AppRoutes.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

function AppContent() {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState('landing');
  const [selectedDistrict, setSelectedDistrict] = useState('Pune');

  // If a user logs in, automatically navigate to their role dashboard
  useEffect(() => {
    if (user && user.role) {
      setActivePage(user.role);
    }
  }, [user]);

  return (
    <MainLayout
      activePage={activePage}
      onNavigate={setActivePage}
    >
      <AppRoutes
        activePage={activePage}
        onNavigate={setActivePage}
        selectedDistrict={selectedDistrict}
        onSelectDistrict={setSelectedDistrict}
      />
    </MainLayout>
  );
}

export function App() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </Provider>
  );
}

export default App;
