import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contextapi/CartContext";
import CartDrawer from "./CartDrawer";

function Cart() {
  const navigate = useNavigate();
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useContext(CartContext);

  return (
    <CartDrawer
      open={true}
      onClose={() => navigate("/")}
      items={cart}
      onIncrease={increaseQuantity}
      onDecrease={decreaseQuantity}
      onRemove={removeFromCart}
      onClear={clearCart}
      onContinue={() => navigate("/")}
    />
  );
}

export default Cart;