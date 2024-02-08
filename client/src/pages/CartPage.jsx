import React from 'react'
import { useAuth } from '../context/auth'
import { useCart } from '../context/cart'
import axios from 'axios'

const CartPage = () => {

  const [auth] = useAuth()
  const [cart, setCart] = useCart()

  const handleMakePayment = async () => {
    try {
      const body = {
        products: cart,
        userId: auth.user._id
      }
      const response = await axios.post('/create-checkout-session', body);
      if (response.data.url) {
        window.location.href = response.data.url
      }
    } catch (error) {
      console.log(error)
    }
  }
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

  return (
    <div className='tw-bg-lightGrey'>
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
        <div className="row d-flex flex-row justify-content-between">
          <div className="col-md-6 p-0 m-0">
            {cart?.map((p) => (
              <div key={p._id} className="card tw-bg-light d-flex flex-row justify-content-between" >
                <div className="p-4">
                  <h6>Description: {p.description}</h6>
                  <h6>Start Location: {p.startLocation.officeName}</h6>
                  <h6>Destination Location: {p.destinationLocation.officeName}</h6>
                  <h6>Weight: {p.weight}kg</h6>
                  <h6>Shipment Value: ₹ {p.shipmentValue}</h6>
                  <h6>Shipping Charge: ₹ {p.price.toFixed(2)}</h6>
                </div>
                <div className="text-center p-4">
                  <button className="tw-btn tw-btn-outline tw-bg-red text-white" onClick={() => removeCartItem(p._id)} >Remove</button>
                </div>
              </div>
            ))}
          </div>
          {
            cart?.length ? <div className='col-md-5 mt-2 text-center'>
              <h2>Cart Summary</h2>
              <h5>Total | Checkout | Payment</h5>
              <h4>Total : {totalPrice()} </h4>
              <br />
              <br />
              {cart.length !== 0 ? <button onClick={handleMakePayment} className='tw-btn tw-btn-outline'>Make Payment</button> : ""}
            </div> : ""
          }
        </div>
      </div>
    </div>
  )
}

export default CartPage
