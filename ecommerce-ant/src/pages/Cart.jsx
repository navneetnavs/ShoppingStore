import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../features/cartSlice";
import { Button, InputNumber, Card, Empty, Divider, message } from "antd";
import { DeleteOutlined, ShoppingOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id, title) => {
    dispatch(removeFromCart(id));
    message.success(`${title} removed from cart`);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    message.success('Cart cleared successfully');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800">Your Cart is Empty</h2>
                    <p className="text-gray-600">Looks like you haven't added any items to your cart yet.</p>
                  </div>
                }
              >
                <Link to="/">
                  <Button 
                    type="primary" 
                    size="large"
                    icon={<ShoppingOutlined />}
                    className="bg-emerald-500 hover:bg-emerald-600 border-emerald-500 hover:border-emerald-600 px-8 py-2 h-12 font-medium"
                  >
                    Start Shopping
                  </Button>
                </Link>
              </Empty>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id} className="shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-lg flex items-center justify-center p-4">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-emerald-600 font-bold text-xl mt-2">
                          ${item.price}
                        </p>
                      </div>
                      
                      {/* Quantity and Remove */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-700">Quantity:</span>
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <Button 
                              type="text"
                              icon={<MinusOutlined />}
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="border-none hover:bg-gray-100"
                              size="small"
                            />
                            <span className="px-4 py-1 min-w-[3rem] text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button 
                              type="text"
                              icon={<PlusOutlined />}
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="border-none hover:bg-gray-100"
                              size="small"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-bold text-gray-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <Button 
                            danger
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => handleRemoveItem(item.id, item.title)}
                            className="hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              
              {/* Clear Cart Button */}
              <div className="pt-4">
                <Button 
                  danger
                  onClick={handleClearCart}
                  className="hover:bg-red-50 border-red-300 text-red-600"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8 shadow-lg">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">Order Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="text-emerald-600 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>${(total * 0.08).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Divider className="my-4" />
                  
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-emerald-600">${(total * 1.08).toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    type="primary"
                    size="large"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 border-emerald-500 hover:border-emerald-600 font-medium h-12"
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <Link to="/" className="block">
                    <Button 
                      type="default"
                      size="large"
                      className="w-full font-medium h-12 border-gray-300 hover:border-emerald-500 hover:text-emerald-600"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
