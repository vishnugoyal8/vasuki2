import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { MainLayout } from './layouts/MainLayout.jsx';
import { AppRoutes } from './routes/AppRoutes.jsx';
import { resetSeedDataset } from './lib/api.js';
import { LanguageProvider } from './context/LanguageContext.jsx';

function AppContent() {
  const [activePage, setActivePage] = useState('landing');
  const [selectedDistrict, setSelectedDistrict] = useState('Pune');
  const [toastMessage, setToastMessage] = useState(null);

  const handleResetData = async () => {
    try {
      await resetSeedDataset();
      setToastMessage('Demo dataset reset to fresh baseline.');
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainLayout
      activePage={activePage}
      onSelectPage={setActivePage}
      selectedDistrict={selectedDistrict}
      onSelectDistrict={setSelectedDistrict}
      onResetData={handleResetData}
      toastMessage={toastMessage}
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
        <AppContent />
      </LanguageProvider>
    </Provider>
  );
}

export default App;
