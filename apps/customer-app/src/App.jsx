import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

// Components & Pages
import Navbar from './components/Navbar';
import Login from './pages/Login';
import AuthScreen from './pages/AuthScreen';
import Home from './pages/Home';
import StoreMenu from './pages/StoreMenu';
import Checkout from './pages/Checkout';
import RiderDashboard from './pages/RiderDashboard';

const AppContent = () => {
  const { user, logout } = useAuth();
  const [view, setView] = useState('home');
  const [selectedStore, setSelectedStore] = useState(null);
  const [cart, setCart] = useState([]); // Cart state yahan hai
  const [authState, setAuthState] = useState('landing');
  const [selectedRole, setSelectedRole] = useState('customer');

  if (!user) {
    if (authState === 'landing') {
      return <Login setSelectedRole={setSelectedRole} setAuthState={setAuthState} />;
    }
    return <AuthScreen initialRole={selectedRole} setAuthState={setAuthState} />;
  }

  if (user.role === 'rider') {
    return <RiderDashboard logout={logout} />;
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Universal Navbar for Customer views (Optional: check if you want it on menu/checkout) */}
      {view !== 'checkout' && <Navbar logout={logout} cart={cart} setView={setView} />}

      {view === 'home' && (
        <Home
          setView={setView}
          setSelectedStore={setSelectedStore}
          cart={cart}  // <--- YEH MISSING THA (Fixed)
        />
      )}

      {view === 'menu' && (
        <StoreMenu
          store={selectedStore}
          setView={setView}
          cart={cart}
          setCart={setCart}
        />
      )}

      {view === 'checkout' && (
        <Checkout
          cart={cart}
          setView={setView}
          setCart={setCart}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <AppContent />
    </AuthProvider>
  );
}