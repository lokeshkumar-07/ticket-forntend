import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovie } from '../features/movieSlice'
import { IoIosArrowBack } from 'react-icons/io'

const MovieShows = () => {


  const {movie} = useSelector((state) => state.movie)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {movieName} = useParams()

  console.log(movie)
  console.log(movieName)



  return (
    <div className='container'>
      <div className='flex flex-row mt-10'>
          <div className='flex flex-col gap-10'>
              {/* Movie Introduction */}
              <div className='movie-intro flex flex-col lg:flex-row lg:items-center lg:gap-10'>
                  <img src={movie.image} className='w-full lg:w-[400px] h-[400px] rounded-md object-cover' alt={movie.title} />
                  <div className='flex flex-col gap-4'>
                      <div className='flex items-center gap-2'>
                          <h1 className='text-2xl lg:text-3xl font-semibold text-gray-900'>{movie.title}</h1>
                          <div className='border-2 font-semibold border-gray-900 p-1 rounded-full text-[14px]'>
                              {movie.category}
                          </div>
                      </div>
                      <div className='flex gap-2'>
                        {movie.language.map((item,index) => (
                          <div key={index} className='p-2 font-semibold rounded-md bg-gray-400'>{item}</div>
                        ))}
                      </div>
                      <div className='flex gap-2'>{movie.genre.map((item,index) => ( <div className='border border-gray-400 rounded-full px-2 py-1' key={index}><h1 className='text-[14px]'>{item}</h1></div> ))}</div>
                      <div>
                          <button onClick={() => navigate(`/booking/${movieName}`)} className='bg-red-500 px-8 lg:px-10 py-3 lg:py-4 rounded-md text-white font-semibold hover:bg-red-600 transition duration-300'>Book Tickets</button>
                      </div>
                  </div>
              </div>

              {/* Movie Description */}
              <div className='movie-descp'>
                  <h1 className='text-3xl lg:text-4xl font-semibold mt-6'>About The Movie</h1>
                  <p className='text-lg lg:text-xl text-gray-700'>{movie.description}</p>
              </div>
          </div>
      </div>
      
    </div>
  )
}

export default MovieShows
