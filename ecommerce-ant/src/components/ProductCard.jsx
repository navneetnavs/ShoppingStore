import { Card, Button } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cartSlice";

const { Meta } = Card;

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card
        hoverable
        cover={
          <div className="h-48 flex items-center justify-center p-4">
            <img 
              alt={product.title} 
              src={product.image} 
              className="max-h-full max-w-full object-contain"
            />
          </div>
        }
        actions={[
          <Button 
            type="primary" 
            onClick={handleAddToCart}
            className="w-full"
          >
            Add to Cart - ${product.price}
          </Button>
        ]}
      >
        <Meta 
          title={product.title.length > 50 ? product.title.substring(0, 50) + "..." : product.title}
          description={
            <div>
              <p className="text-sm text-gray-600 mb-2">
                {product.description.length > 100 
                  ? product.description.substring(0, 100) + "..." 
                  : product.description}
              </p>
              <p className="text-lg font-semibold text-blue-600">${product.price}</p>
            </div>
          }
        />
      </Card>
    </Link>
  );
}