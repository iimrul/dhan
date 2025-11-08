import React, { useState, useEffect } from 'react';
import { View, UserRole, CartItem, Product, Order } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SoilMonitor from './components/SoilMonitor';
import SeedLibrary from './components/SeedLibrary';
import Marketplace from './components/Marketplace';
import AdminPanel from './components/AdminPanel';
import ClientDashboard from './components/ClientDashboard';
import Cart from './components/Cart';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.CLIENT);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load state from localStorage on initial render
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('amaderdhan-cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
      const storedOrders = localStorage.getItem('amaderdhan-orders');
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('amaderdhan-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('amaderdhan-orders', JSON.stringify(orders));
  }, [orders]);


  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    const navItems = [
        { view: View.DASHBOARD, roles: [UserRole.CLIENT, UserRole.ADMIN, UserRole.SUPER_ADMIN] },
        { view: View.SOIL_MONITOR, roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] },
        { view: View.SEED_LIBRARY, roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] },
        { view: View.MARKETPLACE, roles: [UserRole.CLIENT, UserRole.ADMIN, UserRole.SUPER_ADMIN] },
        { view: View.ADMIN_PANEL, roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] },
    ];
    // If the current view is not allowed for the new role, switch to the dashboard.
    const currentViewAllowed = navItems.find(item => item.view === currentView)?.roles.includes(role);
    if (!currentViewAllowed) {
        setCurrentView(View.DASHBOARD);
    }
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const itemInCart = prevItems.find(item => item.id === product.id);
      if (itemInCart) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };
  
  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleUpdateCartQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    const newOrder: Order = {
      id: `ord-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      customerName: 'Valued Customer',
      customerEmail: 'customer@example.com',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'Pending',
      items: cartItems,
    };
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    setCartItems([]);
    setIsCartOpen(false);
    alert('Order placed successfully!');
  };

  const handleOrderStatusChange = (orderId: string, status: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const renderView = () => {
    switch(currentView) {
      case View.DASHBOARD:
        return userRole === UserRole.CLIENT ? <ClientDashboard onViewChange={setCurrentView} /> : <Dashboard onViewChange={setCurrentView} />;
      case View.SOIL_MONITOR:
        return <SoilMonitor />;
      case View.SEED_LIBRARY:
        return <SeedLibrary userRole={userRole} />;
      case View.MARKETPLACE:
        return <Marketplace onAddToCart={handleAddToCart} userRole={userRole} />;
      case View.ADMIN_PANEL:
        return <AdminPanel orders={orders} onStatusChange={handleOrderStatusChange} userRole={userRole} />;
      default:
        return <div><h1 className="text-2xl">View not found</h1></div>;
    }
  };

  return (
    <div className="flex h-screen bg-brand-beige font-sans">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        userRole={userRole}
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          currentView={currentView}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          userRole={userRole}
          onRoleChange={handleRoleChange}
          cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          onCartClick={() => setIsCartOpen(true)}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-8">
          {renderView()}
        </main>
      </div>
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onPlaceOrder={handlePlaceOrder}
      />
      <Chatbot />
    </div>
  );
};

export default App;