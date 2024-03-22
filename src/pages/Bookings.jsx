import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { myBookings } from '../features/bookingSlice'
import Loading from '../components/Loading'

const Bookings = () => {
    const dispatch = useDispatch()
    const { bookings } = useSelector((state) => state.bookings)
    const [loading, setLoading] = useState(true)

    console.log(bookings)

    const fetchBookings = async () => {
        await dispatch(myBookings())
        setLoading(false)
    }

    useEffect(() => {
        fetchBookings()
    }, [])

    return (
        <div className='container'>
            {loading ? (
                <p><Loading /></p>
            ) : (
                <>
                    
                    <div className='flex mt-4 flex-col mx-auto w-[70%] gap-2'>
                        <p className='text-center text-[20px] font-semibold'>Your Bookings</p>
                        {bookings.map((booking, index) => (
                            <div key={index} className='border mt-2 rounded-md border-gray-400'>
                                <h1 className='font-semibold'>Order Id: {booking._id}</h1>
                                <div key={index} className='flex gap-5 p-2 pb-5 '>
                                
                                    <div className='movie-info '>
                                        <img src={booking.show.movie.image} className='w-full min-w-[50px] h-[50px] object-cover' />
                                    </div>

                                    <div className=' theatre-info font-semibold flex flex-col gap-0.5'>
                                        
                                        <h1>{booking.show.theatre.theatre_name}</h1>
                                        <h1>{booking.show.theatre.address} {booking.show.theatre.city}</h1>
                                    </div>

                                    <div className='seat-info font-semibold flex flex-col gap-0.5'>
                                        <h1 className=''>Seats {booking.seats}</h1>
                                        <h1>{booking.show.startTime} {booking.show.date}</h1>
                                    </div>
                                </div>
                            </div>
                            
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Bookings