import axios from 'axios';
import React, { useState } from 'react'

import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';


const stripe = loadStripe()
const PayButton = ({ cart, user }) => {
const [clientSecret,setclientSecret] = useState('')

  const handleMakePayment = async () => {
    try {
      const body = {
        products: cart,
        userId: user
      }
      const response = await axios.post('/create-checkout-session', body);
      setclientSecret(response.data.clientSecret)
      if (response.data.url) {
        window.location.href = response.data.url
      }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div>
      <button onClick={handleMakePayment} className='tw-btn tw-btn-outline'>Make Payment</button>

      <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{clientSecret}}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>

    </div>
  )
}

export default PayButton
