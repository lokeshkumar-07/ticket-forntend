import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOneShow } from '../features/showSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";

const SeatSelction = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {showId} = useParams()
    const {show} = useSelector((state) => state.show)

    const [selectedSeats, setSelectedSeats] = useState([])
    console.log(show)
    console.log(selectedSeats)

    const selectedSeatsMethod = (item) => {
        if(selectedSeats.includes(item)){
            setSelectedSeats(selectedSeats.filter((seat) => seat !== item))
        }else{
            setSelectedSeats([...selectedSeats, item])
        }
    }


    const seatsByRow = [];
    show.seats.forEach(seat => {
    if (!seatsByRow[seat.row]) {
        seatsByRow[seat.row] = [];
    }
    seatsByRow[seat.row].push(seat);
    })

    const handlePayButtonClick = () => {
        // Navigate to the payment component with selectedSeats as props
        navigate(`/checkout/${show._id}`, { state: { selectedSeats } });
    };

   
 

  return (
    <div className='container '>
        <div className='flex flex-col w-[100%] mx-auto '>

            <div className='movie-intro my-[32px]'>
                <div className='flex gap-4 items-center'>
                    <div className='text-[32px] hover:cursor-pointer' onClick={() => navigate(`/booking/${show.movieName}`)}>
                        <IoIosArrowBack />
                    </div>

                    <div className='flex flex-col'>
                        <div className='flex items-center gap-2'>
                            <h1 className='text-[18px] font-semibold text-gray-900'>{show.movieName}</h1>
                            <div className='border border-gray-900 p-1 rounded-full text-[14px]'>
                                {show.movie.category}
                            </div>
                        </div>

                        <div>
                            <h1 className='text-[16px] font-[600] text-gray-800'>{show.theatre.theatre_name} | {show.date}, {show.startTime}</h1>
                        </div>
                    </div>
                </div>
                
            </div>

            
            <div>
                <h1 className='text-center font-bold text-[20px] mb-[10px]'>Please Select You Preffered Seats</h1>
                {Object.entries(seatsByRow).map(([raws, showings], index) => (

                <div className='flex flex-col items-center'>
                    <div key={index} className='flex mt-4 items-center gap-7'>
                        {showings.map((showing, index) => (
                            <div key={index} className='flex  hover:cursor-pointer'>
                                {/* Render each movie showing information */}
                                <div className={` ${showing.isBooked ? "bg-gray-400 border border-gray-400 cursor-not-allowed" : (selectedSeats.includes(showing.seatNo) ? "bg-green-600" : "")} border border-green-600 p-3 rounded-md`} onClick={() => !showing.isBooked && selectedSeatsMethod(showing.seatNo)}>
                                    {/* Add other showing information as needed */}
                                </div>
                            </div>
                        ))}
                        <h1>{raws}</h1>
                    </div>                    
                </div>

                ))}

                <div className='text-center mt-8 md:w-[40%] w-[90%] mx-auto'>
                    <div className='bg-gray-200 px-10 py-1 rounded-md'>
                        <h1 className='text-[12px]'>ALL EYES THIS WAY PLEASE!</h1>
                    </div>

                </div>
            </div>
            

            <div className='flex text-center gap-8 mx-auto mt-[40px]'>
                <div className='flex gap-2 items-center'>
                    <h1>Sold</h1>
                    <div className='border border-gray-400 p-3 rounded-md bg-gray-400 w-[20px] items-center'></div>
                </div>
                

                <div className='flex gap-2 items-center'>
                    <h1>Available</h1>
                    <div className='border border-gray-500 p-3 rounded-md w-[20px] items-center'></div>
                </div>

                <div className='flex gap-2 items-center'>
                    <h1>Selected</h1>
                    <div className='border border-white-500 p-3 rounded-md bg-green-600 w-[20px] items-center'></div>
                </div>

                
            </div>

            <div className='flex text-center items-center mx-auto mt-[20px]'>
                {selectedSeats.length>0 && <button className='bg-red-500 px-8 py-3 rounded-md text-white' onClick={handlePayButtonClick}>Checkout</button>}
            </div>
        </div>
        

        
    </div>
  )
}

export default SeatSelction
