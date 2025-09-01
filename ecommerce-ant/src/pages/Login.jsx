import { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { loginSuccess } from "../features/authSlice";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Fetch users from JSONPlaceholder API
      const usersResponse = await axios.get("https://jsonplaceholder.typicode.com/users");
      const users = usersResponse.data;
      
      // Find user by username or email
      const user = users.find(u => 
        u.username.toLowerCase() === values.username.toLowerCase() ||
        u.email.toLowerCase() === values.username.toLowerCase()
      );
      
      // Check if user exists and password is correct (single password for all users)
      if (user && values.password === "plutonic123") {
        // Generate a mock token
        const mockToken = `token_${user.id}_${Date.now()}`;
        
        dispatch(loginSuccess({ 
          token: mockToken, 
          user: {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            website: user.website,
            company: user.company.name
          }
        }));
        message.success(`Welcome back, ${user.name}!`);
        navigate("/");
      } else if (!user) {
        message.error("User not found. Please check your username or email.");
      } else {
        message.error("Invalid password. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("Login failed. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-2xl mb-4">
            <UserOutlined className="text-2xl text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to Plutonic_Shop</h1>
          <p className="text-slate-300">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <Card 
          className="shadow-2xl border-0 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/95"
          bodyStyle={{ padding: '2rem' }}
        >
          <Form onFinish={onFinish} layout="vertical" size="large">
            <Form.Item
              label={<span className="text-gray-700 font-medium">Username or Email</span>}
              name="username"
              rules={[{ required: true, message: "Please input your username or email!" }]}
            >
              <Input 
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Enter username or email"
                className="rounded-lg h-12"
              />
            </Form.Item>
            
            <Form.Item
              label={<span className="text-gray-700 font-medium">Password</span>}
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password 
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter password"
                className="rounded-lg h-12"
              />
            </Form.Item>
            
            <Form.Item className="mb-0">
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading} 
                block
                className="bg-emerald-500 hover:bg-emerald-600 border-emerald-500 hover:border-emerald-600 h-12 text-lg font-medium rounded-lg"
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </Form.Item>
          </Form>
          
          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2 font-medium">Available Users:</p>
            <div className="text-xs text-gray-500 space-y-1">
              <div>• <span className="font-medium">Username:</span> Bret, Antonette, Samantha, Karianne, Kamren...</div>
              <div>• <span className="font-medium">Password:</span> plutonic123 (same for all users)</div>
              <div className="mt-2 text-xs text-gray-400">You can also use email addresses to login</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}