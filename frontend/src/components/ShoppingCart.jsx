import styles from "../styles/ShoppingCart.module.scss";

import { useSelector } from "react-redux";

const ShoppingCart = () => {
  const items = useSelector((state) => state.user.cart);

  console.log("items updated");

  return (
    <div>
      <div></div>
    </div>
  );
};

export default ShoppingCart;
