import { Card, Button } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const truncateTitle = (title, maxLength = 45) => {
    return title.length > maxLength ? title.substring(0, maxLength) + "..." : title;
  };

  const truncateDescription = (description, maxLength = 80) => {
    return description.length > maxLength ? description.substring(0, maxLength) + "..." : description;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative h-56 bg-gray-50 flex items-center justify-center p-6 group">
          <img 
            alt={product.title} 
            src={product.image} 
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-tight">
            {truncateTitle(product.title)}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            {truncateDescription(product.description)}
          </p>
          
          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-emerald-600">
              ${product.price}
            </span>
          </div>
        </div>
      </Link>
      
      {/* Add to Cart Button */}
      <div className="px-5 pb-5">
        <Button 
          type="primary"
          onClick={handleAddToCart}
          className="w-full bg-emerald-500 hover:bg-emerald-600 border-emerald-500 hover:border-emerald-600 font-medium py-2 h-10 rounded-lg transition-colors duration-200"
          size="large"
        >
          ADD TO CART
        </Button>
      </div>
    </div>
  );
}