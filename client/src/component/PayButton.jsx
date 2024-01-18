import axios from 'axios';
import React from 'react'

const PayButton = ({ cart, user }) => {
  const handleMakePayment = async () => {
    try {
      const body = {
        products: cart,
        userId: user
      }
      const response = await axios.post('/create-checkout-session', body);
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
    </div>
  )
}

export default PayButton
