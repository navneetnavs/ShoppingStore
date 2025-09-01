import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      <img src={product.image} alt={product.title} className="w-64 h-64 object-contain" />
      <div>
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-lg font-semibold mt-2">${product.price}</p>
        <Button type="primary" onClick={() => dispatch(addToCart(product))}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
