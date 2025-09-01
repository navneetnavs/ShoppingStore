import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Spin, Rate, Badge, Divider, message } from "antd";
import { ArrowLeftOutlined, ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    message.success(`${product.title} added to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <Link to="/">
            <Button type="primary" className="bg-emerald-500 hover:bg-emerald-600 border-emerald-500 hover:border-emerald-600">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-emerald-600 transition-colors duration-200">
            <ArrowLeftOutlined className="mr-2" />
            Back to Products
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="p-8 lg:p-12">
              <div className="bg-gray-50 rounded-2xl p-8 h-96 lg:h-[500px] flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="p-8 lg:p-12">
              <div className="space-y-6">
                {/* Category Badge */}
                <div>
                  <Badge 
                    color="emerald" 
                    text={product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-sm font-medium"
                  />
                </div>

                {/* Title */}
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <Rate disabled defaultValue={product.rating?.rate || 4} className="text-sm" />
                  <span className="text-gray-600">({product.rating?.count || 0} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-bold text-emerald-600">
                    ${product.price}
                  </span>
                  <span className="text-gray-500 line-through text-xl">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                  <Badge count="20% OFF" className="bg-red-500" />
                </div>

                <Divider />

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {product.description}
                  </p>
                </div>

                <Divider />

                {/* Action Buttons */}
                <div className="space-y-4">
                  <Button 
                    type="primary"
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToCart}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 border-emerald-500 hover:border-emerald-600 font-medium h-14 text-lg"
                  >
                    Add to Cart
                  </Button>
                  
                  <Button 
                    size="large"
                    icon={<HeartOutlined />}
                    className="w-full font-medium h-12 border-gray-300 hover:border-emerald-500 hover:text-emerald-600"
                  >
                    Add to Wishlist
                  </Button>
                </div>

                {/* Product Info */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Free shipping</span>
                    <span className="text-emerald-600 font-medium">✓</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">30-day returns</span>
                    <span className="text-emerald-600 font-medium">✓</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">2-year warranty</span>
                    <span className="text-emerald-600 font-medium">✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
