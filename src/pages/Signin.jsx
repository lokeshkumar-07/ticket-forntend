import React, { useRef, useState } from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { login, register } from '../features/authSlice'
import { MenuItem, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loginSchema = yup.object().shape({
    email: yup.string().required("Required").email("Invalid email"),
    password: yup.string().required("Required"),
}) 

const inititialValueLogin = {
    email: "",
    password: "",
};


const Signin = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const roles = [
    "Patient",
    "Doctor",  
  ]

  const genders = [
    "Male",
    "Female",  
  ]

  const loginMethod = async (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("email", values.email.toLowerCase());
    formData.append("password", values.password);
    
    
    dispatch(login(formData))
    .then((res) => {
      console.log(res)
      if(res.type === "auth/login/fulfilled"){
        
        toast.success('Login SuccessFully')
        navigate('/')
      }
      else{ toast.error(res.payload) }
      
    })
    .catch((err) => console.log(err))
  };

  return (
    <section>
      <div className="container">
        <div className="flex items-center flex-col">
          <h2 className="heading text-gray-600 text-center pb-4">Login Form</h2>
          <div className="flex flex-col items-center mx-auto">
            <Formik
              onSubmit={loginMethod}
              initialValues={inititialValueLogin }
              validationSchema={loginSchema }
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
                <form className="flex flex-col items-center mx-auto" onSubmit={handleSubmit}>

                  
                  <div >
              
                    <div className='mb-1 flex flex-col'>
                      <label htmlFor="" className='text-left mb-2 text-[18px] font-[600]'>Email</label>
                      <TextField className=" w-[300px]"
                        label="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="email"
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                          
                      />
                    </div>        
                    
                    <div className='mb-1 flex flex-col'>
                      <label htmlFor="" className='text-left mb-2 text-[18px] font-[600]'>Password</label>
                      <TextField className=" w-[300px]"
                        type='password'
                        label='Password'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="password"
                        error={Boolean(touched.password) && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        
                      />
                    </div>
                            
                    
                    
                  </div>

                  <div className='mt-4'>
                    <button  type="submit" className="w-[300px] bg-red-500 flex items-center justify-center mx-auto text-white px-5 py-3 border rounded-md">
                      LOGIN
                    </button>
                    <div></div>
                    <h5 className='text-center text-blue-500 mt-2 hover:cursor-pointer'
                      onClick={() => {navigate('/register')}}
                    >
                      Don't have an account? Sign Up here.
                    </h5>
                    
                    
                  </div>
                </form>
                
              )}
            </Formik>

            <div className='mt-2'>
              <OAuth />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signin
