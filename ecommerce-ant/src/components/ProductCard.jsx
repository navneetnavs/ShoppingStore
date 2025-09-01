import { Button, message } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    message.success(`Added to cart!`);
  };

  const truncateTitle = (title, maxLength = 50) => {
    return title.length > maxLength ? title.substring(0, maxLength) + "..." : title;
  };

  const truncateDescription = (description, maxLength = 120) => {
    return description.length > maxLength ? description.substring(0, maxLength) + "..." : description;
  };

  return (
    <div style={{ height: '450px' }} className="w-full bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
        {/* Image Container */}
        <div style={{ height: '180px' }} className="bg-white flex items-center justify-center p-4">
          <img 
            alt={product.title} 
            src={product.image} 
            className="max-h-full max-w-full object-contain"
          />
        </div>
        
        {/* Content */}
        <div className="px-4 pb-2 flex-1 flex flex-col">
          {/* Title */}
          <h3 style={{ height: '40px' }} className="text-sm font-semibold text-gray-800 mb-2 overflow-hidden leading-5">
            {truncateTitle(product.title)}
          </h3>
          
          {/* Description */}
          <p style={{ height: '48px' }} className="text-xs text-gray-500 mb-3 overflow-hidden leading-4">
            {truncateDescription(product.description)}
          </p>
          
          {/* Price */}
          <div className="mt-auto mb-2">
            <span className="text-lg font-bold text-emerald-600">
              ${product.price}
            </span>
          </div>
        </div>
      </Link>
      
      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <Button 
          type="primary"
          onClick={handleAddToCart}
          className="w-full bg-emerald-500 hover:bg-emerald-600 border-emerald-500 hover:border-emerald-600 font-medium h-9 rounded-md text-xs"
        >
          ADD TO CART
        </Button>
      </div>
    </div>
  );
}