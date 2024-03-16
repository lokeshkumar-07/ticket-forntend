import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { change_city } from '../features/citySlice'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { allMovies, getMovie } from '../features/movieSlice';
import { noFilterShowss } from '../features/showSlice';
import { CiSearch } from "react-icons/ci";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./Coursusal.css"

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 5
  }
};
 

const Home = () => {
  const {city} = useSelector((state) => state.city)
  const {theatres} = useSelector((state) => state.theatre)
  const {movies} = useSelector((state) => state.movie)
  // const {noFilterShows} = useSelector((state) => state.show)
  console.log(movies)

  // var allCities = []
  // noFilterShows.forEach((s) => allCities.push(s.city))
  // console.log(allCities)

  // console.log(noFilterShows)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Jaipur', 'Ahmedabad'];
  
  const [languageCat, setlanguageCat] = useState([]);
  const [genre, setGenre] = useState([])
  const [search, setSearch] = useState("")

  console.log(genre)

  console.log(search)

  const [ltoggle, setLtoggle] = useState(true)
  const [gtoggle, setGtoggle] = useState(false)

  const items = [ 'Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Japnese', 'Kannada', 'Malayalam', 'Spanish']
  const genreList = ['Horror','Sci-Fy','Comedy','Thriller','Romantic', 'Fantasy', 'Musical' , 'Animation', 'Drama', 'Family', 'Action']

  const onLanguageFilter = (value) => {
    if(languageCat.includes(value)){
      setlanguageCat(languageCat.filter((cat) => cat !== value))
    }else{
      setlanguageCat([...languageCat, value])
    }
  }

  const onGenreFilter = (value) => {
    if(genre.includes(value)){
      setGenre(genre.filter(gen => gen !== value))
    }else{
      setGenre([...genre, value])
    }
  }


  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    setSearchTerm(value);

    const filteredCities = value ? cities.filter(city => city.toLowerCase().includes(value.toLowerCase())) : [];
    setSuggestions(filteredCities);
  };

  const handleMovieClick = async (title) => {
    console.log(title)
    const data = {
      movieName: title
    }
    console.log(data)
    await dispatch(getMovie(data))

    navigate(`movie/${title}`)
  }

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setSearchTerm(city);
    setShowModal(false);
    setSuggestions([]);
  };

  const getAllMovies = () => {
    console.log("Movie showing")
    const data = {
      languageCat: languageCat,
      genre: genre,
      search: search
    }
    
    dispatch(allMovies(data))
  }

  const getAllShows = () => {
    dispatch(noFilterShowss())
  }

  useEffect(() => {
    getAllMovies()
    // getAllShows()
  }, [languageCat, genre,city,search])

  const [currentIndex, setCurrentIndex] = useState(0);


  return (
    <div>
      <div className="container">
        <div className='mt-[40px]'>
        <div className='flex flex-col justify-center md:items-start mx-auto md:flex-row'>
          {/* Left Section */}
          <div className='left-section hidden md:w-[30%] md:block'>
              <div className='flex flex-col md:'>
                  <h1 className='text-xl font-semibold mb-4'>Filters</h1>
                  <div className='flex flex-col gap-4 w-3/4'>
                      {/* Language Filter */}
                      <div className='flex flex-col border border-gray-300 rounded-md p-4'>
                          <div className='flex items-center justify-between hover:cursor-pointer' onClick={() => setLtoggle(!ltoggle)}>
                              <div className="flex items-center gap-2">
                                  {ltoggle ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                  <h1 className={`text-lg font-semibold ${ltoggle ? 'text-red-500' : 'text-gray-500'}`}>Language</h1>
                              </div>
                          </div>
                          {ltoggle && (
                              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-4'>
                                  {items.map((item, index) => (
                                      <div key={index}
                                          className={`box cursor-pointer p-2 rounded border ${languageCat.includes(item) ? 'bg-red-500 text-white' : 'bg-white text-red-500 border-gray-300'}`}
                                          onClick={() => onLanguageFilter(item)}
                                      >
                                          <h1 className="truncate text-sm">{item}</h1>
                                      </div>
                                  ))}
                              </div>
                          )}
                      </div>

                      {/* Genre Filter */}
                      <div className='flex flex-col border border-gray-300 rounded-md p-4'>
                          <div className='flex items-center gap-2 hover:cursor-pointer' onClick={() => setGtoggle(!gtoggle)}>
                              {gtoggle ? <IoIosArrowUp /> : <IoIosArrowDown />}
                              <h1 className={`text-lg font-semibold ${gtoggle ? 'text-red-500' : 'text-gray-500'}`}>Genre</h1>
                          </div>
                          {gtoggle && (
                              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-4'>
                                  {genreList.map((item, index) => (
                                      <div key={index}
                                          className={`box cursor-pointer p-2 rounded border ${genre.includes(item) ? 'bg-red-500 text-white' : 'bg-white text-red-500 border-gray-300'}`}
                                          onClick={() => onGenreFilter(item)}
                                      >
                                          <h1 className="truncate text-sm">{item}</h1>
                                      </div>
                                  ))}
                              </div>
                          )}
                      </div>
                  </div>
              </div>
          </div>

          <div className='left-section mx-auto md:hidden'>
              <div className='flex flex-col md:'>
                  <div className='flex flex-col gap-4 w-3/4'>
                      {/* Language Filter */}
                      
                      <div className="w-[400px]">
                          <div className="">
                            <Carousel responsive={responsive}>
                                
                                {items.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`box text-center ml-2 cursor-pointer p-2 rounded border ${
                                            languageCat.includes(item) ? 'bg-red-500 text-white' : 'bg-white text-red-500 border-gray-300'
                                        }`}
                                        onClick={() => onLanguageFilter(item)}
                                    >
                                        <h1 className="truncate text-sm">{item}</h1>
                                    </div>
                                ))}
                               
                            </Carousel>
                              
                          </div>
                          
                      </div>
                         

                      {/* Genre Filter */}
                      <div className='w-[400px] mb-6'>
                          
                              <div className=''>
                                <Carousel responsive={responsive}>
                                    {genreList.map((item, index) => (
                                        <div key={index}
                                            className={`box ml-2 text-center cursor-pointer p-2 rounded border ${genre.includes(item) ? 'bg-red-500 text-white' : 'bg-white text-red-500 border-gray-300'}`}
                                            onClick={() => onGenreFilter(item)}
                                        >
                                            <h1 className="truncate text-sm">{item}</h1>
                                        </div>
                                    ))}
                                </Carousel>
                                  
                              </div>
                          
                      </div>
                  </div>
              </div>
          </div>

          {/* Right Section */}
          <div className='right-section mx-auto w-[70%] md:[100%]'>
          <h1 className='text-center my-1 font-semibold text-red-600' >Admin only created shows for Jaipur</h1>   
              <div className='w-full lg:w-1/2 mb-4'>
                  <div className='flex border border-gray-300 justify-between items-center rounded-md px-2'>
                      <input className='font-semibold text-[18px] w-full outline-none px-4 py-3' placeholder='Search For Movies' type='text' onChange={(e) => setSearch(e.target.value)} />
                      <CiSearch className='font-bold text-lg hover:cursor-pointer' />
                  </div>
              </div>
              {movies.length > 0 ? (
                <div className='flex flex-wrap justify-center'>  
                                                 
                  {movies.map((movie, index) => (
                      <div key={index} className='flex flex-col ml-2 justify-between bg-white border border-gray-300 rounded-md w-64 lg:w-80 xl:w-96 mx-4 my-4 p-4 hover:cursor-pointer' onClick={() => handleMovieClick(movie.title)}>
                          <img src={movie.image} className='w-full h-48 object-cover rounded-md mb-4' alt={movie.title} />
                          <div>
                              <h1 className='text-[24px] font-bold text-gray-800 mb-2'>{movie.title}</h1>
                              <div className=' mb-2'>
                                {movie.language.map((item,index) => (
                                  <span className='text-[16px] text-gray-500' key={index}>{item}{index !== movie.language.length - 1 && "/"}</span>
                                ))}
                              </div>
                              {movie.genre.map((item,index) => (
                                <span className='text-[16px] text-gray-500' key={index}>{item}{index !== movie.genre.length - 1 && "/"}</span>
                              ))}
                          </div>
                      </div>
                  ))}    
                </div>
              ) : (
                <div>
                  <h1 className='text-[28px] font-bold'>NO Movie Found</h1>
                </div>
              )}
              
          </div>
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default Home
