import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { allShows, getOneShow } from '../features/showSlice';
import { IoIosArrowBack } from 'react-icons/io';
import Loading from '../components/Loading';

const ShowsDisplay = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {city} = useSelector((state) => state.city)
  const {shows} = useSelector((state) => state.show);
  const {movie} = useSelector((state) => state.movie);
  const {movieName} = useParams();
  const [loading, setLoading] = useState(true)

  const [date, setDate] = useState(new Date()); // Set initial state to today's date
  console.log(shows)

  const grouped = [];
  shows.forEach(showing => {
    if (!grouped[showing.theatre.theatre_name]) {
      grouped[showing.theatre.theatre_name] = [];
    }
    grouped[showing.theatre.theatre_name].push(showing);
  });
  
  console.log(grouped)

 
  
  var datesArray = [];

  var today = new Date();

  for(var i = 0; i< 5; i++){
    datesArray.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() + i));
  }
  var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  console.log(datesArray)


  const getMovieShows = async() =>{
    const data = {
      movieName: movieName,
      date: date.toDateString(),
      city: city
    };

    await dispatch(allShows(data));

    setLoading(false);
  };



  const handleShowClick = async(showId) => {
    const data = {
      showId: showId
    }

    await dispatch(getOneShow(data))
    navigate(`/bookshow/${showId}`)
  }
  useEffect(() => {
    console.log(city)
    getMovieShows();
  },[date,city]);

  return (
    <div className='container'>
      <div className='flex mt-[32px] flex-col'>
        <div className='movie-intro flex items-center '>
            <div className='text-[48px] hover:cursor-pointer' onClick={() => navigate(`/movie/${movie.title}`)}>
              <IoIosArrowBack />
            </div>

            <div className='flex flex-col'>

              <div className='flex gap-2 mb-1.5'>
                <h1 className='text-[18px] font-semibold text-gray-900'>{movie.title}</h1>

                <div className='border border-gray-900 p-1 rounded-full text-[14px]'>
                    {movie.category}
                </div>
              </div>
              

              <div className='flex items-center gap-2'>
                  

                  <div className='flex gap-2'>
                    {movie.genre.map((item,index) => ( 
                      <div className='border border-gray-400 rounded-full' key={index}>
                        <h1 className='text-[14px] px-2 py-1'>{item}</h1>
                      </div> 
                    ))}
                  </div>
              </div>
            </div>

        
        </div>

        <div className='mt-[20px]'>
          <div className='flex gap-3'>
            {datesArray.map((item,index) => (
              <div 
                key={index} 
                className={`flex flex-col px-3 py-2  hover:cursor-pointer ${date.toDateString() === item.toDateString() ? 'bg-red-500 rounded-md text-white' : 'hover:text-red-500'}`}
                onClick={() => setDate(item)}
              >
                <h1 className='text-[14px]'>{dayNames[item.getDay()]}</h1>
                <h1 className='text-[20px] font-semibold'>{item.getDate()}</h1>
                <h1 className='text-[14px]'>{monthNames[item.getMonth()]}</h1>
              </div>
            ))}
          </div>

          <div className='my-[15px]'>
            {loading ? (
              <div><Loading /></div>
            ) : shows.length > 0 ? (
              Object.entries(grouped).map(([theatreName, showings], index) => (
                <div key={index} className='flex flex-col mb-[10px] md:flex-row md:items-center gap-2'>
                  <div className='w-[300px]'>
                    <h1 className='text-gray-700 font-semibold'>{theatreName}</h1>
                  </div>
                  <div className='flex gap-2'>
                    {showings.map((showing, subIndex) => (
                      <div key={subIndex} className='flex flex-col items-center gap-[0px] hover:cursor-pointer px-8 py-2 border border-gray-400 rounded-md' onClick={() => handleShowClick(showing._id)}>
                        <p className='text-green-500 text-[14px]'>{showing.startTime}</p>
                        <p className='text-green-500 text-[12px]'>{showing.language}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className='text-gray-700 font-semibold'>No show Found on this day for this movie in this city.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowsDisplay;