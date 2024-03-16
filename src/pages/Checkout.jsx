import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBooking } from '../features/bookingSlice';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from 'axios';
import { ApiUrl } from '../../config';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';

const Checkout = () => {

  const navigate = useNavigate()

    const [loading, setLoading] = useState(null)
    const stripe = useStripe();
    const elements = useElements();
    
    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState("")

    const location = useLocation();
    const dispatch = useDispatch()
    const {show} = useSelector((state) => state.show)
    const {currentUser} = useSelector((state) => state.auth)
    // const {} = useSelector((state) => state.bookings)

    console.log(show)

    const { selectedSeats } = location.state || {};

    console.log(selectedSeats);
    
    const fetchClientSecret = async () => {
      await axios({
        url: `${ApiUrl}/payment/process`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": currentUser.token,
        },
        data: { amount: selectedSeats.length * show.price },
      })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => console.log(err));
    };

    const handleOrder = async () => {
      setLoading(true)
      try {
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });
    
        if (paymentResult.error) {
          setError(paymentResult.error.message)
          setLoading(false)
          console.log("Payment failed:", paymentResult.error.message);
          return; // Stop execution if there's a payment error
        }
        setError(null)
        
        console.log("Payment successful");
    
        const data = {
          seats: selectedSeats,
          totalAmount: selectedSeats.length * show.price,
          show: show._id
        };
    
        // Dispatch createBooking only if payment was successful
        dispatch(createBooking(data));
        setLoading(false)
        toast.success("Tickets Booked")
        console.log("Tickets booked");
        navigate('/')
      } catch (error) {
        console.error("Error processing payment:", error);
      }
    };
    useEffect(() => {
      fetchClientSecret()
    },[])

    useEffect(() => {

    },[loading])

  return (
    <div className='container'>
      {loading && <Loading />}
      <div className='flex flex-col'>
        <h1 className='text-center mt-[25px] text-[24px] font-bold'>Check Out Process</h1>
        <div className='flex flex-col mx-auto mt-5'>
          <div className='movie-info flex gap-4 items-center'>
            <div className='movie-img'>
              <img src={show.movie.image} className='w-[200px] h-[200px]' />
            </div>

            <div className='flex flex-col gap-1.5'>
              <div className='flex gap-2 items-center'>
                <h1 className='text-[24px] font-semibold'>{show.movieName} </h1>
                <div className='border border-gray-600 text-[12px] rounded-full p-[5px]'>{show.movie.category}</div>
              </div>
              <div className='font-bold'>{show.language}</div>

              <div className='grid grid-cols-3 gap-1'>{show.movie.genre.map((gen,index) => (
                <div className='border text-[12px] border-gray-400 px-3 py-2 rounded-full text-center' key={index}>{gen}</div>
              ))}</div>
            </div>
          </div>

          <div className='cinema-detail mt-5 flex flex-col gap-1'>
              <div className='flex items-center font-bold'>
                <h1>Seats :</h1>Seats : 
                {selectedSeats.map((seat, index) => (
                  <h1 key={index}>{seat}{index !== selectedSeats.length - 1 && ","}</h1>
                ))}
              </div>
              <div><h1 className='flex items-center font-bold'>{show.date}, {show.startTime}</h1></div>
              <div><h1 className='flex items-center font-bold'>{show.theatre.theatre_name}, {show.theatre.address}, {show.city}</h1></div>
              
          </div>
          <div className="payment-detail mt-[20px] flex flex-col gap-2">
            <h1 className="font-bold text-[18px]">Enter your Card No.</h1>
            <CardElement className="border w-[400px] border-slate-400 p-5 rounded-md" />
            {error && <span>{error}</span>} 
          </div>
          <div className='mt-[20px]'>
              <button onClick={handleOrder} className='bg-red-500 text-white px-5 py-2 rounded-md' >Pay Rs.{selectedSeats.length * show.price}</button>
          </div>

          <div className='mt-[50px] text-red-500 text-[14px]'>
              <h1>This App Only for Demontration Purpose</h1>
              <h1>Please Use Dummy Card no. 4242424242424242</h1>      
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Checkout
