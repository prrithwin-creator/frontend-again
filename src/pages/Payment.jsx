import React from 'react'
import Alert from 'react-bootstrap/Alert';
import Sidebar from '../components/Sidebar';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const Payment = () => {


  let [message, setMessage] = useState("")
  let [amount, setAmount] = useState(0)



let handlePayment = () => {
axios.post("https://backend-again-1.onrender.com/payment", {
  amount: 1000,
  studentname: JSON.parse(localStorage.getItem("userInfo")).username
}).then((data) => {
  
  if (data.data.message) {
    setMessage(data.data.message)
    return
  }

window.location.href = data.data.payment_url
})
}

  useEffect(() => {
  axios.get("https://backend-again-1.onrender.com/duepayment",).then((data) => {
  setAmount(data.data)
})
},[])



  return (
    
    <div className="main">
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">
        <h1>{ message}</h1>
     <Alert  variant='info '>
          Your payment is {amount }taka
        </Alert>
       <Button variant="primary" onClick={handlePayment}> Make payment</Button>
        </div>
        </div>
  )
}

export default Payment
