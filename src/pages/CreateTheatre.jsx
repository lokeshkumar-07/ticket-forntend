import { MenuItem, TextField } from '@mui/material'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { createTheatre } from '../features/theatreSlice'
import { CiSearch } from "react-icons/ci";

const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Jaipur', 'Ahmedabad', 'Patna', 'Nagpur', 'Indore', 'Chandigarh'];

const CreateTheatre = () => {

  const [searchTerm, setSearchTerm] = useState('Mumbai')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSeggestions] = useState(false)
  const [selectedCity, setSelectedCity] = useState('Mumbai')

  console.log(selectedCity)

  const handleInputChange = (e) => {
    const value = e.target.value.trim()
    setSearchTerm(value)

    const filteredCities = value ? cities.filter(city => city.toLowerCase().includes(value.toLowerCase())) : []
    setSuggestions(filteredCities)
    setShowSeggestions(filteredCities.length > 0)
  }

  const handleCityClick = (c) => {
    setSelectedCity(c)
    setSearchTerm(c)
    setShowSeggestions(false)
  }

    const dispatch = useDispatch()

    const schema = yup.object().shape({
        theatre_name: yup.string().required('Required'),
        city: yup.string().required('Required'),
        address: yup.string().required('Required'),
    })
    
    const initialValues= {
        theatre_name: "",
        city: "Mumbai",
        address: "",
    }

    const handleSubmitForm = async (values, onSubmitProps) => {
        const formData = new FormData()
        formData.append('theatre_name', values.theatre_name)
        formData.append('city', values.city)
        formData.append('address', values.address)
        await dispatch(createTheatre(formData))
        
    }

  return (
    <div className='container'>
      <div className='flex flex-col gap-2'>
        <h1>Create New Theatre</h1>
        <div className='flex mx-auto'>
          <Formik
            onSubmit={handleSubmitForm}
            initialValues={initialValues}
            validationSchema={schema}
          >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form className="" onSubmit={handleSubmit}>

                      
                      <div >
                  
                        <div className='mb-1 flex flex-col'>
                          <label htmlFor="" className='text-left mb-2 text-[18px] font-[600]'>Theatre Name</label>
                          <TextField className=" w-[400px]"
                            label="Theatre Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="theatre_name"
                            error={Boolean(touched.theatre_name) && Boolean(errors.theatre_name)}
                            helperText={touched.theatre_name && errors.theatre_name}
                              
                          />
                        </div>        
                        
                        <div className='mb-1 flex flex-col'>
                          <label htmlFor="" className='text-left mb-2 text-[18px] font-[600]'>City</label>
                          <TextField className=" w-[400px]"
                            select
                            label='City'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.city}
                            name="city"
                            error={Boolean(touched.city) && Boolean(errors.city)}
                            helperText={touched.city && errors.city}
                            >
                              {cities.map((item,index) => (
                                <MenuItem key={index} value={item}>{item}</MenuItem>
                              ))}
                            </TextField>
                        </div>

                        {/* <div className='flex flex-col gap-2'>
                          <label>Search City</label>
                          <div className="relative inline-block text-left">
                            <div className='flex items-center gap-1 border border-gray-500 w-[300px] rounded-md'>
                              <CiSearch className='ml-2 text-[24px]' />
                              <input 
                                type='text'
                                placeholder='Search for a city'
                                value={searchTerm}
                                onChange={handleInputChange}
                                className="p-4 rounded-md outline-none focus:border-blue-500"
                              />
                            </div>
                            
                            {showSuggestions && (
                              <div className="relative mt-2 w-[300px] rounded-md shadow-lg bg-white z-10">
                                <ul className="py-2">
                                  {suggestions.map(city => (
                                    <li
                                      key={city}
                                      onClick={() => handleCityClick(city)}
                                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    >
                                      {city}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div> */}


                        <div className='address-div mb-1 flex flex-col z-0'>
                          <label htmlFor="" className='text-left mb-2 text-[18px] font-[600]'>Address</label>
                          <TextField
                            className="w-[400px]"
                            multiline
                            rows={3}
                            label='Address'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="address"
                            error={Boolean(touched.address) && Boolean(errors.address)}
                            helperText={touched.address && errors.address}
                          />
                        </div>                 
                      </div>

                      <div className='mt-4'>
                        <button  type="submit" className="w-full bg-red-500 flex items-center justify-center text-white px-5 py-3 border rounded-md">
                          Create
                        </button>
                    </div>
                </form>
            )}
          </Formik>
        </div>
      </div>  
      
    </div>
  )
}

export default CreateTheatre
