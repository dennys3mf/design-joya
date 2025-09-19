import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { InspectionForm } from './components/InspectionForm';
import { PrinterScreen } from './components/PrinterScreen';
import { HistoryScreen } from './components/HistoryScreen';

type Screen = 'login' | 'home' | 'inspection' | 'printer' | 'history';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [user, setUser] = useState<{ name: string } | null>(null);

  const handleLogin = () => {
    setUser({ name: 'Inspector Municipal' });
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('login');
  };

  const handleNavigate = (screen: string) => {
    switch (screen) {
      case 'inspection':
        setCurrentScreen('inspection');
        break;
      case 'printer':
        setCurrentScreen('printer');
        break;
      case 'history':
        setCurrentScreen('history');
        break;
      default:
        setCurrentScreen('home');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'home':
        return (
          <HomeScreen
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            userName={user?.name}
          />
        );
      case 'inspection':
        return <InspectionForm onBack={() => setCurrentScreen('home')} />;
      case 'printer':
        return <PrinterScreen onBack={() => setCurrentScreen('home')} />;
      case 'history':
        return <HistoryScreen onBack={() => setCurrentScreen('home')} />;
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <div className="font-sans antialiased">
      {renderScreen()}
    </div>
  );
}