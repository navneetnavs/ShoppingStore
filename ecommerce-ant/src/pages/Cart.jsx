import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cartSlice";
import { Button, InputNumber } from "antd";

export default function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center border-b py-2">
          <div className="flex gap-4 items-center">
            <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
            <span>{item.title}</span>
          </div>
          <InputNumber
            min={1}
            value={item.quantity}
            onChange={(value) => dispatch(updateQuantity({ id: item.id, quantity: value }))}
          />
          <span>${(item.price * item.quantity).toFixed(2)}</span>
          <Button danger onClick={() => dispatch(removeFromCart(item.id))}>Remove</Button>
        </div>
      ))}
      <div className="text-right mt-4 font-bold text-xl">Total: ${total.toFixed(2)}</div>
    </div>
  );
}
