import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext'; // Apka path check kar lena
import { Toaster } from 'react-hot-toast';

// Components Imports
import Navbar from './components/Navbar';
import Home from './pages/Home';
import StoreMenu from './pages/StoreMenu';
import Checkout from './pages/Checkout';
import RiderDashboard from './pages/RiderDashboard'; // Ensure path is correct
import OrderHistory from './pages/OrderHistory';
import Tracking from './pages/Tracking';
import Login from './pages/Login';
import AuthScreen from './pages/AuthScreen';
import CustomOrder from './pages/CustomOrder';
import Chat from './pages/Chat';

const AppContent = () => {
  const { user, logout } = useAuth();
  const [view, setView] = useState('home');
  const [selectedStore, setSelectedStore] = useState(null);
  const [cart, setCart] = useState([]);
  const [authState, setAuthState] = useState('landing');
  const [selectedRole, setSelectedRole] = useState('customer');
  const [activeTrackingId, setActiveTrackingId] = useState(null);

  // 1. Handling Not Logged In
  if (!user) {
    if (authState === 'landing') return <Login setSelectedRole={setSelectedRole} setAuthState={setAuthState} />;
    return <AuthScreen initialRole={selectedRole} setAuthState={setAuthState} />;
  }

  // 2. RIDER ROUTE (FIXED)
  // Hum 'user' prop pass kar rahe hain taake Dashboard ID access kar sake
  if (user.role === 'rider') {
    return <RiderDashboard user={user} logout={logout} />;
  }

  // 3. CUSTOMER ROUTE
  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {view !== 'checkout' && view !== 'tracking' && view !== 'chat' && (
        <Navbar logout={logout} cart={cart} setView={setView} />
      )}

      <main className="transition-all duration-300">
        {view === 'home' && <Home setView={setView} setSelectedStore={setSelectedStore} />}
        {view === 'menu' && <StoreMenu store={selectedStore} setView={setView} cart={cart} setCart={setCart} />}
        {view === 'history' && <OrderHistory setView={setView} setActiveTrackingId={setActiveTrackingId} />}
        {view === 'checkout' && <Checkout cart={cart} setView={setView} setCart={setCart} />}
        {view === 'tracking' && <Tracking orderId={activeTrackingId} setView={setView} />}
        {view === 'customOrder' && <CustomOrder setView={setView} />}
        {view === 'chat' && <Chat setView={setView} orderId={activeTrackingId} />}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" />
      <AppContent />
    </AuthProvider>
  );
}