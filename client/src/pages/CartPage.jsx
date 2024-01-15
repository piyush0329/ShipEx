import React from 'react'
import { useAuth } from '../context/auth'
import { useCart } from '../context/cart'
import axios from 'axios'


const CartPage = () => {

  const [auth] = useAuth()
  const [cart, setCart] = useCart()

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => (
        total = total + item.price
      ))
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      })
    } catch (error) {
      console.log(error);
    }
  }
  

  const removeCartItem = async (pid) => {
    try {
      let myCart = [...cart]
      let index = myCart.findIndex((item) => item._id === pid)
      myCart.splice(index, 1)
      setCart(myCart)
      const { data } = await axios.delete(`/delete-single-product/${pid}`)
      if (data?.success) {
        alert('product deleted from cart')
      } else {
        alert("error in deleting Product")
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleMakePayment = async () => {
    try {
      const userid = auth.user._id
      if (cart.length!==0) {
        const { data } = await axios.post('/add-orders', { products: cart, buyer: auth?.user._id})
        if (data?.success) {
          const product = await axios.delete(`/delete-products/${userid}`)
          if (product.data.success) {
            setCart([])
            alert("Order Done successfully")
          }
          else {
            alert("Error in deleting products")
          }
        } else {
          alert("Error in adding order")
        }
      }else{
        alert("Please add items in cart to make a order")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>     
      <div className="row">
        <div className="col-md-12">
          <h2 className="text-center bg-light p-2 mb-1">
            {!auth?.user
              ? "Hello Guest"
              : `Hello  ${auth?.token && auth?.user?.name}`}
            <p className="text-center">
              {cart?.length
                ? `You have ${cart.length} items in your cart`
                : " Your cart is empty"}
            </p>
          </h2>
        </div>
      </div>

      <div className="container">
        <div className="row ">
          <div className="col-md-7 p-0 m-0">
            {cart?.map((p) => (
              <div key={p._id} className="card d-flex flex-row justify-content-between" >
                <div className="">
                  <h6>Description: {p.description}</h6>
                  <h6>Start Location: {p.startLocation.officeName}</h6>
                  <h6>Destination Location: {p.destinationLocation.officeName}</h6>
                  <h6>Weight: {p.weight}</h6>
                  <h6>Shipment Value: {p.shipmentValue}</h6>
                  <h6>Price to pay: {p.price.toFixed(2)}</h6>
                </div>
                <div className="text-center">
                  <button className="btn btn-danger" onClick={() => removeCartItem(p._id)} >Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className='col-md-5 mt-2 text-center'>
            <h2>Cart Summary</h2>
            <h5>Total | Checkout | Payment</h5>
            <h4>Total : {totalPrice()} </h4>
            <br />
            <br />
            <button onClick={handleMakePayment} className='btn btn-outline-success'>Make Payment</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
