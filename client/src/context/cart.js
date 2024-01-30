import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./auth";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [auth] = useAuth()
  //const auth = localStorage.getItem("auth")
  useEffect(() => {
    try {
      const userid = auth?.user?._id
      const fetchProduct = async () => {
        const { data } = await axios.get(`/get-products/${userid}`)
        if(data.order){
          alert('Order Done Successfully')
        }
        setCart(data.products)
      }
      if(userid) fetchProduct()
    } catch (error) {
      console.log(error)
    }
  }, [auth?.user?._id])
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};
// custom hook
const useCart = () => useContext(CartContext)

export { useCart, CartProvider };