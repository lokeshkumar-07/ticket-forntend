import { Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import * as yup from 'yup'
import 'react-datepicker/dist/react-datepicker.css';
import { InputAdornment, MenuItem, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { allMovies } from '../features/movieSlice';
import { allTheatre } from '../features/theatreSlice';
import { createShow } from '../features/showSlice';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';

const CreateShow = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { theatres } = useSelector((state) => state.theatre)
    const { movies } = useSelector((state) => state.movie)

    const [loading, setLoading] = useState(false)

    console.log(theatres)

    const [title, setTitle] = useState(movies[0].title);

    let selectedMovie = movies.filter((movie) => movie.title === title)[0]
    const [language, setLanguage] = useState(selectedMovie.language[0])
    const [city, setCity] = useState('Mumbai');
    const [theatreName, setTheatreName] = useState('');
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [price, setPrice] = useState(200)
    const [days, setDays] = useState(1)
    
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    let newTheatres = theatres.filter((th) => th.city === city)

    

    console.log(selectedMovie)

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'theatreName':
                setTheatreName(value);
                break;
            case 'date':
                setDate(value)
            case 'startTime':
                setStartTime(value)
            case 'endTime':
                setEndTime(value)
            case 'price':
                setPrice(value)
            default:
                break;
        }
        // Validate individual fields onBlur
        setFormErrors(validateField(name, value));
    };

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        let formattedTime = '';
        let amOrPm = '';
    
        if (parseInt(hours, 10) >= 12) {
          amOrPm = 'PM';
          formattedTime += parseInt(hours, 10) === 12 ? hours : parseInt(hours, 10) - 12;
        } else {
          amOrPm = 'AM';
          formattedTime += parseInt(hours, 10) === 0 ? '12' : hours;
        }
    
        formattedTime += `:${minutes} ${amOrPm}`;
    
        return formattedTime;
    };

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        const errors = validate();
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            // If there are no errors, submit the form
            console.log("Form submitted successfully!");
            setIsSubmit(true);
    
            // Loop through upcomingDays array
            
            const formData = new FormData();
            formData.append('movieName', title);
            formData.append('city', city);
            formData.append('theatre', theatreName);
            formData.append('date', date);
            formData.append('language', language)
            formData.append('startTime', formatTime(startTime));
            formData.append('endTime', formatTime(endTime));
            formData.append('price', price);
            formData.append('movieId', selectedMovie._id )
            formData.append('days', days);
            await dispatch(createShow(formData)); // Await dispatch completion
            setLoading(false)
            navigate('/')
        } else {
            console.log("Form has errors. Please fix them.");
            setLoading(false)
        }
    };

    const getmoviesandtheatre = async () => {
      console.log("getting all movies....")
      dispatch(allMovies())
      dispatch(allTheatre())  
    }

    useEffect(() => {
      getmoviesandtheatre()
    },[])

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log({ title, city, theatreName, date, startTime, endTime });
        }
    }, [formErrors]);

    useEffect(() => {
        console.log('City Changed');
    }, [city]);



    const validate = () => {
        const errors = {};
        if (!city) {
            errors.city = "Please select a city!";
        }
        if (!title) {
            errors.title = "Title is required!";
        }
        if (!theatreName) {
            errors.theatreName = "Please select theatre!";
        }
        if (!date) {
          errors.date = "Please select a Date!";
        }
        if (!startTime) {
          errors.startTime = "Starting Time Required!";
        }
        if (!endTime) {
          errors.endTime = "Ending Time Required!";
        }
        if(!price){
          errors.price = "Please set show Price!"
        }
      
        return errors;
    };

    const validateField = (name, value) => {
        const errors = {};
        switch (name) {
            case 'title':
                if (!value) {
                    errors.title = "Title is required!";
                }
                break;
            case 'city':
                if (!value) {
                    errors.city = "Please select a city!";
                }
                break;
            case 'theatreName':
                if (!value) {
                    errors.theatreName = "Please select theatre!";
                }
                break;
            case 'date':
                if (!value) {
                    errors.date = "Please select a Date!";
                }
                break;
            case 'startTime':
                if (!value) {
                    errors.startTime = "Starting Time Required!";
                }
                break;
            case 'endTime':
                if (!value) {
                    errors.endTime = "Ending Time Required!";
                }
                break;
            case 'price':
                if(!price){
                  errors.price = "Please set show Price!"
                }
            default:
                break;
        }
        return errors;
    };

    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Jaipur', 'Ahmedabad'];

    return (
        <div className='container'>
            {loading && <Loading />}
            <div className='flex flex-col items-center mx-auto  w-[60%]'>
                <form className='' onSubmit={handleSubmit}>
                    <div className='mt-[32px]'>
                        <h1 className='text-center text-[24px] font-semibold '>Add A Movie</h1>
                        <div className='mb-1 flex flex-col'>
                            <label htmlFor="" className='text-left mb-2 text-[18px] font-[600]'>Movie Title</label>
                            <TextField className=" w-[400px]"
                                select
                                label='Movie'
                                value={title}
                                onChange={handleChange}
                                onBlur={(e) => setFormErrors(validateField('title', e.target.value))}
                                name="title"
                            >
                            {movies.map((item,index) => (
                                <MenuItem key={index} value={item.title}>{item.title}</MenuItem>
                            ))}
                            </TextField>
                            <p className='text-red-500'>{formErrors.title}</p>
                        </div>

                        <div className='mb-1 flex flex-col'>
                            <label htmlFor="" className='text-left mb-2 text-[18px] font-[600]'>Select Language</label>
                            <TextField className=" w-[400px]"
                                select
                                label='Language'
                                value={language}
                                onChange={handleChange}
                                onBlur={(e) => setFormErrors(validateField('title', e.target.value))}
                                name="language"
                            >
                            {selectedMovie.language.map((item,index) => (
                                <MenuItem key={index} value={item}>{item}</MenuItem>
                            ))}
                            </TextField>
                            <p className='text-red-500'>{formErrors.title}</p>
                        </div>

                        
                        <div className='flex w-[400px] gap-2'>
                                    
                            <div className='mb-1 flex flex-col w-[40%]'>
                                <label htmlFor="" className='text-left mb-2 text-[18px] font-[600]'>City</label>
                                <TextField className=" "
                                    select
                                    label='City'
                                    onChange={handleChange}
                                    onBlur={(e) => setFormErrors(validateField('city', e.target.value))}
                                    value={city}
                                    name="city"
                                >
                                    {cities.map((item, index) => (
                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                    ))}
                                </TextField>
                                <p className='text-red-500'>{formErrors.city}</p>
                            </div>

                            {newTheatres && (<div className='mb-1 flex w-[60%] flex-col'>
                                <label htmlFor="" className='text-left mb-2 text-[18px] font-[600]'>Theatre</label>
                                <TextField className=""
                                    select
                                    label='Theatre'
                                    value={theatreName}
                                    onChange={handleChange}
                                    onBlur={(e) => setFormErrors(validateField('theatreName', e.target.value))}
                                    name="theatreName"
                                >
                                {newTheatres.map((item,index) => (
                                    <MenuItem key={index} value={item._id}>{item.theatre_name}</MenuItem>
                                ))}
                                </TextField>
                                <p className='text-red-500'>{formErrors.theatreName}</p>
                            </div>)}
                        </div>
                        

                        <div className='my-2 w-[400px] flex items-center space-x-5 '>
                            <label className='text-[18px] font-bold'>Date</label>
                            <DatePicker
                                fullWidth
                                className='border border-gray-500 rounded-md p-4 w-[340px]'
                                selected={date}
                                onChange={date => setDate(date)}
                                onBlur={() => setFormErrors(validateField('date', date))}
                            />
                            <p className='text-red-500'>{formErrors.date}</p>
                        </div>

                        <div>
                        <div className='w-[400px] flex gap-5 items-center'>
                            <label className='text-[18px] w-[250px] font-bold' htmlFor="">How Many Days</label>
                            <TextField
                                fullWidth
                                inputProps={{ step: 1 }}
                                type="number"
                                name="days"
                                label="Days"
                                onChange={(e) => setDays(e.target.value)}
                                defaultValue={1}
                            />
                            </div>
                        </div>
                        <div className='flex justify-between w-[400px] mt-2'>
                            <div className='mb-1 flex flex-col'>
                                <label className='text-[18px] font-bold'>Start Time:</label>
                                <TextField
                                    type="time"
                                    className='w-[180px]'
                                    value={startTime}
                                    onChange={e => setStartTime(e.target.value)}
                                    onBlur={(e) => setFormErrors(validateField('startTime', e.target.value))}
                                />
                                <p className='text-red-500'>{formErrors.startTime}</p>
                            </div>
                            <div className='mb-1 flex flex-col'>
                                <label className='text-[18px] font-bold'>End Time:</label>
                                <TextField
                                    type="time"
                                    className='w-[180px]'
                                    value={endTime}
                                    onChange={e => setEndTime(e.target.value)}
                                    onBlur={(e) => setFormErrors(validateField('endTime', e.target.value))}
                                />
                                <p className='text-red-500'>{formErrors.endTime}</p>
                            </div>
                        </div>

                        <div className='mb-1 flex flex-col'>
                            <TextField className='w-[400px]'
                                name="price"
                                label="Price"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">₹</InputAdornment>,
                                }}
                                defaultValue={price}
                                onChange={handleChange}
                                onBlur={(e) => setFormErrors(validateField('price', e.target.value))}
                            />
                            <p className='text-red-500'>{formErrors.price}</p>
                        </div>
                        <div className='w-[400px]'>
                        <button className='w-full px-4 py-2 text-white bg-red-500 rounded-md' type="submit">ADD</button>
                        </div>
                        
                    </div>

                </form>
            </div>
            
        </div>
    )
}

export default CreateShow;