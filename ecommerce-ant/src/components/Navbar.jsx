import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Badge, Space } from "antd";
import { ShoppingCartOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
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
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-gray-200">
          ShopStore
        </Link>
        
        <Space size="large">
          <Link to="/cart" className="text-white hover:text-gray-200">
            <Badge count={cartCount} showZero>
              <ShoppingCartOutlined className="text-xl text-white" />
            </Badge>
          </Link>
          
          {token ? (
            <Space>
              <span className="flex items-center gap-2">
                <UserOutlined />
                {user?.username}
              </span>
              <Button 
                type="text" 
                icon={<LogoutOutlined />} 
                onClick={handleLogout}
                className="text-white hover:text-gray-200"
              >
                Logout
              </Button>
            </Space>
          ) : (
            <Link to="/login">
              <Button type="primary" ghost>
                Login
              </Button>
            </Link>
          )}
        </Space>
      </div>
    </nav>
  );
}