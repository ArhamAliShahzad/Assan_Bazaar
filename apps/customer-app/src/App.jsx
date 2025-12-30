import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext'; // Sirf yahan se import karein

// Components & Pages
import Navbar from './components/Navbar';
import Login from './pages/Login';
import AuthScreen from './pages/AuthScreen';
import Home from './pages/Home';
import StoreMenu from './pages/StoreMenu';
import Checkout from './pages/Checkout';
import RiderDashboard from './pages/RiderDashboard';

const AppContent = () => {
  const { user, login, logout } = useAuth(); // 'login' small letter mein
  const [view, setView] = useState('home');
  const [selectedStore, setSelectedStore] = useState(null);
  const [cart, setCart] = useState([]);

  const [authState, setAuthState] = useState('landing');
  const [selectedRole, setSelectedRole] = useState('customer');

  // 1. Agar user login nahi hai
  if (!user) {
    if (authState === 'landing') {
      return <Login setSelectedRole={setSelectedRole} setAuthState={setAuthState} />;
    }
    return <AuthScreen initialRole={selectedRole} setAuthState={setAuthState} />;
  }

  // 2. Agar Rider hai
  if (user.role === 'rider') {
    return <RiderDashboard logout={logout} />;
  }

  // 3. Agar Customer hai
  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {view === 'home' && (
        <>
          <Navbar logout={logout} />
          <Home setView={setView} setSelectedStore={setSelectedStore} />
        </>
      )}
      {view === 'menu' && (
        <StoreMenu store={selectedStore} setView={setView} cart={cart} setCart={setCart} />
      )}
      {view === 'checkout' && (
        <Checkout cart={cart} setView={setView} setCart={setCart} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}