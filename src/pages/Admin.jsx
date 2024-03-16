import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { change_city } from '../features/citySlice'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { allMovies, deleteMovie } from '../features/movieSlice';
import { noFilterShowss } from '../features/showSlice';
import { CiSearch } from "react-icons/ci";

const Admin = () => {
    const [count, setCount] = useState(1)
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
  
    const handleCityClick = (city) => {
      setSelectedCity(city);
      setSearchTerm(city);
      setShowModal(false);
      setSuggestions([]);
    };
  
    const getAllMovies = () => {
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

    const removeMovie = (id) => {
        const data = {
            id: id
        }
        dispatch(deleteMovie(data))
        setCount(count+1)
    }
  
    useEffect(() => {
      getAllMovies()
      // getAllShows()
    }, [languageCat, genre,city,search, count])

  return (
    <div className='container'>
        <h1 className='text-center'>Admin Panel</h1>
      <div className='flex gap-2'>
        <button onClick={() => navigate('/createmovie')} className='px-5 py-2 text-white bg-red-500 rounded-md'>Add A Movie</button>
        <button onClick={() => navigate('/createshow')} className='px-5 py-2 text-white bg-red-500 rounded-md'>Create new Show</button>
        <button onClick={() => navigate('/createtheatre')} className='px-5 py-2 text-white bg-red-500 rounded-md'>Add New Theatre</button>
      </div>

      <div className='flex'>
          {/* Left Section */}
          <div className='left-section w-[30%] md:w-[35%]'>
              <div className='flex flex-col'>
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

          {/* Right Section */}
          <div className='right-section w-[70%] md:[65%]'>
              <div className='w-full lg:w-1/2 mb-4'>
                  <div className='flex border border-gray-300 justify-between items-center rounded-md px-2'>
                      <input className='w-full outline-none px-3 py-2' placeholder='Search For Movies' type='text' onChange={(e) => setSearch(e.target.value)} />
                      <CiSearch className='font-bold text-lg hover:cursor-pointer' />
                  </div>
              </div>
              <div className='flex flex-wrap justify-center'>
                  {movies.map((movie, index) => (
                      <div key={index} className='flex flex-col justify-between bg-white border border-gray-300 rounded-md w-64 lg:w-80 xl:w-96 mx-4 my-4 p-4 hover:cursor-pointer'>
                          <img src={movie.image} className='w-full h-48 object-cover rounded-md mb-4' alt={movie.title} />
                          <div>
                              <h1 className='text-[24px] font-bold text-gray-800 mb-2'>{movie.title}</h1>
                              <div className=' mb-2'>
                                {movie.language.map((item,index) => (
                                  <span className='text-[18px] text-gray-500' key={index}>{item}{index !== movie.language.length - 1 && "/"}</span>
                                ))}
                              </div>
                              {movie.genre.map((item,index) => (
                                <span className='text-[18px] text-gray-500' key={index}>{item}{index !== movie.genre.length - 1 && "/"}</span>
                              ))}
                              <div className='mt-2 '>
                                <button onClick={() => removeMovie(movie._id)} className='rounded-md px-5 py-2 bg-red-500 text-white'>Remove</button>
                              </div>  
                              
                          </div>
                      </div>
                  ))}
              </div>
          </div>
        </div>
    </div>
  )
}

export default Admin
