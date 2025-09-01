import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Badge, Space } from "antd";
import { ShoppingCartOutlined, UserOutlined, LogoutOutlined, ShopOutlined } from "@ant-design/icons";
import { logout } from "../features/authSlice";

export default function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-xl border-b border-slate-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 text-white hover:text-emerald-400 transition-colors duration-200">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <ShopOutlined className="text-xl text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">ECOMZY</span>
          </Link>
          
          {/* Navigation Items */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            
            {/* Cart */}
            <Link to="/cart" className="relative">
              <div className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors duration-200">
                <div className="relative">
                  <ShoppingCartOutlined className="text-xl" />
                  {cartCount > 0 && (
                    <Badge 
                      count={cartCount} 
                      className="absolute -top-2 -right-2"
                      style={{ backgroundColor: '#10b981' }}
                    />
                  )}
                </div>
              </div>
            </Link>
            
            {/* User Section */}
            {token ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-slate-300">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <UserOutlined className="text-white text-sm" />
                  </div>
                  <span className="font-medium">{user?.username}</span>
                </div>
                <Button 
                  type="text" 
                  icon={<LogoutOutlined />} 
                  onClick={handleLogout}
                  className="text-slate-300 hover:text-white border-slate-600 hover:border-slate-500 transition-colors duration-200"
                  size="small"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button 
                  type="primary" 
                  className="bg-emerald-500 hover:bg-emerald-600 border-emerald-500 hover:border-emerald-600 font-medium px-6"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}